import {MigrationInterface, QueryRunner} from "typeorm";

export class tightenUpUserModel1623375449310 implements MigrationInterface {
    name = 'tightenUpUserModel1623375449310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "schoolId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "externalId" character varying(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_041f7aa05fedc841383a372e429" UNIQUE ("externalId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_041f7aa05fedc841383a372e429"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "externalId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "schoolId" character varying(128)`);
    }

}
