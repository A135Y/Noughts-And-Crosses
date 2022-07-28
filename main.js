//Variables
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const whosturn = document.getElementById('whosturn');
const blocks = document.querySelectorAll('.block');
const player1 = 'X'; //to change players
const player2 = 'O';
let changeTurn = player1;
const blockCount = Array(blocks.length); //creates an array of values for each block

//Buttons Logic

start.addEventListener('click', startGame)

function startGame() {
  whosturn.innerText = "Player 1's Turn"
  start.disabled = true;
}

blocks.forEach((block) => block.addEventListener('click', addHover))

function addHover (){
  
  blocks.forEach(block => {
    block.classList.remove('X');
    block.classList.remove('O')
  })

const hover = `${changeTurn.toLowerCase()}-hover`;

blocks.forEach(block => {
  if(block.innerText == ''){
    block.classList.add(hover)
  }
});
}

addHover();

blocks.forEach((block) => block.addEventListener('click', addVal))

function addVal(val) {
  const block = val.target;
  const squareNumber = block.dataset.index;
  if (block.innerText != '') {
    return;
  }

  if (changeTurn === player1) {
    block.innerText = player1;
    blockCount[squareNumber - 1] = player1;
    changeTurn = player2;
    whosturn.innerText = "Player 2's Turn"
  } else {
    block.innerText = player2;
    blockCount[squareNumber - 1] = player2;
    changeTurn = player1;
    whosturn.innerText = "Player 1's Turn"
  }
addHover();
}




reset.addEventListener('click', resetGame)

function resetGame(b) {
  whosturn.innerText = '';
  blocks.forEach((block) => block.innerText = '');
  start.disabled = false;
}


console.log(blocks);

//Use window.alert() to show who won on the browser increment counter by one for the winner

//
