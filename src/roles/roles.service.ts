import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role.name) 
    private roleModel: SoftDeleteModel<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto, user : IUser ) {

    const {name, description, isActive, permission } = createRoleDto ;
    const isExist = await this.roleModel.findOne({name});
    if(isExist){
      throw new BadRequestException(`Role with name="${name}" existed `);
    }
    const newRole = await this.roleModel.create({
      name, description, isActive, permission ,
      createdBy:{
        _id : user._id,
        email: user.email 
      } 
    })
    return {
      id : newRole?.id ,
      createdAt : newRole?.createdAt
    }
  }


  async findAll(currentPage: number ,limit: number , qs: string  ) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset =(+currentPage - 1 ) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    console.log('Filter:', filter);
  
    const totalItems = (await this.roleModel.find(filter)).length;
    console.log('check totalItems ', totalItems );
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const allDocuments = await this.roleModel.find(filter);
    console.log('All Documents:', allDocuments);
  
  
    const result = await this.roleModel.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort as any )
      .populate(population)
      .select(projection as any )
      .exec()
  
      return{
        meta:{
          current: currentPage, 
          pageSize: limit,
          pages: totalPages,
          total: totalItems 
        },
        result,
      }
  
  }
  
  async findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return 'not found';
    }
    return  (await this.roleModel.findById(id)) 
    .populate({ path: "permission" , select: {_id: 1 , apiPath: 1 , name: 1, method:1, module:1  } })
  }


  async update(id: string , updateRoleDto: UpdateRoleDto, user : IUser ) {
    if(!mongoose.Types.ObjectId.isValid(id)){
      return 'not found';
    }
    const {name, description, isActive, permission } = updateRoleDto ;
    // const isExist = await this.roleModel.findOne({name});
    // if(isExist){
    //   throw new BadRequestException(`Role with name="${name}" existed `);
    // }
    
    const updatedRole = await this.roleModel.updateOne(
      {_id : id},{
        name, description, isActive, permission,
        updatedBy:{
          _id : user._id,
          email: user.email 
        }
      })
    return updatedRole 
  }
  

 

  async remove(id: string, user: IUser) {
    const existingUser = await this.roleModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with ID ${id} does not exits`);
    }
     // check that Role cannot be permanently deleted
     const foundUser = await this.roleModel.findById(id);
     if(foundUser.name === "ADMIN"){
       throw new BadRequestException("This account cannot be deleted");
     }
    // check role by Delete 
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('You do not have permission to remove this user');
    }
    await this.roleModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    } 
   }
  )
    return this.roleModel.softDelete({
      _id : id 
    })
  }
}
