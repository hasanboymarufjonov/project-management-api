import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { KnexService } from './database/knex.service';

@Module({
  imports: [UsersModule, OrganizationsModule, ProjectsModule, TasksModule],
  providers: [KnexService],
})
export class AppModule {}
