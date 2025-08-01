const emojis = ["🍎", "🍌", "🍇", "🍒", "🍉", "🍍"];
const doubledEmojis = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const winMessage = document.getElementById("winMessage");

let score = 0;
let firstCard = null;
let lockBoard = false;
let matchesFound = 0;
const totalPairs = emojis.length;

doubledEmojis.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.textContent = "";
  card.onclick = () => revealCard(card);
  gameBoard.appendChild(card);
});

function revealCard(card) {
  if (lockBoard || card.classList.contains("revealed") || card.classList.contains("matched")) return;

  card.classList.add("revealed");
  card.textContent = card.dataset.emoji;

  if (!firstCard) {
    firstCard = card;
  }

  else {
    lockBoard = true;
    if (firstCard.dataset.emoji === card.dataset.emoji) {
      firstCard.classList.add("matched");
      card.classList.add("matched");
      score++;
      matchesFound++;
      scoreDisplay.textContent = score;
      if (matchesFound === totalPairs) {
        winMessage.style.display = "block";
      }
      resetTurn();
    }

    else {
      setTimeout(() => {
        firstCard.classList.remove("revealed");
        card.classList.remove("revealed");
        firstCard.textContent = "";
        card.textContent = "";
        resetTurn();
      }, 800);
    }
  }
}

function resetTurn() {
  [firstCard, lockBoard] = [null, false];
}