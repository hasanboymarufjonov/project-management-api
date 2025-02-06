import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { OrganizationUsersModule } from './modules/organization-users/organization-users.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { KnexService } from './database/knex.service';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    OrganizationUsersModule,
    StatisticsModule,
  ],
  providers: [KnexService],
})
export class AppModule {}
