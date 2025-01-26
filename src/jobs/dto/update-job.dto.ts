import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateJobDto extends PartialType(CreateJobDto) {
 
    _id: mongoose.Schema.Types.ObjectId;
}