import { AssignmentSection } from 'devu-shared-modules'

import AssignmentSectionModel from '../../model/assignmentSections.model'

export function serialize(assignmentSection: AssignmentSectionModel): AssignmentSection {
    return {
    id: assignmentSection.id,
    assignmentSectionId: assignmentSection.assignmentSectionId,
    assignmentId: assignmentSection.assignmentId,
    sectionId: assignmentSection.sectionId,
    startOffset: assignmentSection.startOffset,
    endOffset: assignmentSection.endOffset,
    createdAt: assignmentSection.createdAt.toISOString(),
    updatedAt: assignmentSection.updatedAt.toISOString(),
    }
}