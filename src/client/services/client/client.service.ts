import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/client/client.dto';
import { Client } from 'src/typeorm/client.entity';
import { Template } from 'src/typeorm/template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
    @InjectRepository(Template) private readonly templateRepository: Repository<Template>
  ) {}

  async createClient(body: CreateClientDto) {
    const template = await this.templateRepository.findOneBy({id: body.template});
    if(!template) {
      throw new NotFoundException('Template no existe')
    }
    const newClient = new Client();
    newClient.clientName = body.clientName;
    newClient.template = template;
    return this.clientRepository.save(newClient);
  }
  
  async getClientById(id: number) {
    const client = await this.clientRepository.findOne({
      relations: {
        template: true
      },
      where: {
        id
      }
    });    
    if (!client) {
      throw new NotFoundException('El cliente no existe')
    }
    return client;
  }

  getClients() {
    return this.clientRepository.find();
  }
}
