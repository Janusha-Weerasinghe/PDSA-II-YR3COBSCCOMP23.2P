<?php
// Database connection parameters
$db_host = 'localhost';
$db_name = 'game_database'; // Update the database name here
$db_user = 'root';
$db_password = '';

// Establish a connection to the database
try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if the form is submitted
if(isset($_POST['playerName'])) {
    // Extract and sanitize the player's name from the form
    $playerName = filter_var($_POST['playerName'], FILTER_SANITIZE_STRING);

    // Prepare and execute query to insert player's name into the database
    $stmt = $conn->prepare("INSERT INTO tic_tac_toe_winner (name) VALUES (:name)");
    $stmt->bindParam(':name', $playerName);

    // Execute the query
    if($stmt->execute()) {
        $message = "Player name stored successfully!";
    } else {
        $error_message = "Error: Failed to store player name.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="TicTacToe.css">
</head>
<body>
    <div class="container">
        <h1>Tic Tac Toe</h1>
        
        <div class="board" id="board">
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
            <div class="cell" data-cell></div>
        </div>
        <div class="message" id="message"></div>
        <button class="restart-btn" id="restartBtn">Restart</button>
    </div>
    <script src="TicTacToe.js"></script>
</body>
</html>
