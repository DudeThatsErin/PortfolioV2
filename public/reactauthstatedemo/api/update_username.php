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
$input = file_get_contents("php://input");
error_log("Received input: " . $input);

if (!isset($data->currentUsername) || !isset($data->newUsername)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Missing required fields",
        "received" => $data
    ]);
    exit();
}

try {
    $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $checkStmt->execute([$data->newUsername]);
    if ($checkStmt->fetchColumn() > 0) {
        http_response_code(409);
        echo json_encode([
            "success" => false,
            "error" => "Username already exists"
        ]);
        exit();
    }

    $stmt = $pdo->prepare("UPDATE users SET username = ? WHERE username = ?");
    if ($stmt->execute([$data->newUsername, $data->currentUsername])) {
        echo json_encode([
            "success" => true,
            "message" => "Username updated successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Failed to update username"
        ]);
    }
} catch (PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database error"
    ]);
}
?>