const assessment = {
  id: "web-dev-fundamentals",
  title: "Web Development Fundamentals",
  questions: [
    {
      id: "q1",
      topic: "HTTP",
      prompt: "Which HTTP method is most appropriate when creating a new resource on a server?",
      options: [
        { id: "a", text: "GET" },
        { id: "b", text: "POST" },
        { id: "c", text: "PATCH" },
        { id: "d", text: "DELETE" }
      ],
      correctOptionId: "b",
      feedback: "POST is commonly used to send data that creates a new server-side resource."
    },
    {
      id: "q2",
      topic: "JavaScript",
      prompt: "What does the async keyword allow a JavaScript function to do?",
      options: [
        { id: "a", text: "Return a promise and use await inside the function body" },
        { id: "b", text: "Run on a separate CPU thread automatically" },
        { id: "c", text: "Skip browser security checks" },
        { id: "d", text: "Convert JSON into HTML without parsing" }
      ],
      correctOptionId: "a",
      feedback: "An async function returns a promise and lets the function pause at await expressions."
    },
    {
      id: "q3",
      topic: "Databases",
      prompt: "In a relational database, what is the purpose of a foreign key?",
      options: [
        { id: "a", text: "To encrypt a column before storage" },
        { id: "b", text: "To link one table record to a related record in another table" },
        { id: "c", text: "To make a table readable only by administrators" },
        { id: "d", text: "To remove duplicated CSS selectors" }
      ],
      correctOptionId: "b",
      feedback: "A foreign key preserves a relationship between rows in different tables."
    },
    {
      id: "q4",
      topic: "Accessibility",
      prompt: "Which practice best supports keyboard users in a custom web interface?",
      options: [
        { id: "a", text: "Remove focus outlines from all controls" },
        { id: "b", text: "Use only div elements for every interactive control" },
        { id: "c", text: "Provide logical tab order and visible focus states" },
        { id: "d", text: "Place important actions only inside hover menus" }
      ],
      correctOptionId: "c",
      feedback: "Keyboard users need predictable focus movement and visible focus indicators."
    }
  ]
};

const state = {
  currentQuestionIndex: 0,
  responses: []
};

const questionTopic = document.querySelector("#questionTopic");
const questionText = document.querySelector("#questionText");
const answerOptions = document.querySelector("#answerOptions");
const answerForm = document.querySelector("#answerForm");
const feedback = document.querySelector("#feedback");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const submitButton = document.querySelector("#submitButton");
const nextButton = document.querySelector("#nextButton");
const resultsPanel = document.querySelector("#resultsPanel");
const finalScore = document.querySelector("#finalScore");
const reviewList = document.querySelector("#reviewList");
const restartButton = document.querySelector("#restartButton");
const questionPanel = document.querySelector(".question-panel");

function getCurrentQuestion() {
  return assessment.questions[state.currentQuestionIndex];
}

function renderQuestion() {
  const question = getCurrentQuestion();
  const questionNumber = state.currentQuestionIndex + 1;
  const totalQuestions = assessment.questions.length;

  questionTopic.textContent = question.topic;
  questionText.textContent = question.prompt;
  progressText.textContent = `Question ${questionNumber} of ${totalQuestions}`;
  progressBar.style.width = `${(questionNumber / totalQuestions) * 100}%`;
  feedback.hidden = true;
  feedback.className = "feedback";
  feedback.textContent = "";
  submitButton.hidden = false;
  submitButton.disabled = false;
  nextButton.hidden = true;
  resultsPanel.hidden = true;
  questionPanel.hidden = false;

  answerOptions.innerHTML = question.options
    .map((option) => {
      return `
        <label class="answer-option" data-option-id="${option.id}">
          <input type="radio" name="answer" value="${option.id}">
          <span>${option.text}</span>
        </label>
      `;
    })
    .join("");
}

function getSelectedOptionId() {
  const selected = answerForm.elements.answer;
  return selected ? selected.value : "";
}

function setOptionsDisabled(disabled) {
  answerOptions.querySelectorAll("input").forEach((input) => {
    input.disabled = disabled;
  });
}

function showFeedback(question, selectedOptionId, isCorrect) {
  answerOptions.querySelectorAll(".answer-option").forEach((optionElement) => {
    const optionId = optionElement.dataset.optionId;

    if (optionId === question.correctOptionId) {
      optionElement.classList.add("is-correct");
    }

    if (!isCorrect && optionId === selectedOptionId) {
      optionElement.classList.add("is-incorrect");
    }
  });

  feedback.hidden = false;
  feedback.className = `feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedback.textContent = isCorrect
    ? `Correct. ${question.feedback}`
    : `Incorrect. ${question.feedback}`;
}

function submitAnswer(event) {
  event.preventDefault();

  const question = getCurrentQuestion();
  const selectedOptionId = getSelectedOptionId();

  if (!selectedOptionId) {
    feedback.hidden = false;
    feedback.className = "feedback warning";
    feedback.textContent = "Select an answer before submitting.";
    return;
  }

  const isCorrect = selectedOptionId === question.correctOptionId;
  state.responses.push({
    questionId: question.id,
    selectedOptionId,
    isCorrect
  });

  setOptionsDisabled(true);
  showFeedback(question, selectedOptionId, isCorrect);
  submitButton.hidden = true;
  nextButton.hidden = false;
  nextButton.textContent =
    state.currentQuestionIndex === assessment.questions.length - 1
      ? "View score"
      : "Next question";
}

function moveNext() {
  if (state.currentQuestionIndex === assessment.questions.length - 1) {
    renderResults();
    return;
  }

  state.currentQuestionIndex += 1;
  renderQuestion();
}

function renderResults() {
  const totalQuestions = assessment.questions.length;
  const correctCount = state.responses.filter((response) => response.isCorrect).length;

  questionPanel.hidden = true;
  resultsPanel.hidden = false;
  progressText.textContent = "Complete";
  progressBar.style.width = "100%";
  finalScore.textContent = `Score: ${correctCount} out of ${totalQuestions}`;

  reviewList.innerHTML = assessment.questions
    .map((question) => {
      const response = state.responses.find((item) => item.questionId === question.id);
      const selectedOption = question.options.find((option) => option.id === response.selectedOptionId);
      const correctOption = question.options.find((option) => option.id === question.correctOptionId);

      return `
        <li>
          <strong>${question.prompt}</strong>
          Your answer: ${selectedOption.text}<br>
          Correct answer: ${correctOption.text}
        </li>
      `;
    })
    .join("");
}

function restartAssessment() {
  state.currentQuestionIndex = 0;
  state.responses = [];
  renderQuestion();
}

answerForm.addEventListener("submit", submitAnswer);
nextButton.addEventListener("click", moveNext);
restartButton.addEventListener("click", restartAssessment);

renderQuestion();
