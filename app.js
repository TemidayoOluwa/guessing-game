let randomNumber = parseInt((Math.random() * 100) + 1);
console.log(randomNumber);
alert(`
Guess the number between 1 - 100.
Please note, you have three(3) attempts to try else you lose.
`)
const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessingField');
const guessSlot = document.querySelector('.guesses');
const attempt = document.querySelector('#attempts');
const startOver = document.querySelector('.result');
const lowOrHi = document.querySelector('.low-Hi');

const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener( 'click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
};

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid Number to play...');
    }else if (guess < 1){
        alert('Enter a number greater than 1');
    }else if (guess > 100){
        alert('Enter a number lesser than 100');
    }else{
        previousGuesses.push(guess);

        if (numGuesses === 4) {
            displayGuesses(guess);
            displayMessage(`Game Over! The number was ${randomNumber}`);
            endGame();
        }else{
            displayGuesses(guess);
            checkGuess(guess);
        }
    }
};

function checkGuess(guess) {
    if (guess === randomNumber){
        displayMessage('Hurray! Your guess is right');
        endGame();
    }else if (guess < randomNumber){
        displayMessage('Too low, Try again!');
    }else if (guess > randomNumber){
        displayMessage('Too high, Try again!');
    }
};

function displayGuesses(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuesses++
    attempt.innerHTML = ` ${4 - numGuesses} `;
}
function displayMessage(message) {
    lowOrHi.innerHTML = `<h1>${message}</h1>`
}
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id="newGame">Start new Game</h3>`


    startOver.appendChild(p);
    playGame = false;
    newGame();

}

function newGame() {
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', function(){
        randomNumber =  parseInt((Math.random() * 100) + 1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        attempt.innerHTML = `${4 - numGuesses} `
        userInput.removeAttribute('disabled');
        startOver.appendChild(p);
        playGame = true;
    })
};