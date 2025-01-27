import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { error } from "console";
import fs from "fs";
import { diskStorage } from "multer";
import path, { join } from "path";


@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
//   createMulterOptions(): MulterModuleOptions {
//     return {
//       dest: './upload',
//     };
//   }

  getRootPath =()=>{
    return process.cwd();
  }

  ensureExists(targetDirectory: string){
    fs.mkdir(targetDirectory, {recursive: true }, (error)=> {
        if(!error){
        console.log('Directory successfully created, or it already exists.');
        return;
    }
    switch(error.code){
        case 'EEXIST':
            //ERROR:
            // Requested location already exists, but it's not a directory.
            break;
        case 'ENOTDIR':
            // ERROR;
            // The parent hierachy contains a file with the same name as the dir 
            // you're trying to create 
            break;
        default:
            // Some other error like permission denied
            console.error(error);
            break;
        }
    });
  }

  createMulterOptions(): MulterModuleOptions{
    return{
        storage: diskStorage({
            destination:(req, file, cb) =>{
                const folder = req?.headers?.folder_type ?? "defaul";
                this.ensureExists('public/images/${folder}');
                cb(null, join(this.getRootPath(), 'public/images/${folder}'))
            },
            filename: (req, file , cb)=>{
                // get image extension 
                let extName = path.extname(file.originalname);
                // get image's name (without extension );
                let baseName = path.basename(file.originalname, extName );
                
                let finalName = `${baseName}-${Date.now()}${extName}`
                cb(null, finalName)
            }
        })
        };
    }

}