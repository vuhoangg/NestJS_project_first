

import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateJobDto {


    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsNotEmpty({message: "skills cannot be blank"})
    skills : string ;

    @IsNotEmpty({message: "salary cannot be blank"})
    salary: number  ;

    @IsNotEmpty({message: "quantity cannot be blank"})
    quantity: number  ;

    @IsNotEmpty({message: "location cannot be blank"})
    location : string ;

    @IsNotEmpty({message: "level cannot be blank"})
    level : string ;

    @IsNotEmpty({message: "description cannot be blank"})
    description  : string ;

    @IsNotEmpty({message: "description cannot be blank"})
    startDate  : Date ;

    @IsNotEmpty({message: "description cannot be blank"})
    endDate  : Date  ;

    isActive: boolean ;


}
