import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {

   constructor(
    @InjectModel(Resume.name) 
    private resumeModel: SoftDeleteModel<ResumeDocument>) {

    }
  
  async create(createUserCvDto: CreateUserCvDto, user: IUser) {
    const {url, companyId, jobId } = createUserCvDto;
    const {email, _id } = user ;

    const newCV = await this.resumeModel.create({
      url, companyId, email , jobId,
      userId: _id ,
      status: "PENDING",
      createdBy: {_id, email },
      history:[
        {
          status :"PENDING",
          updatedAt: new Date,
          updatedBy: {
             _id : user._id,
             email : user.email 
          }
        }
      ]

    })

    return{
      _id: newCV?._id,
      createdAt: newCV?.createdAt
   
  }
}

async findAll(currentPage: number ,limit: number , qs: string  ) {
  const { filter, sort, projection, population } = aqp(qs);
  delete filter.current;
  delete filter.pageSize;
  let offset =(+currentPage - 1 ) * (+limit);
  let defaultLimit = +limit ? +limit : 10;
  console.log('Filter:', filter);

  const totalItems = (await this.resumeModel.find(filter)).length;
  console.log('check totalItems ', totalItems );
  const totalPages = Math.ceil(totalItems / defaultLimit);
  const allDocuments = await this.resumeModel.find(filter);
  console.log('All Documents:', allDocuments);


  const result = await this.resumeModel.find(filter)
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
  return  this.resumeModel.findOne({_id: id });
}

async findByUsers(user: IUser ){
  return await this.resumeModel.find({
    userId: user._id,
  })
  .sort("-createdAt")
  .populate([
    {
      path: "companyId",
      select: {name : 1 }
    },{
      path: "jobId",
      select: {name :1}
    }
  ])
}

  async updateStatus(_id: string, status: string, user: IUser  ) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return { message: 'Invalid user ID' };
    }
      const updated = await this.resumeModel.updateOne(
        {_id },
        {
          status,
          updatedBy:{
            _id: user._id,
            email: user.email
          },
          $push:{
            history: {
              status: status, 
              updatedAt: new Date,
              updatedBy: {
                _id: user._id,
                email: user.email
              }
            }
          }
        });
        return updated;
  } 



  async remove(id: string, user: IUser) {
    const existingUser = await this.resumeModel.findById(id);
    if (!existingUser) {
      throw new BadRequestException(`User with ID ${id} does not exits`);
    }
    console.log("check user ", user.role);
    // check role by Delete 
    // if (user.role !== 'ADMIN') {
    //   throw new ForbiddenException('You do not have permission to remove this user');
    // }
    await this.resumeModel.updateOne({
      _id : id 
    },
     {DeletedBy : {
      _id : user._id,
      email : user.email,
    } 
   }
  )
    return this.resumeModel.softDelete({
      _id : id 
    })
  }
  


}
