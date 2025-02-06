import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {


  constructor(
    @InjectModel(Permission.name) 
    private permissionModel: SoftDeleteModel<PermissionDocument>) {}
 
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {


    const {name, apiPath, method, module  } = createPermissionDto;
    const isExist = await this.permissionModel.findOne({ apiPath, method });
    if (isExist){
      throw new BadRequestException(`Permissson with apiPath=${apiPath}, method=${method}} existed`)
    }
    const {email, _id } = user ;
    const newPermission = await this.permissionModel.create({
      name, apiPath, method, module,
      createdBy: {_id, email },
    
    })
    return{
      _id: newPermission?._id,
      createdAt: newPermission?.createdAt
  }
}
async findAll(currentPage: number ,limit: number , qs: string  ) {
  const { filter, sort, projection, population } = aqp(qs);
  delete filter.current;
  delete filter.pageSize;
  let offset =(+currentPage - 1 ) * (+limit);
  let defaultLimit = +limit ? +limit : 10;
  console.log('Filter:', filter);

  const totalItems = (await this.permissionModel.find(filter)).length;
  console.log('check totalItems ', totalItems );
  const totalPages = Math.ceil(totalItems / defaultLimit);
  const allDocuments = await this.permissionModel.find(filter);
  console.log('All Documents:', allDocuments);


  const result = await this.permissionModel.find(filter)
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

findOne(id: string) {
  if(!mongoose.Types.ObjectId.isValid(id)){
    return 'not found';
  }
  return  this.permissionModel.findOne({_id: id });
}


  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return { message: 'Invalid user ID' };
   }
   const {name, apiPath, method, module  } = updatePermissionDto;
   const updatedPermission  = await this.permissionModel.findByIdAndUpdate(
     id,
     {
      name, apiPath, method, module,
       updatedBy: {
         _id : user._id,
         email : user.email,
       }
     },
     { new: true } 
   );
     return  updatedPermission;
   }

  
   async remove(id: string, user: IUser) {
    const existingUser = await this.permissionModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with ID ${id} does not exits`);
    }
    console.log("check user ", user.role);
    // check role by Delete 
    // if (user.role !== 'ADMIN') {
    //   throw new ForbiddenException('You do not have permission to remove this user');
    // }
    await this.permissionModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    } 
   }
  )
    return this.permissionModel.softDelete({
      _id : id 
    })
  }
  
}
