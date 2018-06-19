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
let shuffledDeck = new Array(deck.length);

// Event listeners for DOM
document.addEventListener("DOMContentLoaded", function() {
  // console.log("the DOM is ready to be interacted with!");
  shuffle();
});

// Event listeners for cards
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

// TODO add function to randomize card order
function shuffleIt(array) {
  // Declare variables
  let tempArray = [], tempIndex, shuffledArray;
  // Generate numbers 0 to deck length minus one
  for (let i = 0; i < deck.length; i++) {
    tempArray[i] = i;
  }
  // Get new deck order
  for (let i = 0; i < deck.length; i++) {
    console.log(tempArray);
    // Choose number from 0 to deck length minus one, without replacement
    console.log(tempArray.length-1);
    tempIndex = tempArray[getRandomInt(0, tempArray.length-1)];
    console.log(tempIndex);
    // push from tempArray onto shuffledDeck
    shuffledDeck[i] = deck[tempIndex];
    // pop from tempArray
    tempArray.splice(tempIndex, 1);
  }
  console.log(shuffledDeck);
  return shuffledArray;
}

function getRandomInt(min, max) {
  // return 1 random integer between min and max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
