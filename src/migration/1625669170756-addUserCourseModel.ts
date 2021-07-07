import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserCourseModel1625669170756 implements MigrationInterface {
  name = 'addUserCourseModel1625669170756'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_courses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "course_id" integer NOT NULL, "level" character varying(128) NOT NULL, "lecture_section" character varying(128), "dropped" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "PK_0802c48ad82a16822bd7041154a" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "user_courses" ADD CONSTRAINT "FK_7ecb10d15b858768c36d37727f9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "FK_7ecb10d15b858768c36d37727f9"`)
    await queryRunner.query(`DROP TABLE "user_courses"`)
  }
}
