import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get('organization')
  async getOrganizationStatistics() {
    return this.statisticsService.getOrganizationStatistics();
  }

  @Get('organization/:orgId')
  async getProjectStatistics(@Param('orgId') orgId: number) {
    return this.statisticsService.getProjectStatistics(orgId);
  }

  @Get('general')
  async getGeneralStatistics() {
    return this.statisticsService.getGeneralStatistics();
  }
}
