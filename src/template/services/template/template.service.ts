import { Injectable, NotFoundException } from '@nestjs/common';
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
  
  async getTemplateById(id: number) {
    const template = await this.templateRepository.findOneBy({id});
    if (!template) {
      throw new NotFoundException('El template no existe')
    }

    return template;
  }

  getTemplates() {
    return this.templateRepository.find();
  }
}
