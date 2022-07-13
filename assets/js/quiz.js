let quizContent = [
    {
      question: "Which of the following is a commonly used Javascript loop type?:",
      possibleAnswers: ["while loop", "alert loop", "string loop", "boolean loop"],
      correctAnswer: "while loop"
    },

    {
      question: "What function should be used to select a random array item?:",
      possibleAnswers: ["math.floor()", "random.number()", "math.random()", "console.log(random)"],
      correctAnswer: "math.random()"
    },

    {
      question: "Which of the following coding languages creates user functionality within web applications?:",
      possibleAnswers: ["HTML", "Javascript", "CSS", "none of the above"],
      correctAnswer: "Javascript"
    },

    {
      question: "Which of the following git commands sends changes to a repository?:",
      possibleAnswers: ["git push", "git commit", "git pull origin main", "git add"],
      correctAnswer: "git push"
    },

    {
      question: "Where is the best place on the HTML page to link the Javascript?:",
      possibleAnswers: ["top of page", "bottom of page", "doesn't matter", "all of the above"],
      correctAnswer: "bottom of page"
    },
];

let correctSound = new Audio('assets/sfx/correct.wav');
let incorrectSound = new Audio('assets/sfx/incorrect.wav');

let selectedQuestion = 0;
let timer = quizContent.length * 10;
let seconds;

let quizQuestions = document.getElementById('quizQuestions');
let timeLeft = document.getElementById('timeLeft');
let answerOptions = document.getElementById('answers');
let postScore = document.getElementById('post');
let startQuiz = document.getElementById('startQuiz');
let playerName = document.getElementById('name');
let quizResults = document.getElementById('results');

function takeQuizNow() {

    let takeQuiz = document.getElementById('rules');

    takeQuiz.setAttribute('class', 'hidden');

    quizQuestions.removeAttribute('class');

    seconds = setInterval(timeClock, 1000);

    timeLeft.textContent = timer;

    importQuizContent();
}

function importQuizContent() {

let newQuestion = quizContent[selectedQuestion];

let question = document.getElementById('question');

question.textContent = newQuestion.title;

answers.innerHTML = '';

newQuestion.possibleAnswers.forEach(function(answers, i) {
    let questionGroup = document.createElement('button');

    questionGroup.setAttribute('class', 'answers');

    questionGroup.setAttribute('value', answers);

    questionGroup.textContent = i + 1 + '. ' + answers;

    questionGroup.onclick = questionSelection;

    answerOptions.appendChild(questionGroup);
  });
}

function questionSelection() {

    if (this.value !== quizContent[selectedQuestion].correctAnswer) {

      timer -= 10;

      if (timer < 0) {
          timer = 0;
      }

      timeLeft.textContent = timer;

      incorrectSound.play();

      quizResults.textContent = 'Not Quite!'

    } else {

      correctSound.play();

      quizResults.textContent = 'Nice Job!'
    }

    quizResults.setAttribute('class', 'results');

    setTimeout(function() {

      quizResults.setAttribute('class', 'results hidden');

    }, 1000);

    selectedQuestion++;

    if (selectedQuestion === quizContent.length) {
        
      finish();
    
    } else {

       importQuizContent();

    }
}

function finish() {

  clearInterval(seconds);

  let finishQuiz = document.getElementById('done');

  finishQuiz.removeAttribute('class');

  let points = document.getElementById('scores');

  points.textContent = timer;

  quizQuestions.setAttribute('class', 'hidden');
}

function timeClock() {

  timer--;

  timeLeft.textContent = timer;

  if (timer <= 0) {

    finish();
  }
}

function postToLeaderboard () {

  let name = playerName.value.trim();

  if (name !== '') {
    
    let leaderboard = JSON.parse(window.localStorage.getItem('leaderboard')) || [];

    let addResult = {

    score: timer,

    name: name
    };

    leaderboard.push(addResult);
    window.localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    window.location.href = 'leaderboard.html';
  }
}

function enter(event) {
  if (event.key === 'Enter') {
      postToLeaderboard();
  }
}

postScore.onclick = postToLeaderboard;

startQuiz.onclick = takeQuizNow;

playerName.onkeyup = enter;