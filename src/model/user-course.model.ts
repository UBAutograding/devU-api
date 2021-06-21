import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('user-course')
export default class UserCourse {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @Column({})
  user_id: number

  @Column({})
  course_id: number

  // "student"/"ta"/"instructor"
  @Column({ length: 128 })
  level: string

  @Column({ length: 128 })
  lecture_section

  @Column()
  dropped?: boolean

}


//   course_user_id
// user_id (Foreign key for a user)
// course_id (Foreign key for a course)
// level (String)
// student/ta/instructor
// lecture_section
// dropped (optional boolean)
// createdAt
// updatedAt
// deletedAt (optional)