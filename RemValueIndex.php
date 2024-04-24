<?php
include('../MySqlDataBaseConnection.php');

// Check if playerName is set in the $_POST array
if (isset($_POST['bubble']) && isset($_POST['insertion']) && isset($_POST['merge'])&& isset($_POST['radix'])&& isset($_POST['shell'])&& isset($_POST['quick'])) {
    $bubble_sort = $_POST['bubble'];
    $insertion_sort = $_POST['insertion'];
    $merge_sort = $_POST['merge'];
    $radix_sort = $_POST['radix'];
    $shell_sort = $_POST['shell'];
    $quick_sort = $_POST['quick'];

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO remember_values_sort_time (bubble_sort,insertion_sort,merge_sort,radix_sort,shell_sort,quick_sort) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $bubble_sort,$insertion_sort,$merge_sort,$radix_sort,$shell_sort,$quick_sort);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Sorting Times inserted successfully into the sort data to the table.";
        $lastInsertedId = $conn->insert_id;
        echo "Last inserted ID: $lastInsertedId";

    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo "Time not provided!";
}



?>



