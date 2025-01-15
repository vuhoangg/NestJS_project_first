import mongoose from "mongoose";

export interface IUser{
    _id: string ;
    name: string ;
    email: string ;
    role: string ; 
    gender: string;
    phone: string;
    Company : {
      _id :  mongoose.Schema.Types.ObjectId;
      email: string ;
    }
    age: number ;
    address: string;
    refeshToken: string;
}