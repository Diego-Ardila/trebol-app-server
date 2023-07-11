import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateController } from './controllers/template/template.controller';
import { TemplateService } from './services/template/template.service';
import { Template } from 'src/typeorm/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
