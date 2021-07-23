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
import SectionModel from './courseSection.model'

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

    @Column({name: 'assignement_id' })
    @JoinColumn({name: 'assignement_id'})
    @ManyToOne(() => AssignmentModel)
    assignmentId: number

    @Column({name: 'section_id' })
    @JoinColumn({name: 'section_id '})
    @ManyToOne(() => SectionModel)
    sectionId: number

    @Column({name: 'start_offset' })
    startOffset: number

    @Column({name: 'end_offset' })
    endOffset: number

}