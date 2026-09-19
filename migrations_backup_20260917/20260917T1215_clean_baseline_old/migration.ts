#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/80e9ddb96916619a72cf184405db1dff831780058b3abe1266d9b8114ad14eb5/contract';
import endContract from '../../snapshots/80e9ddb96916619a72cf184405db1dff831780058b3abe1266d9b8114ad14eb5/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/de3e3895a83481ee870d33ac70a5a9379574b4b42020914ee7a106bf3e9577b7/contract';
import startContract from '../../snapshots/de3e3895a83481ee870d33ac70a5a9379574b4b42020914ee7a106bf3e9577b7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'post' }),
      this.dropDefault({ schema: 'public', table: 'user', column: 'phone' }),
      this.addColumn({
        schema: 'public',
        table: 'user',
        column: col('role', 'text', {
          notNull: true,
          default: lit('CUSTOMER'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.dropNotNull({ schema: 'public', table: 'user', column: 'phone' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
