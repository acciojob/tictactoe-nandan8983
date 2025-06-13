//your JS code here. If required.
const inputSection = document.getElementById('input-section');
const gameSection = document.getElementById('game-section');
const boardDiv = document.getElementById('board');
const messageDiv = document.querySelector('.message');
const submitBtn = document.getElementById('submit');
let player1 = '', player2 = '';
let currentPlayer = '';
let currentSymbol = '';
let board = Array(9).fill('');
let gameActive = true;

submitBtn.onclick = function() {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();
  if (!player1 || !player2) {
	alert('Please enter both player names.');
	return;
  }
  inputSection.style.display = 'none';
  gameSection.style.display = 'block';
  startGame();
};

function startGame() {
  board = Array(9).fill('');
  gameActive = true;
  currentPlayer = player1;
  currentSymbol = 'X';
  renderBoard();
  updateMessage(`${currentPlayer}, you're up`);
}

function renderBoard() {
  boardDiv.innerHTML = '';
  for (let i = 0; i < 9; i++) {
	const cell = document.createElement('div');
	cell.className = 'cell';
	cell.id = (i + 1).toString();
	cell.textContent = board[i];
	cell.onclick = () => handleCellClick(i);
	boardDiv.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (!gameActive || board[index]) return;
  board[index] = currentSymbol;
  renderBoard();
  if (checkWin()) {
	updateMessage(`${currentPlayer} congratulations you won!`);
	gameActive = false;
	return;
  }
  if (board.every(cell => cell)) {
	updateMessage("It's a draw!");
	gameActive = false;
	return;
  }
  switchPlayer();
  updateMessage(`${currentPlayer}, you're up`);
}

function switchPlayer() {
  if (currentPlayer === player1) {
	currentPlayer = player2;
	currentSymbol = 'O';
  } else {
	currentPlayer = player1;
	currentSymbol = 'X';
  }
}

function updateMessage(msg) {
  messageDiv.textContent = msg;
}

function checkWin() {
  const winPatterns = [
	[0,1,2], [3,4,5], [6,7,8], 
	[0,3,6], [1,4,7], [2,5,8], 
	[0,4,8], [2,4,6]          
  ];
  return winPatterns.some(pattern =>
	pattern.every(idx => board[idx] === currentSymbol)
  );
}