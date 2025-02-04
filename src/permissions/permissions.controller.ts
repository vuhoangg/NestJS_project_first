import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Version('1')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto,  @User() user: IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }


  @Get()
  findAll(@Query("current") currentPage : string,
  @Query("pageSize") limit : string,
  @Query() qs :string ,) {
    return this.permissionsService.findAll(+currentPage, +limit, qs );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto,  @User() user: IUser) {
    return this.permissionsService.update(id, updatePermissionDto, user );
  }

  @Version('1')
  @Delete(':id')
  remove(
  @Param('id') id: string,
   @User() user : IUser) {
    return this.permissionsService.remove(id, user );
  }
}
