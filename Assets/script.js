//Variables
var quizArea = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var scoreForm = document.getElementById("score")
var timerEl = document.querySelector(".time");


var timeLeft = 60;
var score;


//object with quiz questions
var questions = [
  {
    question: "What does HTML stand for?",
    answerChoices: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    answerChoices: ["Computer Style Sheets", "Chocolate Strawberry Shortcake", "Cascading Style Sheets",],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Inside which HTML element do we put the JavaScript",
    answerChoices: ["<script>", "style", "body"],
    correctAnswer: "<script>"
  },
  {
    question: "How do you create a function in JavaScript?",
    answerChoices: ["function = myFunction()", "function myFunction()", "function:myFunction()"],
    correctAnswer: "function myFunction()"
  },

]

var currentQuestion = 0;

//functions to run the quiz

function startGame(event) {
  event.preventDefault();
  // 4. add event listeners to my answer choice buttons and that will validate whether they chose the right answer or not
  // 5. move on to next question
    startTimer()
    generateQuestion();
}

function generateQuestion() {
  var question = questions[currentQuestion].question;
  // create an element (p, div?)
  var parragraph = document.createElement("p");

  parragraph.textContent = question;
  
  document.body.appendChild(parragraph);

  generateAnswerChoices();
}

function generateAnswerChoices() {
  var answerChoices = questions[currentQuestion].answerChoices;
  for ( let i = 0; i <questions[currentQuestion].answerChoices.length; i++){
    var choicesButton = document.createElement("button");
    choicesButton.innerHTML = answerChoices [i];
    document.body.appendChild(choicesButton);
  }
    
  choicesButton.addEventListener("click", validateAnswer);
}

 
function validateAnswer(event) {
  event.preventDefault();
  // grab text of button that was clicked (event.target.textContent)
  

  // conditional statement test userChoice === correctAnswer
  // true
  //    correct answer code
  // false
  //    incorrect answer
  //    decrease timer by 10 secs
  
  // move onto the next question

  // currentQuestion++
  // conditional statement to check if you've reached the end of the questions array if(currentQuestion === questions.length)
  // end the game (call endGame())
    endGame()
  // reset quiz area (quizArea.innerHTML = "", loop using .removeChild())

  // call generateQuestion again to start on the next question
  generateQuestion();
}

function startTimer() {
  timer = setInterval(function() {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timerInterval);
      endGame()
      // Call the `displayMessage()` function
      // displayMessage();
    }
  }, 1000)
}

function endGame() {
  // end game whether it reaches the end of the quiz or time runs out
  // display none quiz area and display end game div


  // score
  score = timeLeft;
  // display score

  // display high score
}

function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    intials: event.target.children[0].value,
    score: timeLeft
  }
  // sets the score into local storage
  localStorage.setItem("score", JSON.stringify(scoreObj));
}

function getScore() {
  // get high score out of localstorage
  var score = JSON.parse(localStorage.getItem("score"))
  // display to end game div
  
}

startBtn.addEventListener("click", startGame);

scoreForm.addEventListener("submit", saveScore)