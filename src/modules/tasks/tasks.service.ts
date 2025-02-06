import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

interface TaskData {
  name: string;
  project_id: number;
  worker_user_id?: number;
  status: string;
  created_by?: number;
  due_date?: string;
}

@Injectable()
export class TasksService {
  constructor(private readonly knexService: KnexService) {}

  async getAllTasks(projectId?: number) {
    try {
      const knex = this.knexService.getKnex();

      let query = knex('tasks').select('*');

      if (projectId) {
        query = query.where('project_id', projectId);
      }

      const tasks = await query;
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async createTask(data: TaskData) {
    try {
      const [newTask] = await this.knexService
        .getKnex()
        .insert(data)
        .into('tasks')
        .returning([
          'name',
          'project_id',
          'worker_user_id',
          'status',
          'created_by',
          'due_date',
        ]);
      return newTask;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task' + error);
    }
  }

  async updateTask(id: number, data: TaskData) {
    try {
      const affectedRows = await this.knexService
        .getKnex()
        .table('tasks')
        .where({ id })
        .update(data);

      if (affectedRows === 0) {
        throw new NotFoundException('Task not found');
      }

      return { message: 'Task updated successfully' };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: number) {
    try {
      const affectedRows = await this.knexService
        .getKnex()
        .table('tasks')
        .where({ id })
        .del();

      if (affectedRows === 0) {
        throw new NotFoundException('Task not found');
      }

      return { message: 'Task deleted successfully' };
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Failed to delete task');
    }
  }

  async getTasksByUserInProject(user_id: number, project_id: number) {
    return this.knexService
      .getKnex()
      .select('*')
      .from('tasks')
      .where('worker_user_id', user_id)
      .andWhere('project_id', project_id);
  }

  async getTasksByUserAndStatus(user_id: number, status: string) {
    return this.knexService
      .getKnex()
      .select('*')
      .from('tasks')
      .where('worker_user_id', user_id)
      .andWhere('status', status);
  }

  async completeTask(id: number) {
    const now = new Date().toISOString();
    await this.knexService.getKnex().table('tasks').where({ id }).update({
      status: 'DONE',
      done_at: now,
    });
    return { message: 'Task marked as completed', done_at: now };
  }
}
