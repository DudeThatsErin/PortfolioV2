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

try {
    $data = json_decode(file_get_contents("php://input"));

    if (!isset($data->username) || !isset($data->currentPassword) || !isset($data->newPassword)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Missing required fields"]);
        exit();
    }

    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$data->username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($data->currentPassword, $user['password'])) {
        http_response_code(401);
        echo json_encode(["success" => false, "error" => "Current password is incorrect"]);
        exit();
    }

    $hashedPassword = password_hash($data->newPassword, PASSWORD_BCRYPT);
    $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
    
    if ($updateStmt->execute([$hashedPassword, $data->username])) {
        echo json_encode(["success" => true, "message" => "Password updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "error" => "Failed to update password"]);
    }
} catch (PDOException $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database error"]);
}
?>