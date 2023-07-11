import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  } from '@nestjs/common';
import { CreateEnterpriseDto } from 'src/enterprise/enterprise.dto';
import { EnterpriseService } from 'src/enterprise/services/enterprise/enterprise.service';

@Controller('enterprise')
export class EnterpriseController {
  constructor(
    private readonly enterpriseService: EnterpriseService
  ) {}

  @Get()
  getEnterprises() {
    return this.enterpriseService.getEnterprises();
  }
  
  @Get(':id')
  findEnterprisesById(@Param('id', ParseIntPipe) id: number) {
    return this.enterpriseService.getEnterpriseById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createEnterprise(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.createEnterprise(createEnterpriseDto);
  }
}
