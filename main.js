const blocks = document.querySelectorAll(".blocks");
const PLAYER1 = "X";
const PLAYER2 = "O";
let turn = PLAYER1;
const tableState = Array(blocks.length);
tableState.fill(null);
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const whosturn = document.getElementById('whosturn');

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");


start.addEventListener('click', startGame)

function startGame() {
  whosturn.innerText = "Player 1's Turn"
  start.disabled = true;
}


blocks.forEach((block) => block.addEventListener("click", blockClick));

function setHoverText() {
  //remove all hover text
  blocks.forEach((block) => {
    block.classList.remove("x-hover");
    block.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  blocks.forEach((block) => {
    if (block.innerText == "") {
      block.classList.add(hoverClass);
    }
  });
}

setHoverText();

function blockClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const block = event.target;
  const blockNumber = block.dataset.index;
  if (block.innerText != "") {
    return;
  }

  if (turn === PLAYER1) {
    block.innerText = PLAYER1;
    tableState[blockNumber - 1] = PLAYER1;
    turn = PLAYER2;
  } else {
    block.innerText = PLAYER2;
    tableState[blockNumber - 1] = PLAYER2;
    turn = PLAYER1;
  }
  setHoverText();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination;
    const blockValue1 = tableState[combo[0] - 1];
    const blockValue2 = tableState[combo[1] - 1];
    const blockValue3 = tableState[combo[2] - 1];

    if (
      blockValue1 != null &&
      blockValue1 === blockValue2 &&
      blockValue1 === blockValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(blockValue1);
      return;
    }
  }

  //Check for a draw
  const allblockFilledIn = tableState.every((block) => block !== null);
  if (allblockFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

reset.addEventListener('click', resetGame)

function resetGame(b) {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  blocks.forEach((block) => (block.innerText = ""));
  tableState.fill(null);
  turn = PLAYER1;
  start.disabled = false;
  whosturn.innerText = '';
  setHoverText();
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
