#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2eea9bd116a74d529e980d71a5c00c1adb65a1e83d5076f656d7b0f2cfb6d45d/contract';
import startContract from '../../snapshots/2eea9bd116a74d529e980d71a5c00c1adb65a1e83d5076f656d7b0f2cfb6d45d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/fa4d4e43faa1abce88c8d3a61be3e6a985938c823e1f46707f7581bc271b24e8/contract';
import endContract from '../../snapshots/fa4d4e43faa1abce88c8d3a61be3e6a985938c823e1f46707f7581bc271b24e8/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'booking',
        columns: [
          col('bookingDate', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('customerNote', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('providerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('providerNote', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('serviceId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('BOOKED'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking',
        index: 'booking_providerId_idx_d1904c54',
        columns: ['providerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking',
        index: 'booking_serviceId_idx_b5d9acbf',
        columns: ['serviceId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'booking',
        index: 'booking_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking',
        foreignKey: {
          name: 'booking_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking',
        foreignKey: {
          name: 'booking_serviceId_fkey',
          columns: ['serviceId'],
          references: { schema: 'public', table: 'service', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'booking',
        foreignKey: {
          name: 'booking_providerId_fkey',
          columns: ['providerId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
