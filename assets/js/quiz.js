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
let timer = quizContent.length * 15;
let seconds;

let quizQuestions = documet.getElementById('quizQuestions');
let timeLeft = documet.getElementById('timeLeft');
let answers = documet.getElementById('answers');
let postScore = documet.getElementById('post');
let startQuiz = documet.getElementById('startQuiz');
let playerNname = documet.getElementById('name');
let quizResults = documet.getElementById('results');

function takeQuizNow() {

    let takeQuiz = document.getElementById('rules');

    takeQuiz.setAttribute('class', 'hidden');

    quizQuestions.removeAttribute('class');

    seconds = setInterval(clockTick, 1000);

    timeLeft.textContent = timer;

    importQuizContent();
}

function importQuizContent() {

let newQuestion = quizContent[selectedQuestion];

let question = document.getElementById('question');

question.textContent = newQuestion.title;

answers.innerHTML = '';

newQuestion.answers.forEach(function(answers, i) {
    let questionGroup = document.createElement('button');

    questionGroup.setAttribute('class', 'answers');

    questionGroup.setAttribute('value', answers);

    questionGroup.textContent = i + 1 + '. ' + answers;

    questionGroup.onclick = questionSelection;

    answers.appendChild(questionGroup);
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

//function to end quiz when all questions have been asked

//function for time clock to end quiz if 0 

//fuction to record to leaderboard

