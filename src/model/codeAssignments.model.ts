import {
  JoinColumn,
  OneToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

import AssignmentModel from './assignments.model'

@Entity('code_assignment')
export default class CodeAssignmentsModel {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date

  @Column({ name: 'assignment_id' })
  @JoinColumn({ name: 'assignment_id' })
  @OneToOne(() => AssignmentModel)
  assignmentId: number

  @Column({ length: 128 })
  grader: string

  @Column({ length: 128 })
  gradingImage: string
}
