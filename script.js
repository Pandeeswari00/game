let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');

function handleClick(cellIndex) {
  if (isGameOver || gameBoard[cellIndex] !== '') return;

  // Mark the cell with the current player's symbol
  gameBoard[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;

  // Check for a winner
  if (checkWinner()) {
    gameStatus.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
  } else if (gameBoard.every(cell => cell !== '')) {
    // Check for a tie
    gameStatus.textContent = "It's a tie!";
    isGameOver = true;
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombination.some(combination => {
    const [a, b, c] = combination;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  currentPlayer = 'X';
  gameStatus.textContent = '';
  cells.forEach(cell => cell.textContent = '');
}

// Add click event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});