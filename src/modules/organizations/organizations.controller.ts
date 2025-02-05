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
import { OrganizationsService } from './organizations.service';
import { AdminGuard } from '../../guards/admin.guards';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async getAllOrganizations() {
    return this.organizationsService.getAllOrganizations();
  }

  @Post()
  @UseGuards(AdminGuard)
  async createOrganization(
    @Body() body: { name: string; created_by?: number },
  ) {
    return this.organizationsService.createOrganization(body);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateOrganization(
    @Param('id') id: number,
    @Body() body: { name: string; created_by?: number },
  ) {
    return this.organizationsService.updateOrganization(id, body);
  }

  @Delete(':id')
  async deleteOrganization(@Param('id') id: number) {
    return this.organizationsService.deleteOrganization(id);
  }
}
