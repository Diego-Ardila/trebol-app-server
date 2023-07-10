import { Module } from '@nestjs/common';
import { EnterpriseController } from './controllers/enterprise/enterprise.controller';
import { EnterpriseService } from './services/enterprise/enterprise.service';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService]
})
export class EnterpriseModule {}
