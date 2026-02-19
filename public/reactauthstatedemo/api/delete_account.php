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

    if (!isset($data->username)) {
        http_response_code(400);
        echo json_encode(["error" => "Username is required"]);
        exit();
    }

    $stmt = $pdo->prepare("DELETE FROM users WHERE username = ?");
    if ($stmt->execute([$data->username])) {
        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Account successfully deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Account not found"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete account"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
}
?>