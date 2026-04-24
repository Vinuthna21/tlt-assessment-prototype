# Entity Relationship Diagram

This ERD models the data structure for a multiple-choice assessment tool that can present questions, store answer options, accept student submissions, validate correctness, and calculate a one-point-per-question score.

```mermaid
erDiagram
  STUDENT ||--o{ ASSESSMENT_ATTEMPT : starts
  ASSESSMENT ||--o{ QUESTION : contains
  QUESTION ||--o{ ANSWER_OPTION : provides
  ASSESSMENT ||--o{ ASSESSMENT_ATTEMPT : receives
  ASSESSMENT_ATTEMPT ||--o{ STUDENT_RESPONSE : records
  QUESTION ||--o{ STUDENT_RESPONSE : answered_by
  ANSWER_OPTION ||--o{ STUDENT_RESPONSE : selected_as

  STUDENT {
    int student_id PK
    string first_name
    string last_name
    string email
    datetime created_at
  }

  ASSESSMENT {
    int assessment_id PK
    string title
    string description
    boolean is_published
    datetime created_at
    datetime updated_at
  }

  QUESTION {
    int question_id PK
    int assessment_id FK
    string prompt
    string topic
    int display_order
    int point_value
    datetime created_at
    datetime updated_at
  }

  ANSWER_OPTION {
    int answer_option_id PK
    int question_id FK
    string option_text
    boolean is_correct
    int display_order
  }

  ASSESSMENT_ATTEMPT {
    int attempt_id PK
    int assessment_id FK
    int student_id FK
    datetime started_at
    datetime completed_at
    int score
  }

  STUDENT_RESPONSE {
    int response_id PK
    int attempt_id FK
    int question_id FK
    int selected_answer_option_id FK
    boolean is_correct
    datetime submitted_at
  }
```

## Notes

- `ASSESSMENT` owns the set of `QUESTION` records.
- `QUESTION` owns the available `ANSWER_OPTION` records, including which option is correct.
- `ASSESSMENT_ATTEMPT` represents one student's run through one assessment.
- `STUDENT_RESPONSE` stores each submitted answer and the validation result at submission time.
- `score` can be calculated from correct responses, but storing it on `ASSESSMENT_ATTEMPT` makes completed-result reads simple.
