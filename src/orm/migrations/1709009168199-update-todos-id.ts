import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTodosId1709009168199 implements MigrationInterface {
  name = 'updateTodosId1709009168199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "PK_ca8cafd59ca6faaf67995344225"
        `);
    await queryRunner.query(`
            ALTER TABLE "todos" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "todos"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
    await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "todos" DROP CONSTRAINT "PK_ca8cafd59ca6faaf67995344225"
        `);
    await queryRunner.query(`
            ALTER TABLE "todos" DROP COLUMN "id"
        `);
    await queryRunner.query(`
            ALTER TABLE "todos"
            ADD "id" SERIAL NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "todos"
            ADD CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id")
        `);
  }
}
