import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { KnexService } from 'src/database/knex.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, KnexService],
})
export class ProjectsModule {}
