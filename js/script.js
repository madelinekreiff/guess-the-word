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
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
    return guessedLetters;
};

// function to show guessed letters
const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerHTML = `${letter}`;
        guessedLettersList.append(li);
    }
};

// function to update word in progress - replaces circle symbols with correct letters guessed
const updateWordInProgress = function (guessedLetters) {
    const wordText = wordInProgress.innerText;
    wordInProgress.innerText = "";
    const newInProgressArray = wordText.split("");

    // change word to upper case and array
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    // change guessedLetters to string, upper case, then back to array
    const guessedLettersStr = guessedLetters.join("");
    const guessedLettersStrUpper = guessedLettersStr.toUpperCase();
    const guessedLettersArray = guessedLettersStrUpper.split("");

    // loop through the winning word, & if a guessed letter equals a letter in the word, replace it with the correct letter
    let i = 0;
    for (let letter of wordArray) {
        if (letter === guessedLettersArray[guessedLettersArray.length-1]) {
            newInProgressArray.splice(i, 1, letter); 
        } else {

        }
        i += 1;
    }

    // change newInProgressArray back to a string, then make it the new wordInProgress.innerText
    const newWord = newInProgressArray.join("");
    wordInProgress.innerText = newWord;

}; // end updateWordInProgress function


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