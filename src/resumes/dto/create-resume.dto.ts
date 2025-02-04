
import { IsArray, IsDate, IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

export class CreateResumeDto {

    @IsNotEmpty({message :' email không được để trống' , })
    email: string ;

    @IsNotEmpty({message :' userId không được để trống' , })
    userId:  mongoose.Schema.Types.ObjectId ;

    @IsNotEmpty({message :' url không được để trống' , })
    url: string ;

    @IsNotEmpty({message :' userId không được để trống' , })
    companyId: mongoose.Schema.Types.ObjectId  ;

    @IsNotEmpty({message: 'jod không được trống '})
    jobId: mongoose.Schema.Types.ObjectId;

}

export class CreateUserCvDto{

    @IsNotEmpty({message :' url do not leave blank ' , })
    url: string ;

    @IsNotEmpty({message :' userId  do not leave blank' , })
    @IsMongoId({message: 'jobId is a mongo id '})
    companyId: mongoose.Schema.Types.ObjectId  ;
    
    @IsNotEmpty({message: 'jodb do not leave blank '})
    @IsMongoId({message: 'jobId is a mongo id '})
    jobId: mongoose.Schema.Types.ObjectId;
}