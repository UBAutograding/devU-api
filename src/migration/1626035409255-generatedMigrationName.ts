import {MigrationInterface, QueryRunner} from "typeorm";

export class generatedMigrationName1626035409255 implements MigrationInterface {
    name = 'generatedMigrationName1626035409255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
