import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

// api/v1

  @Version('1')
  @Post()
  create(
    @Body() createJobDto: CreateJobDto, @User() user : IUser 
  ) {
    return this.jobsService.create(createJobDto, user);
  }

  @Version('1')
  @Public()
  @Get()
  findAll(@Query("current") currentPage : string,
  @Query("pageSize") limit : string,
  @Query() qs :string ,
) {
    return this.jobsService.findAll(+currentPage, +limit, qs );
  }

  @Version('1')
  @Patch(':id')
  update2(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user : IUser) {
    return this.jobsService.update2(id, updateJobDto, user );
  }


  @Version('2')
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }


 
  @Version('1')
  @Patch()
  async update(
    @Body() updateJobDto: UpdateJobDto, 
    @User() user: IUser) {
    let updateJob = await this.jobsService.update(updateJobDto , user);
    return updateJob ;
  }
  



  @Version('1')
  @Delete(':id')
  remove(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.jobsService.remove(id, user );
  }
}
