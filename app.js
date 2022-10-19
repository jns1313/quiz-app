APIURL = 'https://the-trivia-api.com/api/questions?categories=general_knowledge,music,geography,film_and_tv,food_and_drink&limit=10&difficulty=easy';

// SELECT ELEMENTS

const question = document.getElementById('question');
const barSlider = document.querySelector('.bar-slider');
const scoreLength = document.getElementById('score-length');
const answersList = document.querySelector('.answers-list');
const answerItem = document.querySelectorAll('.answer-item');
const answerA = document.getElementById('a');
const answerB = document.getElementById('b');
const answerC = document.getElementById('c');
const answerD = document.getElementById('d');
const submitBtn = document.getElementById('submit-btn');
const result = document.querySelector('.result');
const playAgain = document.getElementById('play-again');

async function loadQuiz() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData);
    getQuiz(respData);
}

loadQuiz();

let currentQuestion = 1;
let score = 0;
let checkedAnswer;
let correctAnswer;

let precent = 0;

scoreLength.textContent = currentQuestion;




// EVENT HANDLERS

submitBtn.addEventListener('click', () => {

    // check if have answer selected
    if (checkedAnswer) {

        currentQuestion++;
        scoreLength.textContent = currentQuestion;
        checkedAnswer = '';

        if (currentQuestion > 10) {
            answersList.style.display = 'none';
            result.textContent = `You scored ${score} out of 10 questions`;
            playAgain.style.display = 'block';
            submitBtn.style.display ='none';
            question.style.display = 'none';
            scoreLength.textContent = '0';
            currentQuestion = 1;

        }
        // if (currentQuestion === 10 ? result.innerHTML = `You scored ${score} out of 10 questions.` : currentQuestion++)
        
        for (const {classList} of answersList.children) {
            classList.remove('active');
        }

        if (checkedAnswer.textContent == correctAnswer) {
            score++;
            console.log(score);
            loadQuiz();
        } else {
            // console.error(correctAnswer);
            loadQuiz();
        }


    }

});

answersList.addEventListener('click', (e) => {
    const option = e.target;
    checkedAnswer = option;

    const isSet = option.classList.contains('active');

    for (const {classList} of answersList.children) {
        classList.remove('active');
    }
    option.classList.toggle('active', !isSet);

    // console.log(answersList.children);
})

playAgain.addEventListener('click', () => {
    location.reload();
})

// FUNCTIONS

// display quiz data
function getQuiz(data) {


    question.textContent = data[currentQuestion - 1].question;
    
    correctAnswer = data[currentQuestion - 1].correctAnswer;
    let answers = randomAnswers([data[currentQuestion - 1].incorrectAnswers[0], data[currentQuestion - 1].incorrectAnswers[1], data[currentQuestion - 1].incorrectAnswers[2] , data[currentQuestion - 1].correctAnswer]);
    // console.log(answers);

    answerA.textContent = `${answers[0]}`;
    answerB.textContent = `${answers[1]}`;
    answerC.textContent = `${answers[2]}`;
    answerD.textContent = `${answers[3]}`;

    // change font size if long text
    if (answers[0].length > 25) {
        answerItem.forEach(answer => {
            answer.style.fontSize = '1rem';
        })
    } else if (answers[0].length > 35) {
        answerItem.forEach(answer => {
            answer.style.fontSize = '0.8rem';
        })
    } else {
        answerItem.forEach(answer => {
            answer.style.fontSize = '1.5rem';
        })
    }

    if (question.textContent.length > 90) {
        question.style.fontSize = '1.5rem';
    } else {
        question.style.fontSize = '2rem';
    }

    increasePrecent();

}

// mix incorrect and correct answers randomly
function randomAnswers(answers) {
    // Javascript arrays have a method called sort() which sorts all the answers given a specified function, a negative number sends the element back in the array and a positive number sends it forward, so given that you can make a quick function to sort an array randomly like so:
    return answers.concat().sort(() => 0.5 - Math.random());
}

// increase bar slider precent
function increasePrecent() {
    // it works, why?
    precent = precent > 90 ? 10 : precent + 10;
    barSlider.style.width = precent + '%';
}





