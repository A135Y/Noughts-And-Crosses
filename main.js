//Variables
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const whosturn = document.getElementById('whosturn');
const blocks = document.querySelectorAll('.block');
const strike = document.getElementById('strike');
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
const player1 = 'X'; //to change players
const player2 = 'O';
let changeTurn = player1;
let blockCount = Array(blocks.length); //creates an array of values for each block
blockCount.fill(null);


start.addEventListener('click', startGame)

function startGame() {
  whosturn.innerText = "Player 1's Turn"
  start.disabled = true;
}

blocks.forEach((block) => block.addEventListener("click", addVal));

function addHover() {
  //remove all hover text
  blocks.forEach((block) => {
    block.classList.remove("X-hover");
    block.classList.remove("O-hover");
  });

  const hoverText = `${changeTurn}-hover`;

  blocks.forEach((block) => {
    if (block.innerText == "") {
      block.classList.add(hoverText);
    }
  });
}

addHover();

function addVal(val) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const block = (val).target;
  const blockNumber = block.dataset.index;
  if (block.innerText !== "") {
    return;
  }
   
  if (changeTurn === player1) {
    block.innerText = player1;
    blockCount[blockNumber - 1] = player1;
    changeTurn = player2;
    whosturn.innerText = "Player 2's Turn"
  } else {
    block.innerText = player2;
    blockCount[blockNumber - 1] = player2;
    changeTurn = player1;
    whosturn.innerText = "Player 1's Turn"
  }

  addHover();
  checkWinner();
  
  reset.addEventListener('click', resetGame)

  function resetGame(b) {
    whosturn.innerText = '';
    blocks.forEach(block => block.innerText = '');
    start.disabled = false;
    blockCount = [];
    strike.className = 'strike';
  }
}

function checkWinner() {

  for (const checkCombo of winnerCombo) {

    const { combo, strikeClass } = checkCombo;
    const block1 = blockCount[combo[0] - 1];
    const block2 = blockCount[combo[1] - 1];
    const block3 = blockCount[combo[2] - 1];

    if (block1 != null && block1 === block2 && block1 === block3) {
      strike.classList.add(strikeClass);
      gameOverScreen(block1);
      return;
    }
  }
}

function gameOver(winner) {
  if (winner != null) {
    window.alert(`Winner is ${winner}!`)
  }
}


const winnerCombo = [
  { combo: [1, 2, 3], stikeClass: 'strike-row-1' },
  { combo: [4, 5, 6], stikeClass: 'strike-row-2' },
  { combo: [7, 8, 9], stikeClass: 'strike-row-3' },

  { combo: [1, 4, 7], stikeClass: 'strike-column-1' },
  { combo: [2, 5, 8], stikeClass: 'strike-column-2' },
  { combo: [3, 6, 9], stikeClass: 'strike-column-3' },

  { combo: [1, 5, 9], stikeClass: 'strike-diagonal-1' },
  { combo: [3, 5, 7], stikeClass: 'strike-diagonal-2' },
];
