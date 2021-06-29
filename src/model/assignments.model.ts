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
import Course from './courses.model'

@Entity('assignments')
export default class Assignment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Course, course => course.id)

  @JoinColumn({ name: 'course_id' })
  courseId: number

  @Column({ name: 'course_id' })

  @Column({ length: 128 })
  name: string

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'due_date' })
  dueDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  @Column({ name: 'grading_type', length: 128 })
  gradingType: string

  @Column({ name: 'category_name', length: 128 })
  categoryName: string

  @Column({ nullable: true })
  description: string

  @Column({ name: 'max_file_size' })
  maxFileSize: number

  @Column({ name: 'max_submissions' })
  maxSubmissions: number

  @Column({ name: 'disable_handins' })
  disableHandins: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
