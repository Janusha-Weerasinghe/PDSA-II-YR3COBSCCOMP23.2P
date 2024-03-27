const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X'; // Human player
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] !== '' || gameEnded) return;

    makeMove(cellIndex, currentPlayer);

    if (gameEnded) return;

    // Computer's turn
    computerMove();
}

function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].innerText = player;
    cells[index].classList.add(player);

    if (checkWin(player)) {
        endGame(false, player);
    } else if (checkDraw()) {
        endGame(true);
    }
}

function computerMove() {
    let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);

    if (availableCells.length === 0) return;

    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomCell, 'O');
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function endGame(draw, winner = null) {
    if (draw) {
        message.innerText = "It's a draw!";
    } else {
        message.innerText = `${winner} wins!`;
    }
    gameEnded = true;
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X'; // Human always starts
    gameEnded = false;
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
}
