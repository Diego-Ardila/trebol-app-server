import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './controllers/client/client.controller';
import { ClientService } from './services/client/client.service';
import { Client } from 'src/typeorm/client.entity';
import { Template } from 'src/typeorm/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Template])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
