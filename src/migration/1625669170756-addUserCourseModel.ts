import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUserCourseModel1625669170756 implements MigrationInterface {
  name = 'addUserCourseModel1625669170756'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_courses" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "course_id" integer NOT NULL, "level" character varying(128) NOT NULL, "lecture_section" character varying(128), "dropped" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "user_courses_primary_key_constraint" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_to_users_foreign_key_constraint" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_to_users_foreign_key_constraint"`)
    await queryRunner.query(`DROP TABLE "user_courses"`)
  }
}
