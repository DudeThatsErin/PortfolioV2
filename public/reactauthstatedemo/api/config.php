<?php
$host = "localhost";
$dbname = "u861884483_reactAuthDemo";
$username = "u861884483_iraDogAuth";
$password = "Tessie5567!";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
