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
import { TemplateService } from 'src/template/services/template/template.service';
import { CreateTemplateDto } from 'src/template/template.dto';

@Controller('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService
  ) {}

  @Get()
  getTemplates() {
    return this.templateService.getTemplates();
  }
  
  @Get(':id')
  findTemplatesById(@Param('id', ParseIntPipe) id: number) {
    return this.templateService.getTemplateById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  createTemplate(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.createTemplate(createTemplateDto);
  }
}
