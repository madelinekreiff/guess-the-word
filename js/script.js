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
// label for letter input box
const letterInputLabel = document.querySelector(".letter-input-label");
// input box to guess letters (.letter)
const letterInput = document.querySelector(".letter");
// guess button (.guess)
const guessButton = document.querySelector(".guess");
// play again button (.play-again)
const playAgainButton = document.querySelector(".play-again");

// initialize word & message to start game
let word = "";
message.innerText = "Let's play! Guess a letter to begin.";

// array to contain all the letters the player guesses
let guessedLetters = [];

// global variable to contain the number of remaining guesses - this number will change
let remainingGuesses = 10;

// async function to fetch a random word from a .txt file of over 800 words
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    
    // grab random word from file
    const randIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randIndex].trim().toUpperCase();
    addLetterPlaceholders(word);
};

// start game
getWord();

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
    } else if (! input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
        input = "";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
        input = "";
    }
    return input;
};

// function to capture the input values and place them in an array
const makeGuess = function (letter) {
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter! Try again.";
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        countGuesses(letter);
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
    // change wordInProgress.innerText to an array & empty
    const wordText = wordInProgress.innerText;
    const newInProgressArray = wordText.split("");
    wordInProgress.innerText = "";

    // change word to an array
    const wordArray = word.split("");

    // loop through guessedLetters, & if a guessed letter equals a letter in the word, replace circle symbol with the correct letter
    for (let letter of guessedLetters) {
        if (wordArray.includes(letter)) {
            let i = 0;
            for (let wordLetter of wordArray) {
                if (wordLetter === letter) {
                    newInProgressArray.splice(i, 1, letter);
                }
                i += 1;
            }
        }
    }
    // change newInProgressArray back to a string, then make it the new wordInProgress.innerText
    const newWord = newInProgressArray.join("");
    wordInProgress.innerText = newWord;

    checkWin();
};

// function to update count of remaining guesses
const countGuesses = function (guess) {
    // change word to an array & guess to upper case
    const wordArray = word.split("");
    if (wordArray.includes(guess)) {
        message.innerText = `Good guess! The word has the letter ${guess} in it.`;
    } else {
        remainingGuesses -= 1;
        message.innerText = `Sorry, the word does not have the letter ${guess} in it. Try again!`;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${word}.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = "1 guess";
    } else if (remainingGuesses > 1) {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// function to check if player won
const checkWin = function () {
    if (wordInProgress.innerText === word) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        startOver();
    }
};

// function to hide guess button, show play again button & clear the guessedLetters array
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersList.classList.add("hide");
    letterInputLabel.classList.add("hide");
    letterInput.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// event listener for clicking the guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevent reloading behavior
    const inputValue = letterInput.value.toUpperCase();
    letterInput.value = "";
    message.innerText = "";

    const letter = validateInput(inputValue);
    if (letter !== "") {
        makeGuess(letter);
    }
});

// event listener for clicking the play again button
playAgainButton.addEventListener("click", function(e) {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses = 10;
    guessedLetters = [];
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    letterInputLabel.classList.remove("hide");
    letterInput.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
})