#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2eea9bd116a74d529e980d71a5c00c1adb65a1e83d5076f656d7b0f2cfb6d45d/contract';
import endContract from '../../snapshots/2eea9bd116a74d529e980d71a5c00c1adb65a1e83d5076f656d7b0f2cfb6d45d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/80e9ddb96916619a72cf184405db1dff831780058b3abe1266d9b8114ad14eb5/contract';
import startContract from '../../snapshots/80e9ddb96916619a72cf184405db1dff831780058b3abe1266d9b8114ad14eb5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'service',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('providerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('reviews_values', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('total_reviews', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'service',
        index: 'service_providerId_idx_d1904c54',
        columns: ['providerId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'service',
        foreignKey: {
          name: 'service_providerId_fkey',
          columns: ['providerId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
