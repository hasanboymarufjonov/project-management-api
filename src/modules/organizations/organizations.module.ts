import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { KnexService } from 'src/database/knex.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, KnexService],
})
export class OrganizationsModule {}
