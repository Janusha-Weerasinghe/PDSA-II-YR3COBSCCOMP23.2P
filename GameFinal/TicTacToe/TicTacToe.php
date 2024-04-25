<?php
include('../MySqlDataBaseConnection.php');

// Check if playerName is set in the $_POST array
if (isset($_POST['playerName'])) {
    $playerName = $_POST['playerName'];
    
    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO tic_tac_toe_winner (name) VALUES (?)");
    $stmt->bind_param("s", $playerName);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Player name '$playerName' inserted successfully into the winners table.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo "Player name not provided!";
}

// Close connection
$conn->close();
?>
