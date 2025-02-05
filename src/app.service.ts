import { Injectable } from '@nestjs/common';
import { KnexService } from './database/knex.service';

@Injectable()
export class AppService {
  constructor(private readonly knexService: KnexService) {}

  async getData() {
    const knexClient = this.knexService.getKnex();
    return knexClient.select('*').from('users');
  }
}
