import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { JobSchema } from './schemas/resume.schemas';
import { Job } from 'src/jobs/schemas/job.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports :[MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
