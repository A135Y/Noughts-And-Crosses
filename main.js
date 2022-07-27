//Variables
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const whosturn = document.getElementById('whosturn');
const block = document.getElementsByClassName('block');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const tie = document.getElementById('tie');
const td = document.getElementsByTagName('td');

//Buttons Logic

start.addEventListener('click', startGame)
   
function startGame () {
whosturn.innerText = "Player 1's Turn"
}

const blockSelectorX = document.querySelectorAll("td");
for (let i = 0; i < blockSelectorX.length; i++) {
  blockSelectorX[i].addEventListener("click", function() {
    this.innerText = 'X'
  });
}

const blockSelectorO = document.querySelectorAll("td");
for (let i = 0; i < blockSelectorO.length; i++) {
  blockSelectorO[i].addEventListener("click", function() {
    this.innerText = 'O'
  });
}

reset.addEventListener('click', resetGame)

function resetGame (b) {
    whosturn.innerText = '';
}


//For each even click its Player 2's turn else player 1

//Use window.alert() to show who won on the browser increment counter by one for the winner

//