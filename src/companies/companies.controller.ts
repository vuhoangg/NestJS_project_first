import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Version } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user : IUser) {
    console.log("check information : user ", user );
    return this.companiesService.create(createCompanyDto, user );
  }

 
  @Version('1')

  @Get()
  @ResponseMessage("Fetch list company with paginate")
  findAll2(
    @Query("page") currentPage: string,
    @Query("limit") limit : string, 
    @Query() qs: string
  ) {
    return this.companiesService.findAll(+currentPage,+limit, qs );
  }

  @Version('1')

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user : IUser) {
    return this.companiesService.update(id, updateCompanyDto, user );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser ) {
    return this.companiesService.remove(id, user );
  }
}
