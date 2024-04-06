
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
if(isset($_POST['submitButton'])) {
    // Extract and sanitize the name from the form
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);

    // Prepare and execute query to insert name into the database
    $stmt = $conn->prepare("INSERT INTO eightqueens_winner (name) VALUES (:name)");
    $stmt->bindParam(':name', $name);

    // Execute the query
    if($stmt->execute()) {
        $message = "Registration successful!";
    } else {
        $error_message = "Error: Registration failed.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eight Queens Puzzle</title>
  <link rel="stylesheet" href="EightQueens.css">
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
          <button id="playButton">Play</button>
        </div>
      </div>
      <div class="register-form">
        <h2>Register</h2>
        <form id="registrationForm" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required>
          <button type="submit" name="submitButton">Submit</button>
        </form>
      </div>
    </div>
  </div>
  <div id="solution"></div>
  <script src="EightQueens.js"></script>
</body>
</html>
