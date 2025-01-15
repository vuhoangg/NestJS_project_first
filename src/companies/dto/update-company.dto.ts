import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
    @IsNotEmpty()
    name : string ;

    @IsNotEmpty()
    address : string ;
    
    description : string ;
}
