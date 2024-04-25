<?php 
$ServserName = "127.0.0.1:3308";
$UserName = "root";
$Password = "";
$DataBase = "game_database";

$conn = new mysqli($ServserName,$UserName,$Password,$DataBase);
if($conn->connect_error)
{die("Connection Failed : ".$conn->connect_error);}
?>