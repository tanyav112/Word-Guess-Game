//Global variables accessible by all functions

//array of word options
const allWords = ["Metallica", "Weezer", "Nirvana", "Aerosmith", "Journey", "Queen", "Radiohead", "Blondie", "Ramones", "Soundgarden"];

//Holds the letters guessed
let currentGuesses = "";

//computer selected solution is here
let currentWord = " ";

//This will break the solution into individual letters to be stored in array.
let lettersInChosenWord = [];

// Holds a mix of blank and solved letters (ex: 'n, _ _, n, _').
var blanksAndSuccesses = [];

//Holds the letters guessed
let letterGuessed = "";

//Holds all wrong guesses
let wrongLetters = [];

// This will be the number of blanks we show based on the solution.
var numBlanks = 0;

//Game counters
let winCounter = 0;
let lossCounter = 0;
// let numGuesses = 0;
let guessesLeft = 10;


function restartRound() {
  //solution chosen randomly from allWords list
  currentWord = allWords[Math.floor(Math.random() * allWords.length)];
  // The word is broken into individual letters.
  lettersInChosenWord = currentWord.split("");
  // We count the number of letters in the word.
  numBlanks = lettersInChosenWord.length;
  // We print the solution in console (for testing).
  console.log(currentWord);
  inGuesses = 0;
  //reset guesses back to 0
  numGuesses = 10;
  // Here we *reset* the guess and success array at each round.
  blanksAndSuccesses = [];
  // Here we *reset* the wrong guesses from the previous round.
  wrongGuesses = [];
  
  for (var i = 0; i, numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  // Reprints the guessesLeft to 10
  document.getElementById('guessesLeft').innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTML.
  document.getElementById("hidden_word").innerHTML = blanksAndSuccesses.join(" ");

  // Clears the wrong guesses from the previous round.
  document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");
}

// Function where we will do all of the comparisons for matches.
function alreadyGuessed(letter) {
  let letterInWord = false;
  for (let i = 0; i < numBlanks; i++) {
    if (currentWord[i] === letter)  {
      letterInWord = true;
    }
  }


  //if the letter exists somewhere in the word, then we need to know where
  if (letterInWord) {
    for (let j = 0; j < numBlanks; j++) {
      if (currentWord[j] === letter) {
        blanksAndSuccesses[j] = letter;
      }
    }
  }
  else {
    // Then we add the letter to the list of wrong letters and subtract from guesses
    wrongLetters.push(letter);
    guessesLeft--;
  }
}


// roundComplete() function
// Here we will have all of the code that needs to be run after each guess is made.
function roundComplete() {

  // First, log an initial status update in the console
  // telling us how many wins, losses, and guesses are left.
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + guessesLeft);



  // Update the HTML to reflect the new number of guesses.
  document.getElementById("guessesLeft").innerHTML = guessesLeft;

  // This will print the array of guesses and blanks onto the page.
  document.getElementById("hidden_word").innerHTML = blanksAndSuccesses.join(" ");

  // This will print the wrong guesses onto the page.
  document.getElementById("wrongLetters").innerHTML = wrongLetters.join(" ");

  //If our Word Guess string equals the solution.
  // (meaning that we guessed all the letters to match the solution)...
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

    // Add to the win counter
    winCounter++;

    // Give the user an alert
    alert("You win!");

    // Update the win counter in the HTML
    document.getElementById("win-counter").innerHTML = winCounter;

    // Restart the game
    restartRound();
  }

  // If we've run out of guesses
  else if (guessesLeft === 0) {

    // Add to the loss counter
    lossCounter++;

    // Give the user an alert
    alert("You lose");

    // Update the loss counter in the HTML
    document.getElementById("loss-counter").innerHTML = lossCounter;

    // Restart the game
    restartRound();
 }
}

//starts the game by running the startGame() function
restartRound();
//this initiates the function for capturing key clicks.
document.onkeyup = function (event) {
  // Converts all key clicks to lowercase letters.
  letterGuessed = String.fromCharCode(event.which).toLowerCase();

  // Runs the code to check for correct guesses.
  alreadyGuessed(letterGuessed);

  // Runs the code that ends each round.
  roundComplete();
};