import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
export class UpdateUserDto extends PartialType(CreateUserDto) {

   
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;

    @IsEmail()
    @IsNotEmpty()
    email : string ;

    @IsNotEmpty()
    password : string ;
    
    name : string ;
    address : string ;
}
