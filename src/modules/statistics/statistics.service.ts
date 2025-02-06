import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { KnexService } from '../../database/knex.service';

@Injectable()
export class StatisticsService {
  constructor(private knexService: KnexService) {}

  async getOrganizationStatistics() {
    try {
      return this.knexService
        .getKnex()
        .from('organizations')
        .count('projects.id as project_count')
        .count('tasks.id as task_count')
        .leftJoin('projects', 'organizations.id', 'projects.org_id')
        .leftJoin('tasks', 'projects.id', 'tasks.project_id')
        .groupBy('organizations.id')
        .select('organizations.name as organization_name');
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching organization statistics',
      );
    }
  }

  async getProjectStatistics(orgId: number) {
    try {
      return this.knexService
        .getKnex()
        .from('projects')
        .count('tasks.id as task_count')
        .leftJoin('tasks', 'projects.id', 'tasks.project_id')
        .leftJoin('organizations', 'projects.org_id', 'organizations.id')
        .where('projects.org_id', orgId)
        .groupBy('projects.id', 'organizations.name')
        .select(
          'projects.name as project_name',
          'organizations.name as organization_name',
        );
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching project statistics',
      );
    }
  }

  async getGeneralStatistics() {
    try {
      const organizationsCount = await this.knexService
        .getKnex()
        .from('organizations')
        .count('* as total_organizations');

      const projectsCount = await this.knexService
        .getKnex()
        .from('projects')
        .count('* as total_projects');

      const tasksCount = await this.knexService
        .getKnex()
        .from('tasks')
        .count('* as total_tasks');

      return {
        total_organizations: organizationsCount[0].total_organizations,
        total_projects: projectsCount[0].total_projects,
        total_tasks: tasksCount[0].total_tasks,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching general statistics',
      );
    }
  }
}
