
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
    
    @IsNotEmpty()
    name : string ;

    @IsNotEmpty()
    address : string ;
    
    description : string ;
}
