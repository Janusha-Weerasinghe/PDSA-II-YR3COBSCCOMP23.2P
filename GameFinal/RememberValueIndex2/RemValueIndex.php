<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include database connection code
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'game_database';

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Escape user inputs to prevent SQL injection
    $player_name = $conn->real_escape_string($_POST['player_name']);
    $answer1 = $conn->real_escape_string($_POST['index1']);
    $answer2 = $conn->real_escape_string($_POST['index2']);

    // Insert data into database
    $sql = "INSERT INTO game_results (player_name, answer1, answer2) VALUES ('$player_name', '$answer1', '$answer2')";
    if ($conn->query($sql) === TRUE) {
        echo "Records added successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $conn->close();
}
?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Remember the Value Index</title>
    <link rel="stylesheet" href="RemValueIndex.css" />
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Remember the Value Index</h1>
        <button id="startBtn" class="start-btn">Start Game</button>
      </div>
      <div id="game-board" class="game-board"></div>
      <div class="numbers-display" id="numbersDisplay"></div>
      <div id="input-section" class="input-section">
        <p id="instruction-text"></p>
        <div class="input-container">
          <input type="text" id="index1-input" placeholder="Enter index 1" />
          <input type="text" id="index2-input" placeholder="Enter index 2" />
          <button id="submit-btn">Submit</button>
        </div>
        <div id="message"></div>
      </div>
      <button id="restart-btn" class="restart-btn">Restart Game</button>
    </div>
    

    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <label for="nameInput">Enter your name:</label>
        <input type="text" id="nameInput" />
        <button onclick="addName()">Add Name</button>
        <button onclick="downloadJson()">Download Name List</button>
      </div>
    </div>

    <script src="RemValueIndex.js"></script>

  </body>
</html>