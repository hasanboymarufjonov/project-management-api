import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly knexService: KnexService) {}

  async getAllProjects() {
    return this.knexService.getKnex().select('*').from('projects');
  }

  async createProject(data: {
    name: string;
    org_id: number;
    created_by?: number;
  }) {
    const orgExists = await this.knexService
      .getKnex()
      .select('id')
      .from('organizations')
      .where({ id: data.org_id })
      .first();

    if (!orgExists) {
      throw new BadRequestException(
        `Organization with ID ${data.org_id} does not exist`,
      );
    }

    const [newProject] = await this.knexService
      .getKnex()
      .insert(data)
      .into('projects')
      .returning(['id', 'name', 'org_id', 'created_by']);

    return newProject;
  }

  async updateProject(
    id: number,
    data: { name: string; org_id: number; created_by?: number },
  ) {
    const projectExists = await this.knexService
      .getKnex()
      .select('id')
      .from('projects')
      .where({ id })
      .first();

    if (!projectExists) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (data.org_id) {
      const orgExists = await this.knexService
        .getKnex()
        .select('id')
        .from('organizations')
        .where({ id: data.org_id })
        .first();

      if (!orgExists) {
        throw new BadRequestException(
          `Organization with ID ${data.org_id} does not exist`,
        );
      }
    }

    await this.knexService
      .getKnex()
      .table('projects')
      .where({ id })
      .update(data);

    return { message: 'Project updated successfully' };
  }

  async deleteProject(id: number) {
    const result = await this.knexService
      .getKnex()
      .table('projects')
      .where({ id })
      .del();

    if (!result) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return { message: 'Project deleted successfully' };
  }
}
