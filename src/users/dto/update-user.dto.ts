import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {

    // @IsNotEmpty()
    // _id  : string ;

    // @IsEmail()
    @IsNotEmpty()
    email : string ;



    // @IsNotEmpty()
    password : string ;
    
    name : string ;
    address : string ;
}
