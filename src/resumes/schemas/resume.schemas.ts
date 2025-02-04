

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/entities/company.schema';
import { Job } from 'src/jobs/schemas/job.schemas';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({timestamps: true})
export class Resume {

  @Prop()
  email: string;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  status: string;

  @Prop({type : mongoose.Schema.Types.ObjectId, ref: Company.name })
  companyId :  mongoose.Schema.Types.ObjectId;

  @Prop({type : mongoose.Schema.Types.ObjectId, ref: Job.name })
  jobId :  mongoose.Schema.Types.ObjectId;

 

  @Prop()
  startDate: Date;

  @Prop({type:  mongoose.Schema.Types.Array})
  history:{
    status: string; 
    updateAt: Date;
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
  }[]


  @Prop()
  createdAt: Date;

  @Prop()
  updateAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deleteAt: Date;

  @Prop({ type: Object })
  createdBy:{
    _id :  mongoose.Schema.Types.ObjectId;
    email: string ;
  }

  @Prop({ type: Object })
  updatedBy:{
    _id :  mongoose.Schema.Types.ObjectId;
    email: string;
  }

  @Prop({ type: Object })
  DeletedBy:{
    _id : mongoose.Schema.Types.ObjectId;
    email: string;
  }




}

export const ResumeSchema = SchemaFactory.createForClass(Resume);



