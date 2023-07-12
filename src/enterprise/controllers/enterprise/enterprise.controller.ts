import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Put
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEnterpriseDto } from 'src/enterprise/enterprise.dto';
import { EnterpriseService } from 'src/enterprise/services/enterprise/enterprise.service';
import { Express } from 'express';
import { FileData, FileUploadParams } from 'src/enterprise/types';

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

  @Post('/file/:enterpriseId/:templateInputId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param() params: FileUploadParams) {
    const fileBody: FileData = {
      fileName: file.originalname,
      file: file.buffer,
      mimeType: file.mimetype
    }
    return this.enterpriseService.uploadFile(fileBody, params);
  }

  @Put('/delete/file/:enterpriseId/:templateInputId')
  deleteFile(@Param() params: FileUploadParams) {
    return this.enterpriseService.deleteFile(params);
  }
}
