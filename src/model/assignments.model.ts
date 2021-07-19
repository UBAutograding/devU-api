import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import CourseModel from './courses.model'

@Entity('assignments')
export default class Assignment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'course_id' })
  @JoinColumn({ name: 'course_id' })
  @ManyToOne(() => CourseModel)
  courseId: number

  @Column({ length: 128 })
  name: string

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'due_date' })
  dueDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  @Column({ name: 'grading_type', length: 32 })
  gradingType: string

  @Column({ name: 'category_name', length: 128 })
  categoryName: string

  @Column({ nullable: true })
  description: string

  @Column({ name: 'max_file_size' })
  maxFileSize: number

  @Column({ name: 'max_submissions', nullable: true })
  maxSubmissions: number

  @Column({ name: 'disable_handins' })
  disableHandins: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date
}
