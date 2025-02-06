import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { KnexService } from '../../database/knex.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, KnexService],
})
export class StatisticsModule {}
