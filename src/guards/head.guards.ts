import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { KnexService } from 'src/database/knex.service';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class HeadGuard implements CanActivate {
  constructor(private readonly knexService: KnexService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const creatorId = request.body?.created_by;

    if (!creatorId) {
      throw new ForbiddenException('Creator ID is required.');
    }

    const user = await this.knexService
      .getKnex()
      .select('role')
      .from('users')
      .where({ id: creatorId })
      .first();

    if (!user || user.role !== UserRole.HEAD) {
      throw new ForbiddenException('Only HEAD users can perform this action.');
    }

    return true;
  }
}
