# TLT Multiple Choice Assessment Prototype

This project satisfies the TLT Web Developer Interview Task deliverables:

1. An ERD for the underlying data structure.
2. A working front-end prototype that presents multiple-choice questions, accepts answer submissions, validates correctness, shows feedback, moves through the full question set, and displays a calculated score.

## Open the Prototype

Open `index.html` in a browser.

No build step or package installation is required.

## Project Files

- `index.html` - main assessment UI.
- `styles.css` - responsive layout and accessible focus styles.
- `app.js` - mock assessment data, answer validation, navigation, feedback, and scoring.
- `docs/erd.md` - Mermaid ERD with notes for the proposed back-end data model.
- `docs/erd.mmd` - standalone Mermaid ERD source.
- `docs/submission-notes.md` - prompt coverage checklist and expected API flow.

## Mock API Shape

The `assessment` object in `app.js` simulates a back-end response:

```js
{
  id: "web-dev-fundamentals",
  title: "Web Development Fundamentals",
  questions: [
    {
      id: "q1",
      topic: "HTTP",
      prompt: "Question text",
      options: [
        { id: "a", text: "Option text" }
      ],
      correctOptionId: "b",
      feedback: "Explanation shown after submission"
    }
  ]
}
```

In a full application, the front end would request an assessment payload from an API, submit each response to an attempt endpoint, and receive correctness/feedback from the server.

## AI Assistance Disclosure

AI assistance was used to scaffold this prototype, generate the ERD document, and organize the implementation according to the provided interview prompt. The code and deliverables should be reviewed before submission.
