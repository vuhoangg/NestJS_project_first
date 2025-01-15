import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './entities/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
@Injectable()
export class CompaniesService {


  constructor(
    @InjectModel(Company.name) 
    private companyModel: SoftDeleteModel<CompanyDocument>) {

    }
  async create(createCompanyDto: CreateCompanyDto, user :IUser  ) {
   
  
    console.log("check user ", user._id)
    return await this.companyModel.create({
      name : createCompanyDto.name ,
      address : createCompanyDto.address,
      description: createCompanyDto.description,
      createdBy: {
        _id : user._id,
        email : user.email
      }})
      
  }

  async findAll(currentPage: number ,limit: number , qs: string  ) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset =(+currentPage - 1 ) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    console.log('Filter:', filter);

    const totalItems = (await this.companyModel.find(filter)).length;
    console.log('check totalItems ', totalItems );
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const allDocuments = await this.companyModel.find(filter);
    console.log('All Documents:', allDocuments);


    const result = await this.companyModel.find(filter)
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

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return 'not found';
    }
    return  this.companyModel.findOne({_id: id });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
   // Kiểm tra tính hợp lệ của ID
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return { message: 'Invalid user ID' };
  }

  // Lấy user hiện tại trong cơ sở dữ liệu
  const existingCompany = await this.companyModel.findById(id);
  if (!existingCompany ) {
    return { message: 'User not found' };
  }


  // update
  const updatedCompany  = await this.companyModel.findByIdAndUpdate(
    id,
    {
      name :updateCompanyDto.name,
      address : updateCompanyDto.address,
      description: updateCompanyDto.description,
      updatedBy: {
        _id : user._id,
        email : user.email,
      }
    },
    { new: true } 
  );
    return  updatedCompany;
  }

  async remove(id: string , user: IUser ) {
    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: 'Invalid user ID' };
    }
  
   
    const existingCompany  = await this.companyModel.findById(id);
    if (!existingCompany ) {
      return { message: 'User not found' };
    }

    await this.companyModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    }
  }
  )
  
    const deletedCompany  = await this.companyModel.softDelete({
      _id : id,
    }
  );
  
    // Trả về thông tin user đã bị xóa
    return {
      message: 'Conpony  successfully deleted',
      deletedCompany,
    };
  }
  
   
  
}
