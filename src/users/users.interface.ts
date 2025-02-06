import mongoose from "mongoose";

export interface IUser{
    _id: string ;
    name: string ;
    email: string ;
    // role: string ; 
    role:{
      _id: string ;
      name: string;
    };
    permissions?:{
      _id: string;
      name: string;
      apiPath: string;
      module: string ;
    }[]

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