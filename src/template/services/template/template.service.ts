import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTemplateDto } from 'src/template/template.dto';
import { Template } from 'src/typeorm/template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template) private readonly templateRepository: Repository<Template>
  ) {}

  createTemplate(body: CreateTemplateDto) {
    const newTemplate = this.templateRepository.create(body);
    return this.templateRepository.save(newTemplate);
  }
  
  getTemplateById(id: number) {
    return this.templateRepository.findOneBy({id});
  }

  getTemplates() {
    return this.templateRepository.find();
  }
}
