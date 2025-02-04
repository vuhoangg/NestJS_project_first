import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}


  @Version('1')
  @Post()
  create(@Body() createUserCvDto: CreateUserCvDto, @User() user: IUser ) {
    return this.resumesService.create(createUserCvDto, user );
  }

  @Get()
  findAll(@Query("current") currentPage : string,
  @Query("pageSize") limit : string,
  @Query() qs :string ,) {
    return this.resumesService.findAll(+currentPage, +limit, qs );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  // update status 
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body("status") status: string , @User() user: IUser ) {
    return this.resumesService.updateStatus(id, status, user) ;
  }

  @Post('by-user')
  @ResponseMessage("Get Resumes by User ") 
  getResumesByUser(@User() user: IUser ){
    return this.resumesService.findByUsers(user) ;
  }

  @Version('1')
  @Delete(':id')
  remove(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.resumesService.remove(id, user );
  }
}
