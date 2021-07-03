import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

// import UserModel from './users.model'

@Entity('user-course')
export default class UserCourseModel {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date

  // // Foreign key
  // @ManyToOne(() => UserModel)
  // @JoinColumn({name: "user_id"})
  // _user: UserModel

  // Foreign key
  @Column({ name: 'user_id' })
  userId: number

  // Foreign key
  @Column({ name: 'course_id' })
  courseId: number

  // "student"/"ta"/"instructor"
  @Column({ length: 128 })
  level: "student" | "ta" | "instructor"

  @Column({ name: 'lecture_section', length: 128 })
  lectureSection: string

  @Column({ default: false })
  dropped?: boolean
}
