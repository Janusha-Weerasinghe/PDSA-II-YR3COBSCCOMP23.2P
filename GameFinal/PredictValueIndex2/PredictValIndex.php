<?php

include('../MySqlDataBaseConnection.php');

try{
    // Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $binary_time = $_POST['binary'];
    $jump_time = $_POST['jump'];
    $exponential_time = $_POST['exponential'];
    $fibonacci_time = $_POST['fibonacci'];
     	 	 	 	
    // Prepare SQL statement to insert data into database
    $stmt = $conn->prepare("INSERT INTO predict_value_search_time (binary_search_time, jump_search_time,exponential_search_time,fibonacci_search_time) VALUES (?, ?, ?,?)");
    
    // Check if the statement is prepared successfully
    if ($stmt === FALSE) {
        die("Error: " . $conn->error);
    }

    // Bind parameters
    $stmt->bind_param("ssss", $binary_time, $jump_time, $exponential_time, $fibonacci_time);

    // Execute the prepared statement
    if ($stmt->execute() === TRUE) {
        echo "Record added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
}

// Close connection
$conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>
