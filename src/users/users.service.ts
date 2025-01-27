import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserM, UserDocument } from './schemas/user.schemas';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync , compareSync } from 'bcryptjs'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { BADFAMILY } from 'dns/promises';
import { IUser } from './users.interface';
// import { User, User as UserDecorator} from 'src/decorator/customize';
import { User } from 'src/decorator/customize';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
 

  constructor(
  @InjectModel(UserM.name) 
  private userModel: SoftDeleteModel<UserDocument>) {}

  gethashPassword = (password: string) =>{
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }



  async create2(createUserDto: CreateUserDto ) {
    const hashPassword = this.gethashPassword(createUserDto.password);

    let user = await this.userModel.create({ 
      email: createUserDto.email, 
      password : hashPassword,
      name: createUserDto.name
    })
    console.log("check user ", user );
    return  user ;
  }


  async create(createUserDto: CreateUserDto, user: IUser  ) {
    const {name, email, password, age, gender, address, role, company  } = createUserDto  ; 
    const isExist = await this.userModel.findOne({email})
    if (isExist){
      throw new BadRequestException(`The email ${email} đã tồn tại trên hệ thống ` );
    }

    const hashPassword = this.gethashPassword(password);
    let newUser = await this.userModel.create({
     name,
      email, 
      password :hashPassword , age,
       gender,
        address,
        role, 
        company,
        createdBy:{
          _id: user._id,
          name : user.name 
        }
    })
    return newUser ;
  }


  async register (user : RegisterUserDto) {
    const {name, email, password, age, gender, address }= user ; 
    // check email 
    const isExist = await this.userModel.findOne({email})
    if (isExist){
      throw new BadRequestException(`The email ${email} đã tồn tại trên hệ thống ` );
    }
    const hashPassword = this.gethashPassword(password);
    let newRegister = await this.userModel.create({
     name,
      email, 
      password :hashPassword , age,
       gender,
        address,
        role: "USER"
    })
    return newRegister ;
   }



   async findAll(currentPage: number ,limit: number , qs: string  ) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset =(+currentPage - 1 ) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    console.log('Filter:', filter);

    const totalItems = (await this.userModel.find(filter)).length;
    console.log('check totalItems ', totalItems );
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const allDocuments = await this.userModel.find(filter);
    console.log('All Documents:', allDocuments);


    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort as any )
      .populate(population)
      .exec()

      return{
        meta:{
          current: currentPage, // trang hiện tại 
          pageSize: limit, // số lượng trang bản ghi đã lấy 
          pages: totalPages, // tổng số trang với điều kiện query ;
          total: totalItems // tổng ố phần từ (số bản ghi )
        },
        result,
      }
 
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return 'not found';
    }
    return  await this.userModel.findOne({_id: id }).select("-password");
  }

  findOneByUsername(username: string) {
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //   return 'not found';
    // }
    return  this.userModel.findOne({ email: username });
  }

  

   // check password 
   isValidPassword(password: string, hash: string): boolean {
    console.log("Input Password:", password);
    console.log("Hashed Password:", hash);
    const result = compareSync(password, hash);
    const hash2 =  this.gethashPassword(password);
    console.log("Password match result compare2 : " , compareSync(password, hash2) );
    console.log("Password match result:", result);
    return result; 
  }




  async update2(id: string, updateUserDto: UpdateUserDto) {
    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: 'Invalid user ID' };
    }
  
    // Lấy user hiện tại trong cơ sở dữ liệu
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      return { message: 'User not found' };
    }
  
    // Nếu có password trong DTO, mã hóa mật khẩu, nếu không giữ nguyên mật khẩu cũ
    let hashPassword = existingUser.password; // Mặc định giữ nguyên mật khẩu cũ
    if (updateUserDto.password) {
      hashPassword = this.gethashPassword(updateUserDto.password);
    }
  
    // Cập nhật các trường trong tài liệu
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        email: updateUserDto.email,
        password: hashPassword,
        name: updateUserDto.name,
      },
      { new: true } // `new: true` để trả về tài liệu sau khi cập nhật
    );
  
    return updatedUser;
  }

  // async update3(id: string, updateUserDto: UpdateUserDto, user: IUser) {
  //   const { name, email, password, age, gender, address, role, company } = updateUserDto;

  //   const existingUser = await this.userModel.findById(id);
  //   if (!existingUser) {
  //     throw new BadRequestException(`Người dùng với ID ${id} không tồn tại`);
  //   }
  //   const hashPassword = password ? this.gethashPassword(password) : existingUser.password;
  //   let updateUser = await this.userModel.updateOne(
  //     { _id: id },
  //     {
  //       name,
  //       email,
  //       password: hashPassword,
  //       age,
  //       gender,
  //       address,
  //       role,
  //       company:{
  //         _id: company._id,
  //         name: company.name,
  //       },
  //       updatedBy: {
  //         _id: user._id,
  //         name: user.name,
  //       },
  //     }
  //   );
  
  //   return updateUser;
  // }

  async update (updateUserDto: UpdateUserDto, user: IUser) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        ...updateUserDto,
        updateBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }
  



  async remove2(id: string) {
    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: 'Invalid user ID' };
    }
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      return { message: 'User not found' };
    }
    const deletedUser = await this.userModel.softDelete({
      _id : id 
    });
  
    // Trả về thông tin user đã bị xóa
    return {
      message: 'User successfully deleted',
      deletedUser,
    };
  }

  async remove(id: string, user: IUser) {
    // Kiểm tra xem người dùng cần xóa có tồn tại hay không
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException(`Người dùng với ID ${id} không tồn tại`);
    }
    console.log("check user ", user.role);
  
    // Kiểm tra quyền xóa
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền xóa người dùng này');
    }
  
    await this.userModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    } 
   }
  )
    return this.userModel.softDelete({
      _id : id 
    })
   
  }

  updateUserToken = async (refreshToken :string , _id : string )=>{
    return await this.userModel.updateOne({_id}, {refreshToken})
  }
}
