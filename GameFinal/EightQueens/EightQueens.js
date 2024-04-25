let playerScores = {}; // Object to store player scores
let queens = []; // Array to store the positions of queens

// Function to move a queen
function moveQueen(cell, row, col) {
    try {
        if (cell.classList.contains('queen')) {
            queens = queens.filter(([r, c]) => !(r === row && c === col)); // Remove queen from current position
            cell.classList.remove('queen');
        } else {
            if (queens.length >= 8) {
                throw new Error('Cannot place more than 8 queens.');
            }
            queens.push([row, col]); // Add queen to new position
            cell.classList.add('queen');
        }
        checkPuzzleSolved(); // Check if the puzzle is solved after moving a queen
    } catch (error) {
        console.error(error.message);
    }
}

// Function to solve the puzzle
function solve() {
    try {
        const solution = []; // To store the positions of the queens

        // Function to check if it's safe to place a queen at row 'row' and column 'col'
        function isSafe(row, col) {
            // Check the column
            for (let i = 0; i < solution.length; i++) {
                if (solution[i][1] === col) {
                    return false;
                }
            }

            // Check the diagonal
            for (let i = 0; i < solution.length; i++) {
                if (Math.abs(solution[i][0] - row) === Math.abs(solution[i][1] - col)) {
                    return false;
                }
            }

            return true;
        }

        // Function to recursively find all possible solutions
        function findSolutions(row) {
            if (row === 8) { // All queens are placed successfully
                return true;
            }

            for (let col = 0; col < 8; col++) {
                if (isSafe(row, col)) {
                    solution.push([row, col]); // Place queen at row 'row' and column 'col'
                    if (findSolutions(row + 1)) { // Recur for next row
                        return true;
                    }
                    solution.pop(); // Backtrack if no solution found
                }
            }

            return false; // No solution found for this row
        }

        // Initialize solution array and find solutions starting from the first row
        solution.length = 0;
        findSolutions(0);

        return solution; // Return the found solution
    } catch (error) {
        console.error('Error solving puzzle:', error);
        return [];
    }
}

// Function to reset the game
function resetGame() {
    queens = []; // Clear the queens array
    initializeChessboard(); // Reinitialize the chessboard
    const solutionDiv = document.getElementById('solution');
    solutionDiv.textContent = ''; // Clear solution message
}

// Function to display the solution on the chessboard
function displaySolution(solution) {
    try {
        const board = document.getElementById('board');

        // Clear the board
        board.innerHTML = '';

        // Place queens on the board
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${i}-${j}`;
                if (solution.some(([row, col]) => row === i && col === j)) {
                    cell.classList.add('queen');
                }
                board.appendChild(cell);
            }
        }

        // Display success message
        const solutionDiv = document.getElementById('solution');
        solutionDiv.textContent = 'Solution Found!';
    } catch (error) {
        console.error('Error displaying solution:', error);
    }
}

// Function to display a message when no solution is found
function displayNoSolution() {
    try {
        const solutionDiv = document.getElementById('solution');
        solutionDiv.textContent = 'No solution found.';
    } catch (error) {
        console.error('Error displaying no solution message:', error);
    }
}

// Function to solve the puzzle when solve button is clicked
function solvePuzzle() {
    try {
        const solution = solve(); // Call the existing solve() function
        displaySolution(solution);
    } catch (error) {
        console.error('Error solving puzzle:', error);
    }
}

// Function to activate play mode
function activatePlayMode() {
    try {
        playMode = true;
        // Display a message to indicate play mode is activated
        const solutionDiv = document.getElementById('solution');
        solutionDiv.textContent = 'Play Mode Activated: Click on any cell to move a queen.';

        // Set a timeout to check if the puzzle is solved within 20 seconds
        setTimeout(() => {
            if (!puzzleSolved) {
                // Display a message indicating failure
                solutionDiv.textContent = 'Try again next time!';
            }
        }, 20000);
    } catch (error) {
        console.error('Error activating play mode:', error);
    }
}

// Function to handle cell clicks when in play mode
function handleCellClick(row, col) {
    try {
        if (playMode) {
            const cell = document.getElementById(`cell-${row}-${col}`);
            moveQueen(cell, row, col);
        }
    } catch (error) {
        console.error('Error handling cell click:', error);
    }
}

// Function to check if the puzzle is solved
function checkPuzzleSolved() {
    try {
        const solution = solve();
        if (queens.length === 8 && queens.every(([row, col]) => solution.some(([r, c]) => r === row && c === col))) {
            const solutionDiv = document.getElementById('solution');
            solutionDiv.textContent = 'Congratulations! You win!';
            playMode = false; // Disable play mode after solving the puzzle
            showRegistrationForm(); // Show the registration form
        }
    } catch (error) {
        console.error('Error checking puzzle solved:', error);
    }
}

// Modify the initialization of chessboard to include cell click handling
function initializeChessboard() {
    try {
        const board = document.getElementById('board');

        // Clear the board
        board.innerHTML = '';

        // Place queens on the board
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${i}-${j}`;
                if (queens.some(([row, col]) => row === i && col === j)) {
                    cell.classList.add('queen');
                }
                // Add event listener to handle cell clicks
                cell.addEventListener('click', () => handleCellClick(i, j));
                board.appendChild(cell);
            }
        }
    } catch (error) {
        console.error('Error initializing chessboard:', error);
    }
}

// Add an event listener to the play button
const playButton = document.getElementById('playButton');
playButton.addEventListener('click', activatePlayMode);

// Flag to indicate whether the game is in play mode
let playMode = false;

// Flag to indicate whether the puzzle is solved within the time limit
let puzzleSolved = false;

// Add an event listener to the solve button
const solveButton = document.getElementById('solveButton');
solveButton.addEventListener('click', solvePuzzle);

// Initialize the chessboard with queens placed at start
initializeChessboard();

// Function to show the registration form
function showRegistrationForm() {
    const registrationContainer = document.getElementById('registration-container');
    registrationContainer.style.display = 'block';
}