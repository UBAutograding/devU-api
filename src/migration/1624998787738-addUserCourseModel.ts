import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserCourseModel1624998787738 implements MigrationInterface {
  name = 'addUserCourseModel1624998787738'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user-course" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "course_id" integer NOT NULL, "level" character varying(128) NOT NULL, "lecture_section" character varying(128) NOT NULL, "dropped" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1ee57d7274a54034b80887a4e14" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user-course"`)
  }
}
