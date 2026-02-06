// console.log("JS loaded");
// console.log(jsQuiz);

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quizApp = document.getElementById("quizApp");

startBtn.addEventListener("click", () => {
  startScreen.style.opacity = "0";

  setTimeout(() => {
    startScreen.style.display = "none";
    quizApp.classList.remove("hidden");
  }, 500);
});


import jsQuiz from "./mcq.js"

const displayQue = document.querySelector(".display-quiz .card-header h4");
const displayOpt = document.querySelector(".display-quiz .card-body ul");
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const attempted = document.getElementById('attempted');
const notAttempted = document.getElementById('not-attempted');
const msg = document.getElementById('msg');

const submitbtn = document.querySelector('.btnSubmit');

let currQue = 0;

const Question = () => {
  displayQue.textContent = `${currQue + 1}. ` + jsQuiz[currQue].question;
  displayOpt.innerHTML = '';

  jsQuiz[currQue].options.forEach(option => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    const label = document.createElement('label');

    input.type = 'radio';
    input.name = `question-${currQue}`;
    input.checked = jsQuiz[currQue].yourans == option;
    input.value = option;

    label.textContent = option;

    li.appendChild(input);
    li.appendChild(label);
    displayOpt.appendChild(li);

  });

  const options = document.querySelectorAll('.display-quiz .card-body input[type = "radio"]')

  options.forEach((option) => {
    option.addEventListener('change', (e) => {
      // const { name, value } = e.target;
      jsQuiz[currQue].yourans = e.target.value;
      handleAttempt();
    })
  })

};


const handleNext = () => {
  if (currQue >= jsQuiz.length - 1) return;
  currQue++;
  Question();
  handleAttempt();
};

const handlePrev = () => {
  if (currQue <= 0) return;
  currQue--;
  Question();
  handleAttempt();
};

Question();
next.addEventListener('click', handleNext);
prev.addEventListener('click', handlePrev);


const listButton = document.querySelectorAll('.que-list');

listButton.forEach((element, index) => {
  element.addEventListener('click', () => {
    currQue = index;
    Question();
    handleAttempt();
  })
})

const handleAttempt = () => {
  let attemptedCount = 0;
  let notAttemptedCount = 0;

  jsQuiz.forEach(element => {
    if (element.yourans !== undefined) {
      attemptedCount++;
    } else {
      notAttemptedCount++;
    }
  });

  attempted.textContent = attemptedCount;
  notAttempted.textContent = notAttemptedCount;

  const handleQuestion = () => {
    const buttons = document.querySelectorAll('.que-list');

    buttons.forEach((btn, index) => {

      if (jsQuiz[index].yourans !== undefined) {
        btn.classList.remove('not-attempted');
        btn.classList.add('attempted');
      } else {
        btn.classList.remove('attempted');
        btn.classList.add('not-attempted');
      }
    });
  };
  handleQuestion();
};

const handleresult = () => {
  let totalscore = 0;

  jsQuiz.forEach(element => {
    if (element.yourans === element.correctAnswer) {
      totalscore++;
    }
  });

  const result = document.getElementById('result');
  const score = document.getElementById('score');

  result.style.display = 'flex';
  score.textContent = '0';

  let count = 0;
  const interval = setInterval(() => {
    score.textContent = count;
    if (count == totalscore) {
      clearInterval(interval);
    }
    count++;
  }, 60);
};

submitbtn.addEventListener('click', handleresult);


