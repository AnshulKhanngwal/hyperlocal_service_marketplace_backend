#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3a5c35acc99514df0bb82f473a263d05b13dac81830168aecf23f20a6e72b9ef/contract';
import startContract from '../../snapshots/3a5c35acc99514df0bb82f473a263d05b13dac81830168aecf23f20a6e72b9ef/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a98c8dec9d4e6788538b27abbeda116e3da1dc4f7cdd7ed5b5c73c231c69214f/contract';
import endContract from '../../snapshots/a98c8dec9d4e6788538b27abbeda116e3da1dc4f7cdd7ed5b5c73c231c69214f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('username', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_username_key',
        columns: ['username'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
