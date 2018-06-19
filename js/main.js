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

// Event listeners for DOM
document.addEventListener("DOMContentLoaded", function() {
  // console.log("the DOM is ready to be interacted with!");
  addCardEventListeners();
  addButtonClickEventListener("buttonNewGame", newGame)
  console.log(deck);
  shuffle(deck);
  console.log(deck);
  deal(deck);
});

// Event listeners for cards
function addCardEventListeners() {
  let cards = document.querySelectorAll(".card");
  for (let card of cards) {
    card.addEventListener("click", function clicked() {
      console.log(`A card was clicked with text == ${card.textContent}`);
      card.classList.toggle("clicked");
      // TODO add logic for waiting & turning blue again if no match
      // TODO add logic for waiting & turning green if match
      // TODO add logic to count total # matches and restarting the game if all matches found
    });
  }
}

function addButtonClickEventListener(buttonID, myFunctionName) {
  // Adds event listener calling myFunctionName every time buttonID is clicked
  let myButton = document.querySelector(`#${buttonID}`);
  myButton.addEventListener("click", myFunctionName);
}

function newGame() {
  // Calls all functions needed to start a new game
  shuffle(deck);
  deal(deck);
  flipCardsFacedown();
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
