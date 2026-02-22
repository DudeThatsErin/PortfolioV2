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
error_log("Received data: " . print_r($data, true));

if (!isset($data->username) || !isset($data->newPassword)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Username and new password are required"
    ]);
    exit();
}

try {
    // First check if user exists
    $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $checkStmt->execute([$data->username]);
    $user = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "error" => "User not found"
        ]);
        exit();
    }

    // Update password
    $hashedPassword = password_hash($data->newPassword, PASSWORD_DEFAULT);
    $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
    $result = $updateStmt->execute([$hashedPassword, $data->username]);

    if ($result) {
        error_log("Password updated successfully for user: " . $data->username);
        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully"
        ]);
    } else {
        error_log("Failed to update password for user: " . $data->username);
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Failed to update password"
        ]);
    }
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database error: " . $e->getMessage()
    ]);
}
?>