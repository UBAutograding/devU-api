import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date

  @Column({ length: 320, unique: true, nullable: false })
  email: string

  @Column({ length: 320, unique: true, nullable: false })
  externalId: string

  @Column({ length: 128, nullable: true })
  preferredName: string
}
