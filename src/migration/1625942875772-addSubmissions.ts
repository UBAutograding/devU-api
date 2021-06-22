import {MigrationInterface, QueryRunner} from "typeorm";

export class addSubmissions1625942875772 implements MigrationInterface {
    name = 'addSubmissions1625942875772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submissions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "submission_id" integer NOT NULL, "course_id" integer NOT NULL, "assignment_id" integer NOT NULL, "user_id" integer NOT NULL, "submission_datetime" TIMESTAMP NOT NULL, "submission_type" character varying(128) NOT NULL, "the_actual_submission" character varying NOT NULL, "submitter_ip" character varying(128) NOT NULL, "original_submission_id" integer, "submitter_id" integer, CONSTRAINT "PK_10b3be95b8b2fb1e482e07d706b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "submissions"`);
    }

}
