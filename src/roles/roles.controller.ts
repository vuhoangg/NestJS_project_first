import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Version('1')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto, @User() user : IUser  ) {
    return this.rolesService.create(createRoleDto, user );
  }

  @Get()
  findAll(
  @Query("current") currentPage : string ,
  @Query("pageSize") limit : string ,
  @Query() qs : string ,
  ) {
    return this.rolesService.findAll(+currentPage , +limit, qs );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user : IUser ) {
    return this.rolesService.update(id, updateRoleDto, user );
  }

  @Version('1')
  @Delete(':id')
  remove(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.rolesService.remove(id, user );
  }
}
