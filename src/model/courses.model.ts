import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('courses')
export default class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 128 })
  name: string

  @Column({ length: 128 })
  semester: string

  @Column({ length: 128 })
  number: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
