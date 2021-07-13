import { Assignment } from 'devu-shared-modules'

import AssignmentModel from '../../model/assignments.model'

export function serialize(assignment: AssignmentModel): Assignment {
  return {
    id: assignment.id,
    courseId: assignment.courseId,
    name: assignment.name,
    startDate: assignment.startDate,
    dueDate: assignment.dueDate,
    endDate: assignment.endDate,
    gradingType: assignment.gradingType,
    categoryName: assignment.categoryName,
    description: assignment.description,
    maxFileSize: assignment.maxFileSize,
    maxSubmissions: assignment.maxSubmissions,
    disableHandins: assignment.disableHandins,
    createdAt: assignment.createdAt.toISOString(),
    updatedAt: assignment.updatedAt.toISOString(),
  }
}
