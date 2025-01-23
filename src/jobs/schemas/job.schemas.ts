import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({timestamps: true})
export class Job {

  @Prop()
  name: string;

  @Prop()
  skills: string;


  @Prop()
  location : string;

  @Prop({type: Object})
  company : {
    _id :  mongoose.Schema.Types.ObjectId;
    name: string ;
  }
  @Prop()
  salary : number ;

  @Prop()
  quantity : number;

  @Prop()
  level: string;


  @Prop()
  description: string ;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;


  // basic 
  @Prop()
  refreshToken: string;

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

export const JobSchema = SchemaFactory.createForClass(Job);



