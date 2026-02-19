<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(base64_decode($_GET["token"]));

if ($data->exp > time()) {
    echo json_encode(["valid" => true, "user" => $data]);
} else {
    echo json_encode(["valid" => false]);
}
?>
