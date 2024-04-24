<?php
include('../MySqlDataBaseConnection.php');
if (isset($_POST['playerName'])) {
    $player_name = $_POST['playerName'];
    $first_number = $_POST['firstnumber'];
    $second_number = $_POST['secondnumber'];

    echo $player_name;
    echo $first_number;
    echo $second_number;

    // Initialize variable to store last row number
    $lastRowNumber = null;

    // Prepare and execute SQL query to select the last row number in another table
    $sql = "SELECT id FROM remember_values_sort_time ORDER BY id DESC LIMIT 1"; // Assuming 'id' is the primary key column
    $result = $conn->query($sql);

    // Check if any rows are returned
    if ($result->num_rows > 0) {
        // Retrieve the last row number
        $row = $result->fetch_assoc();
        $lastRowNumber = $row["id"];
        echo $lastRowNumber;
    } else {
        echo "No rows found in another table";
    }
  
    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO remember_values_winner (first_number,second_number,name,time_id) VALUES (?,?,?,?)");
    $stmt->bind_param("sssi",$first_number,$second_number, $player_name, $lastRowNumber); // corrected from $stmtPlayer->bind_param
  
    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Name inserted successfully into the winner table.";
    } else {
        echo "Error: " . $stmt->error;
    }
  
    // Close the prepared statement
    $stmt->close();
  } else {
    echo "Name not provided!";
  }
  
  // Close connection
  $conn->close();
?>
