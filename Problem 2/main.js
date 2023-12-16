import { questions } from './questions.js'

let importedQuestions = [...questions];
let initialLength = importedQuestions.length;
let answer;
let currentQuestion;
let score = 0;
let index = 0;

const play = document.getElementById("play");
const playButton = document.getElementsByClassName("play-button")[0];
const playAgainButton = document.getElementsByClassName("play-button")[1];
const questionsContainer = document.getElementById("questions-container");
const question = document.getElementById("question");
const buttonNext = document.getElementById("next-question");
const radioButtons = document.getElementsByName("radio");
const displayScore = document.getElementById("quiz-over");
const quizOverContainer = document.getElementById("quiz-over-container");

playButton.addEventListener("click", start);
buttonNext.addEventListener("click", getQuestion);
playAgainButton.addEventListener("click", startAgain);

function start()
{
    play.style.display = "none";
    questionsContainer.style.display = "flex";
    getQuestion();
    displayQuestion();
}

function getQuestion()
{
    if(index < initialLength && index > 0)
    {
        answer = getRadioValue();
        if (answer === currentQuestion.correctAnswer)
        {
            ++score;
        }
        else if (answer === null)
        {
            return;
        }

        generateRandomQuestion();
        displayQuestion();
        ++index;
    }
    else if(index === 0)
    {
        generateRandomQuestion();
        displayQuestion();
        ++index;
    }
    else if(index === initialLength)
    {
        answer = getRadioValue();
        if (answer === currentQuestion.correctAnswer)
        {
            ++score;
        }
        else if (answer === null)
        {
            return;
        }
        
        doneQuiz();
    }
}

function generateRandomQuestion()
{
    let randomIndex = Math.floor(Math.random() * (importedQuestions.length - 1 - 0) + 0);
    currentQuestion = importedQuestions[randomIndex];
    importedQuestions.splice(randomIndex, 1);
}

function getRadioValue()
{
    for (var i = 0; i < 4; i++) 
    {
        if (radioButtons[i].checked) 
        {
            return radioButtons[i].value;
        }
    } 

    return null; 
}

function displayQuestion()
{
    question.innerHTML = `<p>${Math.abs(importedQuestions.length-initialLength)}. ${currentQuestion.question}</p>
        <div class="answers">
          <label>
            <input type="radio" name="radio" value="${currentQuestion.choices[0]}">
            ${currentQuestion.choices[0]}
          </label>
          <label>
            <input type="radio" name="radio" value="${currentQuestion.choices[1]}">
            ${currentQuestion.choices[1]}
          </label>
          <label>
            <input type="radio" name="radio" value="${currentQuestion.choices[2]}">
            ${currentQuestion.choices[2]}
          </label>
          <label>
            <input type="radio" name="radio" value="${currentQuestion.choices[3]}">
            ${currentQuestion.choices[3]}
          </label>
        </div>`;
}

function doneQuiz()
{
    questionsContainer.style.display = "none";     
    quizOverContainer.style.display = "flex";
    displayScore.innerHTML = `<h3>You have answered correctly to ${score} questions`;
}

function startAgain()
{
    importedQuestions = [...questions];
    initialLength = importedQuestions.length;
    index = 0;
    score = 0;
    quizOverContainer.style.display = "none";
    questionsContainer.style.display = "flex";
    getQuestion()
}