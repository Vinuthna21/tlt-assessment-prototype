# Submission Notes

## Prompt Coverage

| Prompt requirement | Where it is handled |
| --- | --- |
| Present a student with questions and response options | `index.html`, `app.js` mock `assessment.questions` data |
| Allow answer selection and submission | `app.js` `submitAnswer()` and the radio-button form |
| Validate answer as correct or incorrect | `app.js` compares selected option id with `correctOptionId` |
| Display feedback | `app.js` `showFeedback()` displays correct/incorrect status and explanation |
| Move through all questions | `app.js` `moveNext()` advances through the question set |
| Complete the set and calculate score | `app.js` `renderResults()` totals correct responses |
| ERD for data structure | `docs/erd.md` and `docs/erd.mmd` |

## Front-End to Back-End Interaction

The current prototype uses hard-coded JSON in `app.js` to simulate API responses. In a full-stack implementation, the flow would be:

1. `GET /api/assessments/{assessmentId}` returns the assessment, questions, and answer options.
2. `POST /api/assessment-attempts` creates an attempt for the authenticated student.
3. `POST /api/assessment-attempts/{attemptId}/responses` submits one selected answer for one question.
4. The server validates the selected answer against the stored correct option and returns correctness plus feedback.
5. `POST /api/assessment-attempts/{attemptId}/complete` marks the attempt complete and returns the final score.

## AI Assistance Disclosure

AI assistance was used to scaffold the project files, generate the mock assessment flow, write the ERD, and organize these submission notes. The deliverables were created according to the interview prompt and should be reviewed before submission.
