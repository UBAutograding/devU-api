import {MigrationInterface, QueryRunner} from "typeorm";

export class addCourseAndAssignmentsModels1626118854709 implements MigrationInterface {
    name = 'addCourseAndAssignmentsModels1626118854709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "semester" character varying(128) NOT NULL, "number" character varying(128) NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "courses_primary_key_constraint" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignments" ("id" SERIAL NOT NULL, "course_id" integer NOT NULL, "name" character varying(128) NOT NULL, "start_date" TIMESTAMP NOT NULL, "due_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "grading_type" character varying(128) NOT NULL, "category_name" character varying(128) NOT NULL, "description" character varying, "max_file_size" integer NOT NULL, "max_submissions" integer NOT NULL, "disable_handins" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "assignments_primary_key_constraint" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "assignments_to_courses_foreign_key_constraint" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "assignments_to_courses_foreign_key_constraint"`);
        await queryRunner.query(`DROP TABLE "assignments"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
