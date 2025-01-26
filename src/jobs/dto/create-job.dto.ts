

import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

class Company {
   
    @IsNotEmpty()
    _id:mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string ;

  }

export class CreateJobDto {


    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsString({ each: true, message: "skill định dạng là string "})
    @IsArray({message: "skill định dạng là array "}) 
    @IsNotEmpty({message: "skills cannot be blank"})
    skills : string [];

    @IsNotEmpty({message: "salary cannot be blank"})
    salary: number  ;

    @IsNotEmpty({message: "quantity cannot be blank"})
    quantity: number  ;

    // @IsNotEmpty({message: "location cannot be blank"})
    // location : string ;

    @IsNotEmpty({message: "level cannot be blank"})
    level : string ;

    @IsNotEmpty({message: "description cannot be blank"})
    description  : string ;

    @IsNotEmpty({message: "description cannot be blank"})
    @Transform(({value }) => new Date(value)) 
    @IsDate({message: "endDate có định dạng là Date"})
    startDate  : Date ;

    @IsNotEmpty({message: "description cannot be blank"})
    endDate  : Date  ;

    isActive: boolean ;

     
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company ;


}
