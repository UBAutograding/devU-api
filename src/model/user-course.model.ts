import {
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

import { UserCourseLevel } from 'devu-shared-modules'
import UserModel from './users.model'
import CourseModel from './courses.model'

@Entity('user_courses')
export default class UserCourseModel {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date

  // Foreign key
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UserModel)
  userId: number

  // Foreign key
  @JoinColumn({ name: 'course_id' })
  @ManyToOne(() => CourseModel)
  courseId: number

  // "student"/"ta"/"instructor"
  @Column({ length: 128 })
  level: UserCourseLevel

  @Column({ name: 'lecture_section', length: 128, nullable: true })
  lectureSection: string

  @Column({ default: false })
  dropped: boolean
}
