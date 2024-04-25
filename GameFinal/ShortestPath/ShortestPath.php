<?php

include('../MySqlDataBaseConnection.php');

// Check if the data is received from the AJAX request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    
    $PlayerName = $_POST['Player_name'];
    $answer1 = $_POST['answer1'];
    $answer2 = $_POST['answer2'];
    $answer3 = $_POST['answer3'];
    $answer4 = $_POST['answer4'];
    $answer5 = $_POST['answer5'];
    $answer6 = $_POST['answer6'];
    $answer7 = $_POST['answer7'];
    $answer8 = $_POST['answer8'];
    $answer9 = $_POST['answer9'];
    $answer10 = $_POST['answer10'];
    $timetaken = $_POST['time_taken'];
    // // Extract and sanitize the player's name from the request
    // $playerName = filter_var($_POST['playerName'], FILTER_SANITIZE_STRING);
    // $answers = json_decode($_POST['answers']); // Decoding JSON string to array    
    echo $PlayerName;
    
    // Prepare and execute the SQL query to insert the player's name, winner's name, answers, and time taken into the database
    $stmt = $conn->prepare("INSERT INTO city_distance_winner (PlayerName, Answer1, Answer2, Answer3, Answer4, Answer5, Answer6, Answer7, Answer8, Answer9, Answer10, timetaken) 
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
    $stmt->bind_param('ssssssssssss', $PlayerName,$answer1,$answer2,$answer3,$answer4,$answer5,$answer6,$answer7,$answer8,$answer9,$answer10,$timetaken);
    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Distance inserted successfully into the table.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo "Error";
}
?>




