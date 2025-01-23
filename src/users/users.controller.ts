import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // api v1 
  @Version('1')
  @Post()
  async  create(@Body() createUserDto: CreateUserDto, @User() user : IUser ) {
    let newUser = await this.usersService.create(createUserDto, user);
    return {
      _id : newUser?._id,
      createAt : newUser?.createAt
    }
  }

  @Version('1')
  @Get()
  findAll(
    @Query("current") currentPage : string ,
    @Query("pageSize" )limit : string ,
    @Query() qs :string, 
  ) {
    return this.usersService.findAll(+currentPage,+limit,qs);
  }

  @Version('1')
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {
    const foundUser = await this.usersService.findOne(id);

    return this.usersService.findOne(id);
  }

 

  // @Version('3')
  // @Patch(':id')
  // async update3(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto, 
  //   @User() user : IUser) {
  //   let updateUser = await this.usersService.update3( id, updateUserDto, user);
  //   return updateUser ;
  // }

  @Version('1')
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto, 
    @User() user: IUser) {
    let updateUser = await this.usersService.update(  updateUserDto, user);
    return updateUser ;
  }

  @Version('1')
  @Delete(':id')
  remove(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.usersService.remove(id, user );
  }


  // api v2

  @Version('2')
  @Post()
  create2(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create2(createUserDto);
  }

  @Version('2')
  @Patch(':id')
   update2(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update2(id, updateUserDto);
  }


  @Version('2')
  @Delete(':id')
  remove2(@Param('id') id: string) {
    return this.usersService.remove2(id);
  }


}
