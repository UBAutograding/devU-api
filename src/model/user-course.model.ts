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

  // Foreign key
  @Column()
  userId: number

  // Foreign key
  @Column()
  courseId: number

  // "student"/"ta"/"instructor"
  @Column({ length: 128 })
  level: string

  @Column({ length: 128 })
  lectureSection

  @Column()
  dropped?: boolean

}
