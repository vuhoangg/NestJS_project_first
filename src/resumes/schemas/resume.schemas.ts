

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Resume>;

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

  @Prop()
  companyId :  mongoose.Schema.Types.ObjectId;

  @Prop()
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
  createAt: Date;

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

export const JobSchema = SchemaFactory.createForClass(Resume);



