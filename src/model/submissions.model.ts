import {
    JoinColumn,
    ManyToOne,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";


import UserModel from './users.model'

@Entity('submissions')
export default class SubmissionModel {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({name: "created_at"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name: "deleted_at"})
    deletedAt?: Date

    @Column({name: "submission_id"})
    submissionId: number



    //Foreign key
    // TODO: Uncomment this with FK constraint once the course entity is merged
    // @JoinColumn({name: "course_id"})
    // @ManyToOne(() => UserModel)
    // courseId: number

    // TODO: Update this with FK constraint once the course entity is merged
    @Column({name: "course_id"})
    courseId: number


    //Foreign key
    // TODO: Uncomment this with FK constraint once the course entity is merged
    // @JoinColumn({name: "assignment_id"})
    // @ManyToOne(() => UserModel)
    // assignmentId: number

    // TODO: Update this with FK constraint once the course entity is merged
    @Column({name: "assignment_id"})
    assignmentId: number



    // Foreign key
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => UserModel)
    userId: number

    @Column({name: "submission_datetime"})
    submissionDatetime: Date

    @Column({name: "submission_type", length: 128})
    submissionType: string

    @Column({name: "the_actual_submission"})
    theActualSubmission: string

    @Column({name: "submitter_ip", length: 128})
    submitterIp: string

    //Foreign key
    // TODO: Uncomment this with FK constraint once the course entity is merged
    // @JoinColumn({name: "original_submission_id"})
    // @ManyToOne(() => UserModel)
    // originalSubmissionId: number

    // TODO: Update this with FK constraint once the course entity is merged
    @Column({name: "original_submission_id", nullable: true})
    originalSubmissionId: number


    //Foreign key
    // TODO: Uncomment this with FK constraint once the course entity is merged
    // @JoinColumn({name: "submitter_id"})
    // @ManyToOne(() => UserModel)
    // submitterId: number

    // TODO: Update this with FK constraint once the course entity is merged
    @Column({name: "submitter_id", nullable: true})
    submitterId: number



}