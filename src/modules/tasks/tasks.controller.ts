import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post()
  async createTask(
    @Body()
    body: {
      title: string;
      project_id: number;
      worker_user_id?: number;
      status: string;
      created_by?: number;
      due_date?: string;
    },
  ) {
    return this.tasksService.createTask(body);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body()
    body: {
      title: string;
      project_id: number;
      worker_user_id?: number;
      status: string;
      created_by?: number;
      due_date?: string;
    },
  ) {
    return this.tasksService.updateTask(id, body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Get('user/:user_id/project/:project_id')
  async getTasksByUserInProject(
    @Param('user_id') user_id: number,
    @Param('project_id') project_id: number,
  ) {
    return this.tasksService.getTasksByUserInProject(user_id, project_id);
  }

  @Get('user/:user_id/status/:status')
  async getTasksByUserAndStatus(
    @Param('user_id') user_id: number,
    @Param('status') status: string,
  ) {
    return this.tasksService.getTasksByUserAndStatus(user_id, status);
  }

  @Put(':id/complete')
  async completeTask(@Param('id') id: number) {
    return this.tasksService.completeTask(id);
  }
}
