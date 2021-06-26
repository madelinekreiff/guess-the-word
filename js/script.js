// paragraph to display message (.message)
const message = document.querySelector(".message");
// paragraph for word in progress (.word-in-progress)
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph for how mamy remaining letters (.remaining)
const remaining = document.querySelector(".remaining");
// span for how many remaining letters (.remaining span)
const remainingSpan = document.querySelector(".remaining span");
// unordered list of already guessed letters (.guessed-letters)
const guessedLettersList = document.querySelector(".guessed-letters");
// input box to guess letters (.letter)
const letterInput = document.querySelector(".letter");
// guess button (.guess)
const guessButton = document.querySelector(".guess");
// play again button (.play-again)
const playAgainButton = document.querySelector(".play-again");

// starting word to test game
const word = "magnolia";

// array to contain all the letters the player guesses
const guessedLetters = [];

// function to update wordInProgress with circle symbols to represent each letter in the word
const addLetterPlaceholders = function (word) {
    wordInProgress.innerText = "";
    for (const i of word) {
        wordInProgress.innerText += "●";
    }
    return wordInProgress;
};

// function to validate the player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; // this is the regex
    if (input.length === 0) {
        message.innerText = "Please enter a letter from A to Z.";
        input = "";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
        input = "";
    } else if (! input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
        input = "";
    }
    return input;
};

// function to capture the input values and place them in an array
const makeGuess = function (letter) {
    letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter! Try again.";
        return message.innerText;
    } else {
        guessedLetters.push(letter);
        return guessedLetters;
    }
};

// call function to start the game
addLetterPlaceholders(word);

// event listener for clicking the guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevent reloading behavior
    const inputValue = letterInput.value;
    letterInput.value = "";
    message.innerText = "";

    const letter = validateInput(inputValue);
    if (letter !== "") {
        makeGuess(letter);
    }
});