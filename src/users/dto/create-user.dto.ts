import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
class Company {
   
    //@IsNotEmpty()
    _id:mongoose.Schema.Types.ObjectId;

    //@IsNotEmpty()
    name: string ;
 }
export class CreateUserDto {
    //@IsEmail()
    //@IsNotEmpty({message: "Email cannot be blank"})
    email : string ;

    //@IsNotEmpty({message: "Password cannot be blank"})
    password : string ;

    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsNotEmpty({message: "address cannot be blank"})
    address : string ;

    //@IsNotEmpty({message: "age cannot be blank"})
    age: number  ;

    //@IsNotEmpty({message: "gender cannot be blank"})
    gender : string ;

    //@IsNotEmpty({message: "role cannot be blank"})
    role : string ;


    //@IsNotEmptyObject()
    //@IsObject()
    //@ValidateNested()
    @Type(() => Company)
    company: Company ;


}
export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty({message: "Email cannot be blank"})
    email : string ;

    @IsNotEmpty({message: "Password cannot be blank"})
    password : string ;

    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsNotEmpty({message: "address cannot be blank"})
    address : string ;

    @IsNotEmpty({message: "age cannot be blank"})
    age: number  ;

    @IsNotEmpty({message: "gender cannot be blank"})
    gender : string ;


}
