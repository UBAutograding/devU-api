import { CourseSection } from 'devu-shared-modules'

import CourseSectionModel from '../../model/courseSections.model'

export function serialize(courseSection: CourseSectionModel): CourseSection {
    return {
      id: courseSection.id,
      sectionId: courseSection.sectionId,
      courseId: courseSection.courseId,
      startDate: courseSection.startDate.toISOString(),
      endDate: courseSection.endDate.toISOString(),
      createdAt: courseSection.createdAt.toISOString(),
      updatedAt: courseSection.updatedAt.toISOString(),
    }
}