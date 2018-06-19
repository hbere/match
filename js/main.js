// Memory Game Project JavaScript file
let deck = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H"
];
let clickState = 0;
let guessCounter = 0;

// Initialize game after DOM loads
document.addEventListener("DOMContentLoaded", function() {
  addButtonClickEventListener("buttonNewGame", newGame);
  newGame();
});

function addCardEventListeners() {
  // Add event listener to each card;
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (clickState === 0) {
    // First card clicked
    if (this.classList.contains("clicked") === false && this.classList.contains("matched") === false) {
      this.classList.toggle("clicked");
      clickState++;
      console.log(`Clickstate now ${clickState}.`);
    }
  } else if (clickState === 1) {
    // Second card clicked
    // TODO add logic for waiting & turning blue again if no match
    // TODO add logic for waiting & turning green if match
    if (this.classList.contains("clicked") === false && this.classList.contains("matched") === false) {
      this.classList.toggle("clicked");
      clickState++;
      console.log(`Clickstate now ${clickState}.`);
      // TODO add logic to count total # matches and restarting the game if all matches found
      flipNonMatches();
      guessCounter++;
    }
  } else {
    // Error handling
    console.log(`Error: clickstate of ${clickState} or greater.`);
  }
}

function flipNonMatches() {
  // Add event listener to each card;
  let cardsClicked = document.querySelectorAll(".clicked");
  console.log(cardsClicked);
  let tempValues = [],
    match;
  // Get list of matched numbers
  for (let card of cardsClicked) {
    tempValues.push(card.textContent);
  }
  // Flip non-matches facedown
  match = tempValues[0] === tempValues[1];
  if (match) {
    // If match
    for (let card of cardsClicked) {
      card.classList.remove("clicked");
      card.classList.add("matched");
      card.removeEventListener("click", flipCard);
    }
  } else {
    // If not a match
    for (let card of cardsClicked) {
      setTimeout(function() {
        card.classList.remove("clicked");
      }, 800);
    }
  }
  clickState = 0;
}

function addButtonClickEventListener(buttonID, myFunctionName) {
  // Adds event listener calling myFunctionName every time buttonID is clicked
  let myButton = document.querySelector(`#${buttonID}`);
  myButton.addEventListener("click", myFunctionName);
}

function newGame() {
  // Calls all functions needed to start a new game
  addCardEventListeners();
  shuffle(deck);
  deal(deck);
  flipCardsFacedown();
  clickState = 0;
  guessCounter = 0;
}

function flipCardsFacedown() {
  // Flips all cards facedown (by removing the class "clicked")
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.remove("clicked");
  }
}

function deal(array) {
  // Deals cards to the UI
  let cards = document.querySelectorAll(".card");
  let i = 0;
  for (let card of cards) {
    card.textContent = array[i];
    i++;
  }
}

function shuffle(array) {
  // Performs as Fisher-Yates shuffle
  // More info @ https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  let maxIndex, randIndex;
  // Shuffle
  for (let [index] of array.entries()) {
    maxIndex = array.length - 1;
    randIndex = getRandomInt(0, maxIndex);
    [array[randIndex], array[index]] = [array[index], array[randIndex]];
  }
  // Return shuffled array
  return array;
}

function getRandomInt(min, max) {
  // return 1 random integer between min and max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
