import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';

@Injectable()
export class OrganizationsService {
  constructor(private readonly knexService: KnexService) {}

  async getAllOrganizations() {
    return this.knexService.getKnex().select('*').from('organizations');
  }

  async createOrganization(data: {
    name: string;
    created_by?: number;
    address: string;
  }) {
    const userExists = await this.knexService
      .getKnex()
      .select('id')
      .from('users')
      .where('id', data.created_by)
      .first();

    if (!userExists) {
      throw new BadRequestException(
        'The provided created_by user does not exist',
      );
    }

    const [newOrganization] = await this.knexService
      .getKnex()
      .insert(data)
      .into('organizations')
      .returning(['id', 'name', 'created_by']);

    return newOrganization;
  }

  async updateOrganization(
    id: number,
    data: { name: string; created_by?: number },
  ) {
    const organization = await this.knexService
      .getKnex()
      .select('*')
      .from('organizations')
      .where('id', id)
      .first();

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    await this.knexService
      .getKnex()
      .table('organizations')
      .where({ id })
      .update(data);

    return { message: 'Organization updated successfully' };
  }

  async deleteOrganization(id: number) {
    const organization = await this.knexService
      .getKnex()
      .select('*')
      .from('organizations')
      .where('id', id)
      .first();

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    await this.knexService.getKnex().table('organizations').where({ id }).del();

    return { message: 'Organization deleted successfully' };
  }
}
