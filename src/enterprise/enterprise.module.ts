import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseController } from './controllers/enterprise/enterprise.controller';
import { EnterpriseService } from './services/enterprise/enterprise.service';
import { Enterprise } from 'src/typeorm/enterprise.entity';
import { Client } from 'src/typeorm/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Enterprise])],
  controllers: [EnterpriseController],
  providers: [EnterpriseService]
})
export class EnterpriseModule {}
