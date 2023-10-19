// Random Number
let randomNum = Math.floor(Math.random() * 100 + 1);

// DOM Selector
const submit = document.querySelector('#subt');
const userInput = document.querySelector('.guessField');
const result = document.querySelector('.resultParas');
const guessSlot = document.querySelector('.guesses');
const remGuesses = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const newGameBtn = document.querySelector('.newGame');
const p = document.createElement('p');

// Other Variables
let numOfGuess = 1;
let numAttempts = 10;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const userGuess = parseInt(userInput.value);
    validateInput(userGuess);
  });
}

// Method for validation of input

const validateInput = (guessVal) => {
  if (guessVal === '' || guessVal <= 0 || isNaN(guessVal)) {
    alert(`Please enter a valid guess`);
  } else {
    if (numOfGuess === 10) {
      guessSlot.innerHTML += guessVal;
      if (guessVal === randomNum) {
        displayMessage(`Congrats! You won. Random number is ${randomNum}`);
      } else {
        displayMessage(`Game Over! Random Number was ${randomNum}`);
      }
      remGuesses.innerHTML = numAttempts - numOfGuess;
      endGame();
    } else {
      evalGuess(guessVal);
      updateGuess(guessVal);
      numOfGuess++;
    }
  }
};

// Method for checking the user guess vs random number

const evalGuess = (evalVal) => {
  if (evalVal === randomNum) {
    displayMessage(`Congrats! You won. Random number is ${randomNum}`);
    endGame();
  } else if (evalVal < randomNum) {
    displayMessage(`Try Again! Too Low guess`);
  } else if (evalVal > randomNum) {
    displayMessage(`Try Again! Too High guess`);
  }
};

// Method for displaying Previous & Remaining Guesses

const updateGuess = (updateVal) => {
  userInput.value = '';
  guessSlot.innerHTML += `${updateVal}, `;
  remGuesses.innerHTML = numAttempts - numOfGuess;
};

// Method for displaying message to the user

const displayMessage = (msg) => {
  lowOrHi.innerHTML = msg;
};

// Method for ending game

const endGame = () => {
  playGame = false;
  userInput.setAttribute('disabled', '');
  submit.setAttribute('disabled', '');
  userInput.value = '';
  p.innerHTML = `<p class='newBtn'> Start New Game </p>`;
  newGameBtn.appendChild(p);
  newGame();
};

// Method for Startng New Game

const newGame = () => {
  const newBtn = document.querySelector('.newBtn');
  newBtn.addEventListener('click', function (e) {
    playGame = true;
    numOfGuess = 1;
    userInput.removeAttribute('disabled');
    submit.removeAttribute('disabled');
    guessSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    randomNum = Math.floor(Math.random() * 100 + 1);
    remGuesses.innerHTML = numAttempts;
    newGameBtn.removeChild(p);
  });
};