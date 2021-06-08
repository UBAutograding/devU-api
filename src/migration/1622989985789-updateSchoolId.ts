import {MigrationInterface, QueryRunner} from "typeorm";

export class updateSchoolId1622989985789 implements MigrationInterface {
    name = 'updateSchoolId1622989985789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "schoolId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_435e192698a6b7d10849295643d" UNIQUE ("schoolId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_435e192698a6b7d10849295643d"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "schoolId" DROP NOT NULL`);
    }

}
