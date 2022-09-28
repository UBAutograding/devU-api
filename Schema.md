# Entities

- [x] [User](#user)
- [x] [Course](#course)
- [x] [UserCourse](#usercourse)
- [x] [Assignment](#assignment)
- [x] [Submission](#submission)
- [x] [AssignmentProblem](#assignmentproblem)
- [] [SubmissionProblemScore](#submissionproblemscore)
- [] [SubmissionScore](#submissionscore)
- [] [AssignmentScore](#assignmentscore)
- [] [CategoryScore](#categoryscore)
- [] [Category](#category)
- [] [CourseScore](#coursescore)



# Entity Details

### Generic Entity Attributes
* id (primary key)
* createdAt
* updatedAt
* deletedAt (If null, it's not deleted)


### User
*Student user for devu*
* email
* externalId (eg. School id number)
* preferredName


### Course
* name (eg. Computer Science 2)
* semester (eg. f2022)
* number (eg. CSE312)
* startDate
* endDate


### UserCourse
*Links a user to a course*
* userId (foreign key of the user)
* courseId (foreign key of the course)
* level (student, ta, or instructor)
* dropped (Boolean)


### Assignment
* courseId (foreign key of the course)
* name
* startDate (time when it should be available to students)
* dueDate (last time to submit without incurring late penalties)
* endDate (last time to submit even with a late penalty)
* gradingType
* categoryName (eg. HW, Quizzes)
* description
* maxFileSize (for submissions)
* maxSubmissions (if null, infinite submissions allowed)
* disableHandins (Boolean)


### Submission
* courseId (foreign key of the course)
* assignmentId (foreign key of the assignment)
* userId (foreign key of the user owning the submission)
* content (The actual submission)
* type (filepath, json, or text)
* submitterIp
* submittedBy (foreign key of the user making the submission. Will match the userId for normal submissions. Will be different if instructor/ta is creating the submission or if a regrade request was made. Regrades create a new submission)
* orignalSubmissionId (null for normal submissions. Matches the original submission id for regrades. Number of non-nulls for a user is the number of submissions)


### AssignmentProblem
* assignmentId (foreign key of the assignment)
* problemName
* maxScore


**------ Everything above this line exists in the code. Everything below needs to be built ------**


### SubmissionProblemScore
* submissionId (foreign key of the submission)
* assignmentProblemId (foreign key of the assignmentProblem)
* score
* feedback


### SubmissionScore
* submissionId (foreign key of the submission)
* score
* feedback
* released ?


### AssignmentScore
* assignmentId (foreign key of the assignment)
* userId (foreign key of the user)
* score


### CategoryScore
* categoryId (foreign key of the category)
* userId (foreign key of the user)
* *missing attributes*


### Category
* courseId


### CourseScore
* courseId
* userId


