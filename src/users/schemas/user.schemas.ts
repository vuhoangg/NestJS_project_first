
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({required : true})
  email: string;

  @Prop({required : true})
  password: string;


  @Prop()
  gender: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({type: Object})
  Company : {
    _id :  mongoose.Schema.Types.ObjectId;
    email: string ;
  }

  @Prop()
  age: number ;

  @Prop()
  address: string;

  @Prop()
  role: string ;

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

export const UserSchema = SchemaFactory.createForClass(User);



