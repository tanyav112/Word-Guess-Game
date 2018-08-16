let currentGuesses = [ ];
const allWords = ["Metallica", "Weezer", "Nirvana", "Aerosmith", "Journey", "Queen", "Radiohead", "Blondie", "Ramones", "Soundgarden"]
let score = 0;
let currentWord = " ";
let inGuesses = 0;
let guessesLeft = 10
let wrongLetters = [ ];

document.addEventListener('keypress', function(e) {
  console.log(e.key)
  cont letter= e.key.toLocaleLowerCase( );
  currentGuesses.push(letter);

  if (guessesLeft<=0) {
    restartRound();
  }

  if (hiddenWord() === currentWord) {
    score++
    restartRound();
    return;
  }

   if currentWord.indexOf(letter)  !== -1) {
   } else {
     guessesLeft--;
   }
}

function randWord(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

function restartRound () {
  currentWord = randWord (allWords);
  inGuesses = 0;
  guessesLeft = 10;
  wrongLetters = [ ];
}

function displayValues ( ) {
  let score = document.querySelector('#score"');
  let hword = document.querySelector('#hidden_word');
  let guessesLeft = document.querySelector('#guessesLeft"');
  let wrongLetters = document.querySelector('#wrongLetters"');

  scoreT.innerhtml = score;
  hword.innerHTML = hiddenWord();
  guessesLeft.innerHTML = guessesLeft;
  wrongLetters.innerHTML= wrongLetters.join();

}
 
function alreadyGuessed (letter) {
  let result = true
  for (let i = 0; i < guessedLetters.length; i++ ) {
    if (letter === guessedLetters[i]) {
      document.querySelector('#message').innerHTML = "You already guessed this letter";
      return false
    }
  }
  return result
}

document.onkeyup = function (event) {
 const letter = event.key
 if (letter != 'Enter') {
   if (alphaCheck(letter))  {
     guessedLetters.push(letter)
     document.querySelector('#guesses').innerHTML = guessedLetters.toString()

     guessesLeft--

     letter === compChoice? win() : (guessesLeft > 0 ?  wrong() : loss(letter))
   }
 } else {
      reset()
 }
}
  reset()