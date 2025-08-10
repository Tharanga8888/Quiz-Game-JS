const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
];

let currentQuestion = 0;
let score = 0;
let shuffledQuiz = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("bar");
const restartBtn = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

function shuffleQuestions() {
  shuffledQuiz = [...quizData].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const current = shuffledQuiz[currentQuestion];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.onclick = () => selectAnswer(button, current.answer);
    optionsEl.appendChild(button);
  });

  progress.textContent = `Question ${currentQuestion + 1} of ${shuffledQuiz.length}`;
  progressBar.style.width = `${((currentQuestion) / shuffledQuiz.length) * 100}%`;
}

function selectAnswer(selectedBtn, correctAnswer) {
  const options = document.querySelectorAll(".option-btn");

  options.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < shuffledQuiz.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("question-container").style.display = "none";
  progressBar.style.width = "100%";
  scoreContainer.textContent = `🎉 You scored ${score} out of ${shuffledQuiz.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestion = 0;
  shuffleQuestions();
  document.getElementById("question-container").style.display = "block";
  scoreContainer.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
  loadQuestion();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

window.onload = () => {
  shuffleQuestions();
  loadQuestion();
};
