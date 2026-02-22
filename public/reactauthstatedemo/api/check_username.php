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

if (!isset($data->username)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Username is required"
    ]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->execute([$data->username]);
    $exists = $stmt->fetchColumn() > 0;

    echo json_encode([
        "success" => true,
        "exists" => $exists
    ]);
} catch (PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database error"
    ]);
}
?>