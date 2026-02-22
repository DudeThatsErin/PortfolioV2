<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

try {
    // Check if username exists
    $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $checkStmt->execute([$data->username]);
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        http_response_code(409);
        echo json_encode(["error" => "Username already exists"]);
        exit();
    }

    // Insert new user
    $hashedPassword = password_hash($data->password, PASSWORD_BCRYPT);
    $insertStmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    
    if ($insertStmt->execute([$data->username, $hashedPassword])) {
        http_response_code(200);
        echo json_encode(["message" => "Registration successful"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Registration failed"]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>