import {
    JoinColumn,
    ManyToOne,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'

import CourseModel from './courses.model'

@Entity('course_sections')
export default class CourseSection {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date

    @Column({name: 'section_id', length: 128})
    sectionId: string

    @Column({name: 'course_id'})
    @JoinColumn({name: 'course_id'})
    @ManyToOne(() => CourseModel)
    courseId: number
    
    @Column({name: 'start_date'})
    startDate: Date
    
    @Column({name: 'end_date'})
    endDate: Date
}