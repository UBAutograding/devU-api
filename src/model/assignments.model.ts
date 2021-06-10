import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('assignments')
export default class Assignment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  course_id: number

  @Column({ length: 128 })
  name: string

  @Column()
  start_date: Date

  @Column()
  due_date: Date

  @Column()
  end_date: Date

  @Column({ length: 128 })
  grading_type: string

  @Column({ length: 128 })
  category_name: string

  @Column({ length: 128, nullable: true })
  description: string

  @Column()
  max_file_size: number

  @Column()
  max_submissions: number

  @Column()
  disable_handins: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
