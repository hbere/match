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
  // Add event listener to each card
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    // TODO add code to ensure duplicate event listeners not added
    card.addEventListener("click", flipCard);
  }
}

function flipCard() {
  // Check if card is still facedown
  if (
    this.classList.contains("clicked") === false &&
    this.classList.contains("matched") === false
  ) {
    if (clickState === 0) {
      // First facedown card clicked
      this.classList.toggle("clicked");
      clickState++;
    } else if (clickState === 1) {
      // Second facedown card clicked
      this.classList.toggle("clicked");
      clickState++;
      flipNonMatches();
      guessCounter++;
      document.getElementById("moves").textContent = guessCounter;
    }
  } else {
    // Error handling
    console.log(`Error: clickstate of ${clickState} or greater.`);
  }
  // Check if game is complete
  if (gameComplete() === true) {
    document.getElementById("gameComplete").textContent =
      "Congratulations, you won!!";
    if (
      guessCounter < document.getElementById("personalBest").textContent ||
      document.getElementById("personalBest").textContent == "NA"
    ) {
      document.getElementById("personalBest").textContent = guessCounter;
    }
  }
  return null;
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
  return null;
}

function addButtonClickEventListener(buttonID, myFunctionName) {
  // Adds event listener calling myFunctionName every time buttonID is clicked
  let myButton = document.querySelector(`#${buttonID}`);
  myButton.addEventListener("click", myFunctionName);
  return null;
}

function newGame() {
  // Calls all functions needed to start a new game
  addCardEventListeners();
  shuffle(deck);
  deal(deck);
  flipAllCardsFacedown();
  clickState = 0;
  guessCounter = 0;
  document.getElementById("moves").textContent = guessCounter;
  document.getElementById("gameComplete").textContent = "";
  return null;
}

function flipAllCardsFacedown() {
  // Flips all cards facedown (by removing the class "clicked")
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.classList.remove("clicked");
    card.classList.remove("matched");
  }
  return null;
}

function deal(array) {
  // Deals cards to the UI
  let cards = document.querySelectorAll(".card");
  let i = 0;
  for (let card of cards) {
    card.textContent = array[i];
    i++;
  }
  return null;
}

function shuffle(array) {
  // Performs a Fisher-Yates shuffle
  // More info @ https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  let maxIndex, randIndex;
  // Shuffle the cards
  for (let [index] of array.entries()) {
    maxIndex = array.length - 1;
    randIndex = getRandomInt(0, maxIndex);
    [array[randIndex], array[index]] = [array[index], array[randIndex]];
  }
  // Return the shuffled array
  return null;
}

function getRandomInt(min, max) {
  // Returns 1 random integer between min and max, inclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function gameComplete() {
  // Checks if game is over
  let cards = document.querySelectorAll(".card");
  let matches = document.querySelectorAll(".matched");
  if (cards.length === matches.length) {
    // Return true if number of cards equals number of matches
    return true;
  } else {
    // Else return false
    return false;
  }
}
