import { Module } from '@nestjs/common';
import { TemplateController } from './controllers/template/template.controller';
import { TemplateService } from './services/template/template.service';

@Module({
  controllers: [TemplateController],
  providers: [TemplateService]
})
export class TemplateModule {}
