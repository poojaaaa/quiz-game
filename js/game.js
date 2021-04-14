const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
      "question": "Calculate order of the digital Butterworth filter using BLT with specification 0.8 ≤ |H(w)| ≤ 1 for 0 ≤ w ≤ 0.2π  &H(w)| ≤ 0.2  for 0.6 π ≤ w ≤ π ",
      "choice1": "2", 
      "choice2": "4",
      "choice3": "3",
      "choice4": "5",
      "answer": 1
    },
    {
      "question": "Calculate order of the Analog Chebyshev filter for the following specification Ωp=10 rad/sec, Ω =30rad/sec, Ap = 1dB, As =50 dB",
      "choice1": "5",
      "choice2": "6",
      "choice3": "3",
      "choice4": "8",
      "answer": 3
    },
    {
      "question": "The frequency response of the Butterworth filter approximation function is referred to",
      "choice1": "minimum flat",
      "choice2": "zero",
      "choice3": "none",
      "choice4": "maximum flat",
      "answer": 4
    },
    {
      "question": "What is the Butterworth polynomial of order 3?",
      "choice1": "(s2+s+1)(s-1)",
      "choice2": "(s2-s+1)(s-1)",
      "choice3": "(s2-s+1)(s+1)",
      "choice4": "(s2+s+1)(s+1)",
      "answer": 4
    },
    {
      "question": " Where does the poles of the transfer function of normalized low pass Butterworth filter exists?",
      "choice1": "Inside unit circle",
      "choice2": "Outside unit circle",
      "choice3": "On unit circle",
      "choice4": "None of the mentioned",
      "answer": 3
    },
    {
      "question": "Which of the following is true in the case of Butterworth filters?",
      "choice1": "Smooth pass band",
      "choice2": "Wide transition band",
      "choice3": "Not so smooth stop band",
      "choice4": "All of the mentioned",
      "answer": 4
    },
    {
      "question": "What is the value of magnitude frequency response of a Butterworth low pass filter at Ω=0?",
      "choice1": "0",
      "choice2": "1",
      "choice3": "1/√2",
      "choice4": " None of the mentioned",
      "answer": 2
    },
    {
      "question": "Which of the following is the backward design equation for a low pass-to-high pass transformation?",
      "choice1": "ΩS=ΩSΩu",
      "choice2": "ΩS=ΩuΩ′S",
      "choice3": "Ω′S=ΩSΩu",
      "choice4": " ΩS=Ω′SΩu",
      "answer": 2
    },
    {
      "question": " As the value of the frequency Ω tends to ∞, then |H(jΩ)| tends to ____________",
      "choice1": "0",
      "choice2": "1",
      "choice3": "∞",
      "choice4": "None of the mentioned",
      "answer": 1
    },
    {
      "question": " What is the Butterworth polynomial of order 1?",
      "choice1": "s-1",
      "choice2": "s+1",
      "choice3": "s",
      "choice4": "None of the mentioned",
      "answer": 2
    }

  ];   
  
//constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign("end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random( ) * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

     const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

     if (classToApply === "correct") {
         incrementScore (CORRECT_BONUS);
     }
      
     selectedChoice.parentElement.classList.add(classToApply);

     setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion(); 
     }, 1000);
     
    });
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};

startGame();
  