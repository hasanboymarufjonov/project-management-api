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
import { ProjectsService } from './projects.service';
import { HeadGuard } from '../../guards/head.guards';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  @Post()
  @UseGuards(HeadGuard)
  async createProject(
    @Body() body: { name: string; org_id: number; created_by?: number },
  ) {
    return this.projectsService.createProject(body);
  }

  @Put(':id')
  @UseGuards(HeadGuard)
  async updateProject(
    @Param('id') id: number,
    @Body() body: { name: string; org_id: number; created_by?: number },
  ) {
    return this.projectsService.updateProject(id, body);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }
}
