import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {

    @IsNotEmpty({message: "name cannot be blank"})
    name : string ;

    @IsNotEmpty({message: " description cannot be blank"})
    description : string ;

    @IsBoolean({message: " isActive type value Boolean "})
    @IsNotEmpty({message: " isActive cannot be blank"})
    isActive : boolean;

    @IsNotEmpty({message: "module cannot be blank"})
    @IsMongoId({each : true,  message: 'each permisson is mongo object id '})
    @IsArray({message: 'permission has format is array  '})
    permission : mongoose.Schema.Types.ObjectId[] ;
}
