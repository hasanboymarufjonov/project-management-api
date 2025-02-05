import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async getAllOrganizations() {
    return this.organizationsService.getAllOrganizations();
  }

  @Post()
  async createOrganization(
    @Body() body: { name: string; created_by?: number; address: string },
  ) {
    return this.organizationsService.createOrganization(body);
  }

  @Put(':id')
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
