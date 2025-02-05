import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { KnexService } from './database/knex.service';

@Module({
  imports: [UsersModule, OrganizationsModule],
  controllers: [AppController],
  providers: [KnexService, AppService],
})
export class AppModule {}
