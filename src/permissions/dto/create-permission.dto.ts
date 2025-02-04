import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {

    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsNotEmpty({message: "apiPath cannot be blank"})
    apiPath : string ;

    @IsNotEmpty({message: "method cannot be blank"})
    method : number;

    @IsNotEmpty({message: "module cannot be blank"})
    module : string;
}
