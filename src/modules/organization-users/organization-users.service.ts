import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { KnexService } from '../../database/knex.service';

@Injectable()
export class OrganizationUsersService {
  constructor(private readonly knexService: KnexService) {}

  async getAllOrganizationUsers(org_id?: number, user_id?: number) {
    try {
      const query = this.knexService
        .getKnex()
        .select('*')
        .from('organization_users');

      if (org_id) {
        query.where('org_id', org_id);
      }
      if (user_id) {
        query.andWhere('user_id', user_id);
      }

      return await query;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving organization users',
      );
    }
  }
}
