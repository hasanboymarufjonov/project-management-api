import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { KnexService } from '../database/knex.service';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly knexService: KnexService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const creatorId = request.body?.created_by;

    if (!creatorId) {
      throw new ForbiddenException('Admin ID is required.');
    }

    const user = await this.knexService
      .getKnex()
      .select('role')
      .from('users')
      .where({ id: creatorId })
      .first();

    if (!user || user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admin users can perform this action.');
    }

    return true;
  }
}
