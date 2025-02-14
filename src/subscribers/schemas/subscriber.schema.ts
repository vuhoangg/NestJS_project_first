
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

export type SubscriberDocument = HydratedDocument<Subscriber>;

@Schema({timestamps: true})
export class Subscriber {
  @Prop({required : true})
  email: string;

  @Prop()
  name: string;

  @Prop()
  skills: string[];





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

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);




