// paragraph to display message (.message)
const message = document.querySelector(".message");
// paragraph for word in progress (.word-in-progress)
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph for how mamy remaining letters (.remaining)
const remaining = document.querySelector(".remaining");
// span for how many remaining letters (.remaining span)
const remainingSpan = document.querySelector(".remaining span");
// unordered list of already guessed letters (.guessed-letters)
const guessedLetters = document.querySelector(".guessed-letters");
// input box to guess letters (.letter)
const letterInput = document.querySelector(".letter");
// guess button (.guess)
const guessButton = document.querySelector(".guess");
// play again button (.play-again)
const playAgainButton = document.querySelector(".play-again");

// starting word to test game
const word = "magnolia";

// function to update wordInProgress with circle symbols to represent each letter in the word
const addCircleSymbol = function (word) {
    wordInProgress.innerText = "";
    for (let i in word) {
        wordInProgress.innerText += "●";
    }
    return wordInProgress;
};

addCircleSymbol(word);

// event listener for clicking the guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault(); // prevent reloading behavior
    const inputValue = letterInput.value;
    letterInput.value = "";
});