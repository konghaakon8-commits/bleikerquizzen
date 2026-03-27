const quiz = [
  {
    question: "Hva er kroppens viktigste energikilde under hard trening?",
    choices: [
      { id: 1, text: "Protein" },
      { id: 2, text: "Karbohydrater" },
      { id: 3, text: "Vann" },
      { id: 4, text: "Vitaminer" }
    ],
    correctAnswer: 2
  },
  {
    question: "Hva måler makspuls?",
    choices: [
      { id: 1, text: "Maks antall hjerteslag per minutt" },
      { id: 2, text: "Maks oksygenopptak" },
      { id: 3, text: "Maks muskelstyrke" },
      { id: 4, text: "Maks blodtrykk" }
    ],
    correctAnswer: 1
  },
  {
    question: "Hva betyr kondisjon?",
    choices: [
      { id: 1, text: "Kroppens evne til å utføre langvarig arbeid" },
      { id: 2, text: "Muskelstyrke" },
      { id: 3, text: "Hurtighet" },
      { id: 4, text: "Fleksibilitet" }
    ],
    correctAnswer: 1
  },
  {
    question: "Hva er VO₂-maks?",
    choices: [
      { id: 1, text: "Maks muskelstyrke" },
      { id: 2, text: "Maks oksygenopptak i kroppen" },
      { id: 3, text: "Maks puls" },
      { id: 4, text: "Maks fettforbrenning" }
    ],
    correctAnswer: 2
  },
  {
    question: "Hva er restitusjon?",
    choices: [
      { id: 1, text: "Oppvarming" },
      { id: 2, text: "Nedtrapping etter trening" },
      { id: 3, text: "Kroppens gjenoppbygging etter belastning" },
      { id: 4, text: "Maksimal trening" }
    ],
    correctAnswer: 3
  },
  {
    question: "Hva er anaerob trening?",
    choices: [
      { id: 1, text: "Trening med lite oksygen" },
      { id: 2, text: "Trening i vann" },
      { id: 3, text: "Trening uten muskler" },
      { id: 4, text: "Trening uten puls" }
    ],
    correctAnswer: 1
  },
  {
    question: "Hvilket system transporterer oksygen i kroppen?",
    choices: [
      { id: 1, text: "Fordøyelsessystemet" },
      { id: 2, text: "Sirkulasjonssystemet" },
      { id: 3, text: "Nervesystemet" },
      { id: 4, text: "Hormonsystemet" }
    ],
    correctAnswer: 2
  },
  {
    question: "Hva er en viktig faktor for å forebygge skader i idrett?",
    choices: [
      { id: 1, text: "Oppvarming" },
      { id: 2, text: "Mindre søvn" },
      { id: 3, text: "Mindre mat" },
      { id: 4, text: "Mindre trening" }
    ],
    correctAnswer: 1
  },
  {
    question: "Hva er eksplosiv styrke?",
    choices: [
      { id: 1, text: "Evnen til å utvikle kraft raskt" },
      { id: 2, text: "Evnen til å løfte tungt lenge" },
      { id: 3, text: "Evnen til å løpe langt" },
      { id: 4, text: "Evnen til å balansere" }
    ],
    correctAnswer: 1
  },


  {
    question: "Hvilken lat pulldown øvelse er riktige form?",
    video: "video/trening.mp4",
    choices: [
      { id: 1, text: "Svar:A" },
      { id: 2, text: "Svar:B" },
      { id: 3, text: "Svar:C" },
    ],
    correctAnswer: 2
  }
];


let count = 0;
let chosenAnswer = false;
let score = 0;
let playerName = "";

const nameSection = document.getElementById("nameSection");
const quizSection = document.getElementById("quizSection");
const summarySection = document.getElementById("summarySection");

const questionEl = document.getElementById("question");
const videoContainer = document.getElementById("videoContainer");
const buttonsContainer = document.getElementById("buttons");
const feedback = document.getElementById("feedback");
const nextDiv = document.getElementById("next");
const totalScoreEl = document.getElementById("totalScore");
const highscoreList = document.getElementById("highscoreList");

const startQuizBtn = document.getElementById("startQuizBtn");
const playerNameInput = document.getElementById("playerName");

startQuizBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Skriv inn navnet ditt først.");
    return;
  }
  playerName = name;
  nameSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  count = 0;
  score = 0;
  loadQuiz();
});

function loadQuiz() {
  chosenAnswer = false;
  feedback.textContent = "";
  nextDiv.innerHTML = "";
  buttonsContainer.innerHTML = "";
  videoContainer.innerHTML = "";

  const current = quiz[count];
  questionEl.textContent = current.question;

  if (current.video) {
    videoContainer.innerHTML = `<video src="${current.video}" controls></video>`;
  }

  current.choices.forEach(choice => {
    buttonsContainer.innerHTML += `
      <button id="btn-${choice.id}" onclick="checkAnswer(${choice.id})">
        ${choice.text}
      </button>
    `;
  });
}

window.checkAnswer = function (buttonId) {
  if (chosenAnswer) return;

  const current = quiz[count];
  const isCorrect = buttonId === current.correctAnswer;
  chosenAnswer = true;

  const clickedBtn = document.getElementById(`btn-${buttonId}`);
  const correctBtn = document.getElementById(`btn-${current.correctAnswer}`);

  if (isCorrect) {
    clickedBtn.classList.add("correct");
    feedback.textContent = "Du hadde riktig!";
    score++;
  } else {
    clickedBtn.classList.add("wrong");
    correctBtn.classList.add("correct");
    feedback.textContent = "Du tok feil!";
  }

  nextDiv.innerHTML = `<button onclick="nextQuestion()">Neste</button>`;
};

window.nextQuestion = function () {
  count++;
  if (count < quiz.length) {
    loadQuiz();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  quizSection.classList.add("hidden");
  summarySection.classList.remove("hidden");

  totalScoreEl.textContent = `Du fikk ${score} av ${quiz.length} riktige.`;

  saveHighscore(playerName, score);
  renderHighscore();
}

function saveHighscore(name, score) {
  const key = "bleikerQuizHighscore";
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  existing.push({ name, score });
  existing.sort((a, b) => b.score - a.score);
  const top5 = existing.slice(0, 5);

  localStorage.setItem(key, JSON.stringify(top5));
}

function renderHighscore() {
  const key = "bleikerQuizHighscore";
  const list = JSON.parse(localStorage.getItem(key)) || [];
  highscoreList.innerHTML = "";

  list.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} – ${entry.score} poeng`;
    highscoreList.appendChild(li);
  });
}

window.restartQuiz = function () {
  summarySection.classList.add("hidden");
  nameSection.classList.remove("hidden");
  playerNameInput.value = "";
};
