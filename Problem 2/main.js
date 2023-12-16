import { questions } from './questions.js'

let answer;
let index = 0;
let score = 0;
let currentQuestion;

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
buttonNext.addEventListener("click",getQuestion);
playAgainButton.addEventListener("click", startAgain);

function start()
{
    play.style.display = "none";
    questionsContainer.style.display = "flex";
    shuffleQuestions();
    getQuestion()
}

function getQuestion()
{
    if(index < questions.length && index > 0)
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

        currentQuestion = questions[index];
        createQuestion(currentQuestion);
        ++index;
    }
    else if(index === 0)
    {
        currentQuestion = questions[index];
        createQuestion(currentQuestion);
        index++;
    }
    else if(index == questions.length)
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

function shuffleQuestions()
{
    let currentIndex = questions.length,  randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [questions[currentIndex], questions[randomIndex]] = [questions[randomIndex], questions[currentIndex]];
  }
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

function createQuestion(currentQuestion)
{
    question.innerHTML = `<p>${index+1}. ${currentQuestion.question}</p>
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
    displayScore.innerHTML = `<h3>You answered ${score} questions correctly`;
}

function startAgain()
{
    index = 0;
    score = 0;
    quizOverContainer.style.display = "none";
    questionsContainer.style.display = "flex";
    shuffleQuestions();
    getQuestion()
}