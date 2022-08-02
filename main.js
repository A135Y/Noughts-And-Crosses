//variables
const blocks = document.querySelectorAll(".blocks");
const PLAYERX = "X";
const PLAYERO = "O";
const tableState = Array(blocks.length);
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const whosturn = document.getElementById('whosturn');
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
const countDown = document.getElementById("countDown");
let turn = PLAYERX;
tableState.fill(null);
let timeLeft = 3;
let timer;

start.addEventListener('click', startGame);
start.addEventListener("click", takeMove); //Timer from start click

function startGame() {
  whosturn.innerText = "Player X's Turn"
  start.disabled = true;
}


function countdown() {
  if (timeLeft) {
    countDown.innerText = timeLeft + ' Seconds Left';
    timeLeft--;
    timer = setTimeout(countdown, 1000);
  } else {
    countDown.innerText = "Turn Forfeited";
    timer = undefined;
  }
}

blocks.forEach((block) => block.addEventListener("click", takeMove));

function takeMove(event) {
  // timer will only be undefined if the game is not started
  let block = event.target;
  const blockNumber = block.dataset.index;
  if(block.innerText == null){
  if (typeof (timer) === "undefined") {
    countDown.innerText = timeLeft;
    timeLeft = 3;
    countdown();
  } else {
    clearTimeout(timer);
    timeLeft = 3;
    countdown();
  }
}
 if (countDown.innerText == 'Turn Forfeited' && turn === PLAYERX) {
    block.innerText = PLAYERO;
    tableState[blockNumber - 1] = PLAYERO;
    turn = PLAYERX;
    whosturn.innerText = "Player O's Turn";
  }
  
  else if (countDown.innerText == 'Turn Forfeited' && turn === PLAYERO) {
    block.innerText = PLAYERX;
    tableState[blockNumber - 1] = PLAYERX;
    turn = PLAYERO;
    whosturn.innerText = "Player X's Turn";
  }

return
}


blocks.forEach((block) => block.addEventListener("click", blockClick));


function setHoverText() {
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
  if (turn === PLAYERX) {
    block.innerText = PLAYERX;
    tableState[blockNumber - 1] = PLAYERX;
    turn = PLAYERO;
    whosturn.innerText = "Player O's Turn";
  } else {
    block.innerText = PLAYERO;
    tableState[blockNumber - 1] = PLAYERO;
    turn = PLAYERX;
    whosturn.innerText = "Player X's Turn";
  }

  setHoverText();
  checkWinner();
}

const winningCombinations = [
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];


function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
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
    whosturn.innerText = '';
    clearTimeout(timer);
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "It's A Draw!";
  if (winnerText != null) {
    text = `The Winner Is Player ${winnerText}!`;
    whosturn.innerText = '';
  }
  countDown.innerText = '';
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

reset.addEventListener('click', resetGame)

function resetGame(b) {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  blocks.forEach((block) => (block.innerText = ""));
  tableState.fill(null);
  turn = PLAYERX;
  start.disabled = false;
  whosturn.innerText = '';
  countDown.innerText = '';
  clearTimeout(timer);
  setHoverText();
}
