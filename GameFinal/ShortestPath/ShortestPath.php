<?php
// Database connection parameters
$db_host = 'localhost';
$db_name = 'game_database'; // Your database name
$db_user = 'root'; // Your database username
$db_password = ''; // Your database password (if any)

// Establish a connection to the database
try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if the data is received from the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract and sanitize the player's name from the request
    $playerName = filter_var($_POST['playerName'], FILTER_SANITIZE_STRING);
    // Extract and sanitize the answers from the request
    $answers = json_decode($_POST['answers']); // Decoding JSON string to array

    // Prepare and execute the SQL query to insert the player's name and answers into the database
    $stmt = $conn->prepare("INSERT INTO city_distance_winner (PlayerName, Answer1, Answer2, Answer3, Answer4, Answer5, Answer6, Answer7, Answer8, Answer9, Answer10) 
                            VALUES (:playerName, :answer1, :answer2, :answer3, :answer4, :answer5, :answer6, :answer7, :answer8, :answer9, :answer10)");
    $stmt->bindParam(':playerName', $playerName);
    for ($i = 0; $i < 10; $i++) {
        $stmt->bindParam(":answer" . ($i + 1), $answers[$i]);
    }

    // Execute the query
    if ($stmt->execute()) {
        http_response_code(200); // OK
    } else {
        http_response_code(500); // Internal Server Error
        echo "Error: Failed to insert player's data into the database.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>City Distance Game</title>
    <link rel="stylesheet" href="ShortestPath.css">
</head>
<body>
    <div id="gameContainer" style="display:none;">
        <h2>City Distance Game</h2>
        <p>Welcome <span id="playerName"></span>! Find the shortest distance between one city and all other cities.</p>
        <div id="distanceTable"></div>
        <label for="startCityInput">Start City:</label>
        <select id="startCityInput">
            <option value="" disabled selected>Select city</option>
        </select>
        <label for="endCityInputs">End City Distances:</label>
        <div id="endCityInputs">
            <!-- Input fields for end city distances will be dynamically added here -->
        </div>
        <button onclick="checkDistances()">Check Distances</button>
        <div id="results"></div>
    </div>

    <script src="ShortestPath.js"></script>
</body>
</html>
