import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {

  constructor(
    @InjectModel(Job.name) 
    private jobModel: SoftDeleteModel<JobDocument>) {

    }


  async create(createJobDto: CreateJobDto, user: IUser ) {
    const {name,skills , company, salary , quantity, level, description, startDate, endDate, isActive, location   } = createJobDto  ; 
    let newJob  = await this.jobModel.create({ 
        name,
         skills,  company, salary , quantity, level, description, startDate, endDate, isActive,location ,
         createdBy:{
          _id: user._id,
          name : user.name 
        }
    })
    console.log("check user ", newJob );
    return  newJob  ;
  }

  async findAll(currentPage: number ,limit: number , qs: string  ) {
    const { filter, sort, projection, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
    let offset =(+currentPage - 1 ) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    console.log('Filter:', filter);

    const totalItems = (await this.jobModel.find(filter)).length;
    console.log('check totalItems ', totalItems );
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const allDocuments = await this.jobModel.find(filter);
    console.log('All Documents:', allDocuments);


    const result = await this.jobModel.find(filter)
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
    return  this.jobModel.findOne({_id: id });
  }

 
  async update (updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      {
        _id: updateJobDto._id,
      },
      {
        ...updateJobDto,
        updateBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async update2(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    // validate id 
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return { message: 'Invalid user ID' };
   }
 
   const existingCompany = await this.jobModel.findById(id);
   if (!existingCompany ) {
     return { message: 'User not found' };
   }

   const {name,skills , company, salary , quantity, level, description, startDate, endDate, isActive , location  } = updateJobDto  ;
   // update
   const updatedJob  = await this.jobModel.findByIdAndUpdate(id,
     {
      name,skills , company, salary , quantity, level, description, startDate, endDate, isActive, location ,
       updatedBy: {
         _id : user._id,
         email : user.email,
       }
     },
     { new: true } 
   );
     return  updatedJob;
   }

   async remove(id: string, user: IUser) {
    // Kiểm tra xem người dùng cần xóa có tồn tại hay không
    const existingUser = await this.jobModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException(`Người dùng với ID ${id} không tồn tại`);
    }
    console.log("check user ", user.role);
  
    // check role by Delete 
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Bạn không có quyền xóa người dùng này');
    }
  
    await this.jobModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    } 
   }
  )
    return this.jobModel.softDelete({
      _id : id 
    })
  }
}
