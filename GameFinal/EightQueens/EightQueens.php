
<?php
include('../MySqlDataBaseConnection.php');

// Check if playerName is set in the $_POST array
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $player_Name = $_POST['playerName'];
    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO eightqueens_winner (name) VALUES (?)");
    $stmt->bind_param("s", $player_Name);

    // Execute the prepared statement
    if ($stmt->execute()) {
        //echo "inserted successfully into the to the table.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // echo "playerName Not Found";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eight Queens Puzzle</title>
    <style>
        <?php include 'EightQueens.css'; ?>
    </style>
</head>
<body>
    <div class="container">
        <div class="game-container">
            <div class="game-content">
                <div class="topic-container">
                    <h1>Eight Queens Puzzle</h1>
                </div>
                <div class="board-container">
                    <div id="board"></div>
                </div>
                <div class="button-group">
                    <button id="solveButton">Solve</button>
                    <button onclick="resetGame()">Reset Game</button>
                    <!-- <button onclick="showRegistrationForm()">Cheat Game</button> -->
                    <button id="playButton">Play</button>
                </div>
            </div>
        </div>
        <div id="registration-container" style="display: none;">
            <h2>Registration</h2>
            <form class="registration-form" method="post" action="">
                <input type="text" name="playerName" placeholder="Enter your name">
                <button type="submit" name="registerButton">Register</button>
            </form>
        </div>
    </div>
    <div id="solution"></div>
    <script src="EightQueens.js"></script>
    <script>
        // Function to show the registration form
        function showRegistrationForm() {
            const registrationContainer = document.getElementById('registration-container');
            registrationContainer.style.display = 'block';
        }

        // Modify the checkPuzzleSolved function to show the registration form when the puzzle is solved
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
    </script>
</body>
</html>
