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
const wordUpper = word.toUpperCase();

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
    // change wordInProgress.innerText to an array
    const wordText = wordInProgress.innerText;
    const newInProgressArray = wordText.split("");
    
    // empty .innerTexts
    wordInProgress.innerText = "";
    message.innerText = "";

    // change wordUpper to an array
    const wordArray = wordUpper.split("");

    // change guessedLetters to string, upper case, then back to array
    const guessedLettersStr = guessedLetters.join("");
    const guessedLettersStrUpper = guessedLettersStr.toUpperCase();
    const guessedLettersArray = guessedLettersStrUpper.split("");

    // loop through guessedLettersArray, & if a guessed letter equals a letter in the word, replace circle symbol with the correct letter
    for (let letter of guessedLettersArray) {
        if (wordArray.includes(letter)) {
            let i = 0;
            for (let wordLetter of wordArray) {
                if (wordLetter === letter) {
                    newInProgressArray.splice(i, 1, letter);
                }
                i += 1;
            }
            message.innerText = `Good guess!`;
        } else {
            message.innerText = "Try again!";
        }
    }
    // change newInProgressArray back to a string, then make it the new wordInProgress.innerText
    const newWord = newInProgressArray.join("");
    wordInProgress.innerText = newWord;

    checkWin();
}; // end updateWordInProgress function

// function to check if player won
const checkWin = function () {
    if (wordInProgress.innerText === wordUpper) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
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