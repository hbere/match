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
  // Flip over card as appropriate
  if (clickState === 0) {
    // First card clicked
    if (
      this.classList.contains("clicked") === false &&
      this.classList.contains("matched") === false
    ) {
      this.classList.toggle("clicked");
      clickState++;
      console.log(`Clickstate now ${clickState}.`);
    }
  } else if (clickState === 1) {
    // Second card clicked
    if (
      this.classList.contains("clicked") === false &&
      this.classList.contains("matched") === false
    ) {
      this.classList.toggle("clicked");
      clickState++;
      console.log(`Clickstate now ${clickState}.`);
      flipNonMatches();
      guessCounter++;
      document.getElementById("moves").innerHTML = `<strong>${guessCounter}</strong>`;
    }
  } else {
    // Error handling
    console.log(`Error: clickstate of ${clickState} or greater.`);
  }
  // Check if game is complete
  if (gameComplete() === true) {
    document.getElementById("gameComplete").innerHTML =
      "<strong>Congratulations, you won!!</strong>";
    if (
      guessCounter < document.getElementById("personalBest").textContent ||
      document.getElementById("personalBest").textContent == "NA"
    ) {
      document.getElementById("personalBest").textContent = guessCounter;
    }
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
      }, 500);
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
  document.getElementById("moves").textContent = guessCounter;
  document.getElementById("gameComplete").innerHTML = "";
}

function flipCardsFacedown() {
  // Flips all cards facedown (by removing the class "clicked")
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.remove("clicked");
    card.classList.remove("matched");
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
  // Return 1 random integer between min and max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function gameComplete() {
  // Check if game is over
  let cards = document.querySelectorAll(".card");
  let matches = document.querySelectorAll(".matched");
  if (cards.length === matches.length) {
    return true;
  } else {
    return false;
  }
}
