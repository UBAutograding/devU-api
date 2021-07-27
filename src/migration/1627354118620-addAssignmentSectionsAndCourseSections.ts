import {MigrationInterface, QueryRunner} from "typeorm";

export class addAssignmentSectionsAndCourseSections1627354118620 implements MigrationInterface {
    name = 'addAssignmentSectionsAndCourseSections1627354118620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "assignments_to_courses_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "submissions_to_courses_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "submissions_to_assignments_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "submissions_to_users_user_id_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "submissions_to_users_submitter_id_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "submissions_to_submissions_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_to_users_foreign_key_constraint"`);
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "user_courses_to_courses_foreign_key_constraint"`);
        await queryRunner.query(`CREATE TABLE "course_sections" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "section_id" character varying(128) NOT NULL, "course_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_03086ef0602f2721612a5ce610d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assignment_section" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "assignment_section_id" integer NOT NULL, "assignment_id" integer NOT NULL, "section_id" character varying NOT NULL, "start_offset" integer NOT NULL, "end_offset" integer NOT NULL, "section_id " integer, CONSTRAINT "PK_20bace9ada8d5df3de076c2e94f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_33f833f305070d2d4e6305d8a0c" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_sections" ADD CONSTRAINT "FK_348f9a7c13a6b413f10d2a1ef1a" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_section" ADD CONSTRAINT "FK_5177e9449423d91fd1dd77bb0fc" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignment_section" ADD CONSTRAINT "FK_e424ac64f372d499132a5a59d67" FOREIGN KEY ("section_id ") REFERENCES "course_sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_6fc42b2f2983dd099fec7978444" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_8723840b9b0464206640c268abc" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_fca12c4ddd646dea4572c6815a9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_d89b2ee682c9475006762b666ef" FOREIGN KEY ("submitted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_a44b89320efc3131df0fe7b6500" FOREIGN KEY ("original_submission_id") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "FK_7ecb10d15b858768c36d37727f9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "FK_d65a2771413a10753d76937b3d6" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "FK_d65a2771413a10753d76937b3d6"`);
        await queryRunner.query(`ALTER TABLE "user_courses" DROP CONSTRAINT "FK_7ecb10d15b858768c36d37727f9"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_a44b89320efc3131df0fe7b6500"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_d89b2ee682c9475006762b666ef"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_fca12c4ddd646dea4572c6815a9"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_8723840b9b0464206640c268abc"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_6fc42b2f2983dd099fec7978444"`);
        await queryRunner.query(`ALTER TABLE "assignment_section" DROP CONSTRAINT "FK_e424ac64f372d499132a5a59d67"`);
        await queryRunner.query(`ALTER TABLE "assignment_section" DROP CONSTRAINT "FK_5177e9449423d91fd1dd77bb0fc"`);
        await queryRunner.query(`ALTER TABLE "course_sections" DROP CONSTRAINT "FK_348f9a7c13a6b413f10d2a1ef1a"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_33f833f305070d2d4e6305d8a0c"`);
        await queryRunner.query(`DROP TABLE "assignment_section"`);
        await queryRunner.query(`DROP TABLE "course_sections"`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_to_courses_foreign_key_constraint" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_courses" ADD CONSTRAINT "user_courses_to_users_foreign_key_constraint" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "submissions_to_submissions_foreign_key_constraint" FOREIGN KEY ("original_submission_id") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "submissions_to_users_submitter_id_foreign_key_constraint" FOREIGN KEY ("submitted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "submissions_to_users_user_id_foreign_key_constraint" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "submissions_to_assignments_foreign_key_constraint" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "submissions_to_courses_foreign_key_constraint" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "assignments_to_courses_foreign_key_constraint" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
