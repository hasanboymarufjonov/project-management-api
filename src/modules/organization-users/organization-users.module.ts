import { Module } from '@nestjs/common';
import { OrganizationUsersController } from './organization-users.controller';
import { OrganizationUsersService } from './organization-users.service';
import { KnexService } from '../../database/knex.service';

@Module({
  controllers: [OrganizationUsersController],
  providers: [OrganizationUsersService, KnexService],
})
export class OrganizationUsersModule {}
