import {
  Controller,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { OrganizationUsersService } from './organization-users.service';

@Controller('organization-users')
export class OrganizationUsersController {
  constructor(
    private readonly organizationUsersService: OrganizationUsersService,
  ) {}

  @Get()
  async getAllOrganizationUsers(
    @Query('org_id') org_id?: number,
    @Query('user_id') user_id?: number,
  ) {
    try {
      return await this.organizationUsersService.getAllOrganizationUsers(
        org_id,
        user_id,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch organization users',
      );
    }
  }
}
