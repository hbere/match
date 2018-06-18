// Memory Game Project JavaScript file
let cardText = [
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
  console.log("the DOM is ready to be interacted with!");
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
