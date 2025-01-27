import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { error } from "console";
import fs from "fs";


@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: './upload',
    };
  }

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
}