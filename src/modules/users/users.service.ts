import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { KnexService } from '../../database/knex.service';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly knexService: KnexService) {}

  async getAllUsers() {
    const users = await this.knexService.getKnex().select('*').from('users');
    if (users.length === 0) {
      throw new NotFoundException('No users found.');
    }
    return users;
  }

  async createUser(data: { name: string; role: string; created_by?: number }) {
    if (!Object.values(UserRole).includes(data.role as UserRole)) {
      throw new BadRequestException('Invalid role');
    }

    if (data.created_by) {
      const createdByUser = await this.knexService
        .getKnex()
        .select('id')
        .from('users')
        .where({ id: data.created_by })
        .first();

      if (!createdByUser) {
        throw new NotFoundException('Creator user not found.');
      }
    }

    const [newUser] = await this.knexService
      .getKnex()
      .insert(data)
      .into('users')
      .returning(['id', 'name', 'role', 'created_by']);

    return newUser;
  }

  async updateUser(
    id: number,
    data: { name?: string; role?: string; created_by?: number },
  ) {
    const userExists = await this.knexService
      .getKnex()
      .select('id')
      .from('users')
      .where({ id })
      .first();

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    if (data.role && !Object.values(UserRole).includes(data.role as UserRole)) {
      throw new BadRequestException('Invalid role');
    }

    if (data.created_by) {
      const createdByUser = await this.knexService
        .getKnex()
        .select('id')
        .from('users')
        .where({ id: data.created_by })
        .first();

      if (!createdByUser) {
        throw new NotFoundException('Creator user not found.');
      }
    }

    await this.knexService.getKnex().table('users').where({ id }).update(data);
    return { message: 'User updated successfully' };
  }

  async deleteUser(id: number) {
    const userExists = await this.knexService
      .getKnex()
      .select('id')
      .from('users')
      .where({ id })
      .first();

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    await this.knexService.getKnex().table('users').where({ id }).del();
    return { message: 'User deleted successfully' };
  }

  async assignUserToOrganization(org_id: number, user_id: number) {
    await this.knexService
      .getKnex()
      .insert({
        org_id,
        user_id,
      })
      .into('organization_users');
    return { message: 'User successfully added to organization' };
  }

  async getUsersByOrganization(org_id: number) {
    if (!org_id) {
      throw new Error('Organization ID is required');
    }

    return this.knexService
      .getKnex()
      .select('u.*')
      .from('users as u')
      .innerJoin('organization_users as ou', 'u.id', 'ou.user_id')
      .where('ou.org_id', org_id);
  }
}
