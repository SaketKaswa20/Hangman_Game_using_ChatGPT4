// Array of words for the game
const words = ["javascript", "hangman", "game", "programming", "computer"];

// Select a random word from the array
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Store the current state of the word
const currentState = Array(selectedWord.length).fill("_");

// Remaining guesses
let remainingGuesses = 6;

// Store the guessed letters
const guessedLetters = [];

// Function to update the word display
function updateWordDisplay() {
  document.getElementById("word").textContent = currentState.join(" ");
}

// Function to update the remaining guesses display
function updateRemainingGuesses() {
  document.getElementById("guesses").textContent = `Remaining Guesses: ${remainingGuesses}`;
}

// Function to check if the letter is in the word
function checkLetter(letter) {
  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        currentState[i] = letter;
      }
    }
  } else {
    remainingGuesses--;
  }
}

// Function to handle the user's guess
function handleGuess() {
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();

  if (letter && guessedLetters.indexOf(letter) === -1) {
    guessedLetters.push(letter);
    checkLetter(letter);
    updateWordDisplay();
    updateRemainingGuesses();
  }

  input.value = "";
  input.focus();

  if (currentState.indexOf("_") === -1) {
    endGame(true);
  } else if (remainingGuesses === 0) {
    endGame(false);
  }
}

// Function to end the game
function endGame(won) {
  const message = won ? "Congratulations! You won!" : "Game over! You lost!";
  document.getElementById("wordContainer").classList.add("hidden");
  document.getElementById("inputContainer").classList.add("hidden");
  document.getElementById("submit").disabled = true;
  alert(message);
}

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", handleGuess);

// Initialize the game
updateWordDisplay();
updateRemainingGuesses();
