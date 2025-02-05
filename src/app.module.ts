import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { KnexService } from './database/knex.service';

@Module({
  imports: [UsersModule, OrganizationsModule],
  providers: [KnexService],
})
export class AppModule {}
