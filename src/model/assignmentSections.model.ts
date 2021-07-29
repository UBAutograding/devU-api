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

import AssignmentModel from './assignments.model'
import SectionModel from './courseSections.model'

@Entity('assignment_section')
export default class AssignmentSectionModel {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date

    @Column({name: 'assignment_section_id' })
    assignmentSectionId: number

    @Column({name: 'assignment_id' })
    @JoinColumn({name: 'assignment_id'})
    @ManyToOne(() => AssignmentModel)
    assignmentId: number

    @Column({name: 'section_id' })
    @JoinColumn({name: 'section_id '})
    @ManyToOne(() => SectionModel)
    sectionId: string

    @Column({name: 'start_offset' })
    startOffset: Date

    @Column({name: 'end_offset' })
    endOffset: Date

}