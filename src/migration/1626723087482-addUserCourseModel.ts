import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserCourseModel1626723087482 implements MigrationInterface {
  name = 'addUserCourseModel1626723087482'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_courses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "level" character varying(128) NOT NULL, "lecture_section" character varying(128), "dropped" boolean NOT NULL DEFAULT false, "user_id" integer, "course_id" integer, CONSTRAINT "user_course_primary_key_constraint" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "user_courses" ADD CONSTRAINT "user_course_to_user_foreign_key_constraint" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "user_courses" ADD CONSTRAINT "user_course_to_course_foreign_key_constraint" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "user_course_to_course_foreign_key_constraint"`)
    await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "user_course_to_user_foreign_key_constraint"`)
    await queryRunner.query(`DROP TABLE "user_courses"`)
  }
  
}
