import {MigrationInterface, QueryRunner} from "typeorm";

export class renameUserColumns1623389391024 implements MigrationInterface {
    name = 'renameUserColumns1623389391024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "preferredName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_041f7aa05fedc841383a372e429"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "externalId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "external_id" character varying(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_11fc776e0ca3573dc195670f636" UNIQUE ("external_id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "preferred_name" character varying(128)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "preferred_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_11fc776e0ca3573dc195670f636"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "external_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "externalId" character varying(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_041f7aa05fedc841383a372e429" UNIQUE ("externalId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "preferredName" character varying(128)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
