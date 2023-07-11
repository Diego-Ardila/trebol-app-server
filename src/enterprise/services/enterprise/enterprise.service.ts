import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnterpriseDto } from 'src/enterprise/enterprise.dto';
import { Client } from 'src/typeorm/client.entity';
import { Enterprise } from 'src/typeorm/enterprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise) private readonly enterpriseRepository: Repository<Enterprise>,
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>
  ) { }

  async createEnterprise(body: CreateEnterpriseDto) {
    const client = await this.clientRepository.findOne({
      relations: {
        template: true
      },
      where: {
        id: body.client
      }
    });
    if (!client) {
      throw new NotFoundException('Cliente no existe')
    }
    const newEnterprise = new Enterprise();
    newEnterprise.id = body.id;
    newEnterprise.enterpriseName = body.enterpriseName;
    newEnterprise.email = body.email;
    newEnterprise.files = client.template.inputs;
    newEnterprise.client = client;
    return this.enterpriseRepository.save(newEnterprise);
  }

  getEnterpriseById(id: number) {
    return this.enterpriseRepository.findOneBy({ id });
  }

  getEnterprises() {
    return this.enterpriseRepository.find();
  }
}
