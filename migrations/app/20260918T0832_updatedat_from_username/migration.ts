#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/a98c8dec9d4e6788538b27abbeda116e3da1dc4f7cdd7ed5b5c73c231c69214f/contract';
import startContract from '../../snapshots/a98c8dec9d4e6788538b27abbeda116e3da1dc4f7cdd7ed5b5c73c231c69214f/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/bf77b2723082b01ad49d5a21d78f87771be9dbe59629070a5b4f0b20c52e963a/contract';
import endContract from '../../snapshots/bf77b2723082b01ad49d5a21d78f87771be9dbe59629070a5b4f0b20c52e963a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'booking',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'notification',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'queries',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'service',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
      this.setDefault({
        schema: 'public',
        table: 'user',
        column: 'updatedAt',
        defaultSql: 'DEFAULT (now())',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
