import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, User } from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // create user api/v1/user
  @Version('1')
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  // create user api/v2/user
  @Version('2')
  @Public()
  @Post()
  async  create2(@Body() createUserDto: CreateUserDto, @User() user : IUser ) {
    let newUser = await this.usersService.create2(createUserDto, user);
    return {
      _id : newUser?._id,
      createAt : newUser?.createAt
    }
  }

  @Version('1')
  @Public()
  @Get()
  findAll(
    @Query("current") currentPage : string ,
    @Query("pageSize" )limit : string ,
    @Query() qs :string, 

  ) {
    return this.usersService.findAll(+currentPage,+limit,qs);
  }

  @Version('2')
  @Public()
  @Get()
  findAllBase() {
    return this.usersService.findAll2();
  }


  @Public()
  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {
    const foundUser = await this.usersService.findOne(id);

    return this.usersService.findOne(id);
  }
  @Version('1')
  @Public()
  @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Version('2')
  @Patch(':id')
  async update2(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto, 
    @User() user : IUser) {
    let updateUser = await this.usersService.update2( id, updateUserDto, user);
    return updateUser ;
  }
  @Public()
  @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Version('2')
  @Delete(':id')
  remove2(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.usersService.remove2(id, user );
  }
}
