import { Injectable } from '@nestjs/common';
import * as Knex from 'knex';
import knexConfig from '../../knexfile';

@Injectable()
export class KnexService {
  private knex;

  constructor() {
    console.log('Knex connected!');
    this.knex = Knex(knexConfig);
  }

  getKnex() {
    return this.knex;
  }
}
