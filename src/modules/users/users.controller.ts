import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../../guards/admin.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createUser(
    @Body() body: { name: string; role: string; created_by?: number },
  ) {
    return this.usersService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() body: { name: string; role: string; created_by?: number },
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Post('assign')
  async assignUserToOrganization(
    @Body('org_id') org_id: number,
    @Body('user_id') user_id: number,
  ) {
    return this.usersService.assignUserToOrganization(org_id, user_id);
  }

  @Get('organization/:org_id')
  async getUsersByOrganization(@Param('org_id') org_id: number) {
    return this.usersService.getUsersByOrganization(org_id);
  }
}
