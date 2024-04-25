const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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
    } else if (winner === 'X') {
        openNameModal();
    } else {
        message.innerText = 'Computer wins!';
    }
    gameEnded = true;
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameEnded = false;
    message.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    closeNameModal();
}

// Modal Dialog Functions
const modal = document.getElementById('nameModal');
const closeBtn = document.getElementsByClassName('close')[0];
const nameInput = document.getElementById('playerNameInput');
const confirmBtn = document.getElementById('confirmNameBtn');

function openNameModal() {
    modal.style.display = 'block';
}

function closeNameModal() {
    modal.style.display = 'none';
    nameInput.value = '';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeNameModal();
    }
}

closeBtn.onclick = closeNameModal;

confirmBtn.onclick = function() {
    const playerName = nameInput.value.trim();
    if (playerName) {
        message.innerText = `${playerName} wins!`;
    } else {
        message.innerText = 'Player wins!';
    }
    closeNameModal();
}