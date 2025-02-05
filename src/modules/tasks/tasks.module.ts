import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { KnexService } from 'src/database/knex.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, KnexService],
})
export class TasksModule {}
