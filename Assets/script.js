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
    answerChoices: ["script", "style", "body"],
    correctAnswer: "script"
  },
  {
    question: "How do you create a function in JavaScript?",
    answerChoices: ["function = myFunction()", "function myFunction()", "function:myFunction()"],
    correctAnswer: "function myFunction()"
  },

]

var currentQuestion = 0;

//Hides End Game from initial screen
document.getElementById("endGame").style.display= "none";

//functions to run the quiz

function startGame(event) {
  event.preventDefault();
    startTimer()
    generateQuestion();
}


function generateQuestion() {
  var question = questions[currentQuestion].question;
  console.log(question);
  // create an element (p, div?)
  var parragraph = document.createElement("p");

  parragraph.textContent = question;
  
  document.getElementById("quiz").appendChild(parragraph); //adds p element to quiz div

  generateAnswerChoices();

  //Hides Start button 
  document.getElementById("startBtn").style.display= "none";
}

//Generate Answer Choices
var choicesButton = document.createElement("button");
function generateAnswerChoices() {
  var answerChoices = questions[currentQuestion].answerChoices;
  for ( let i = 0; i <questions[currentQuestion].answerChoices.length; i++){
    var choicesButton = document.createElement("button");
    choicesButton.innerHTML = answerChoices [i];
    document.getElementById("quiz").appendChild(choicesButton);
    choicesButton.addEventListener("click", validateAnswer);
  }
    
}
//Determine if answer is correct/incorrect
function validateAnswer(event) {
  event.preventDefault();
  var userChoice = event.target.textContent;
  if(userChoice === (questions[currentQuestion].correctAnswer)){
    console.log(userChoice + " is correct!");
  }else{
    console.log(timerEl.textContent = (timeLeft -= 10));
  }

  currentQuestion++
  // conditional statement to check if you've reached the end of the questions array 
  if(currentQuestion === questions.length){
    timerEl.textContent = (timeLeft = 0);
    console.log("end game");
    return endGame();

  }
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
      clearInterval();
      endGame()
    }
  }, 1000)
}

function endGame() {
// display none quiz area and display end game div

  document.getElementById("quiz").style.display="none";

  document.getElementById("endGame").style.display= "block";

  getScore();
}





function saveScore(event) {
  event.preventDefault();

  var scoreObj = {
    intials: event.target.children[0].value,
    score: timeLeft

  };  
  console.log(scoreObj);
  // sets the score into local storage
  localStorage.setItem("score", JSON.stringify(scoreObj));
  getScore();
}


function getScore() {
  // get high score out of localstorage
  var score = JSON.parse(localStorage.getItem("score"));
  // display to end game div
  document.getElementById("endGame").style.display= "block";
  
  
}

startBtn.addEventListener("click", startGame);

scoreForm.addEventListener("submit", saveScore)


