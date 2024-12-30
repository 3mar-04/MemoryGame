import "./style.css";

var errors = 0;
var matches = 0; // Track the number of successful matches
var cardList = [
  "C",
  "CC",
  "js",
  "html",
  "u",
  "css",
  "zuj",
  "java",
  "python",
  "image",
];

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected = null;
var card2Selected = null;

var timer; // Variable to store the setInterval for the timer
var timeLeft = 30; // 1 minute timer

window.onload = function () {
  shuffleCards();
  startGame();
  startTimer(); // Start the timer when the game starts
};

function shuffleCards() {
  cardSet = cardList.concat(cardList); // Two of each card
  console.log(cardSet);

  // Shuffle the array
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
  console.log(cardSet);
}

function startGame() {
  // Arrange the board 4x5
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      // Create the card element
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.setAttribute("data-card", cardImg); // Store the card type in a custom attribute
      card.src = "IEEE.jpg"; // Default image
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }

  console.log(board);
  setTimeout(hideCards, 1000);
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "IEEE.jpg"; // Set the default hidden image
    }
  }
}

function selectCard() {
  if (
    this.src.includes("IEEE") &&
    this !== card1Selected &&
    this !== card2Selected
  ) {
    if (!card1Selected) {
      card1Selected = this;
      this.src = this.getAttribute("data-card") + ".jpg"; // Show the card's image
    } else if (!card2Selected) {
      card2Selected = this;
      this.src = this.getAttribute("data-card") + ".jpg"; // Show the card's image
      setTimeout(update, 1000); // Check for match after a short delay
    }
  }
}

function update() {
  // If cards are the same, increment the match counter
  if (
    card1Selected.getAttribute("data-card") ===
    card2Selected.getAttribute("data-card")
  ) {
    matches += 1;
    document.getElementById("matches").innerText = `Matches: ${matches}`;

    // If 3 matches are found, stop the timer and declare victory
    if (matches === 3) {
      clearInterval(timer); // Stop the timer
      alert("You win!");
    }
  } else {
    // If cards aren't the same, flip them back
    card1Selected.src = "IEEE.jpg";
    card2Selected.src = "IEEE.jpg";
    errors += 1;
    document.getElementById("errors").innerText = `Errors: ${errors}`;
  }

  card1Selected = null;
  card2Selected = null;
}

function startTimer() {
  timer = setInterval(function () {
    timeLeft -= 1; // Decrease time by 1 second

    // Display the timer
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    // If the time runs out and the player hasn't matched 3 pairs, show "You lose"
    if (timeLeft === 0) {
      clearInterval(timer); // Stop the timer
      if (matches < 3) {
        alert("You lose! Time is up.");
      }
    }
  }, 1000); // Update the timer every 1 second
}
