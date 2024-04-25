<?php
include('../MySqlDataBaseConnection.php');

try{
    if (isset($_POST['playerName'])) {
        $player_name = $_POST['playerName'];
        $answer = $_POST['correctAnswer'];
    
        echo $player_name;
        echo $answer;
    
        // Initialize variable to store last row number
        $lastRowNumber = null;
    
        // Prepare and execute SQL query to select the last row number in another table
        $sql = "SELECT sessionId FROM predict_value_search_time ORDER BY sessionId DESC LIMIT 1"; // Assuming 'id' is the primary key column
        $result = $conn->query($sql);
    
        // Check if any rows are returned
        if ($result->num_rows > 0) {
            // Retrieve the last row number
            $row = $result->fetch_assoc();
            $lastRowNumber = $row["sessionId"];
            echo $lastRowNumber;
        } else {
            echo "No rows found in another table";
        }
      
        // Prepare and bind the SQL statement
        $stmt = $conn->prepare("INSERT INTO predict_value_winner (player_name,correct_answer,time_id) VALUES (?,?,?)");
        $stmt->bind_param("ssi",$player_name,$answer,$lastRowNumber); // corrected from $stmtPlayer->bind_param
      
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
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>
