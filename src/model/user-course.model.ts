import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

import { UserCourseLevel } from 'devu-shared-modules'

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
  @Column({ name: 'user_id' })
  userId: number

  // Foreign key
  @Column({ name: 'course_id' })
  courseId: number

  // "student"/"ta"/"instructor"
  @Column({ length: 128 })
  level: UserCourseLevel

  @Column({ name: 'lecture_section', length: 128 })
  lectureSection: string

  @Column({ default: false })
  dropped?: boolean
}
