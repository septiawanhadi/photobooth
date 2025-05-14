<?php
include 'koneksi.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
    // Role selalu user
    $role = 'user';

    // Cek apakah username sudah digunakan
    $check = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $check->bind_param("s", $username);
    $check->execute();
    $checkResult = $check->get_result();

    if ($checkResult->num_rows > 0) {
        echo "<script>alert('Username already taken.'); window.history.back();</script>";
        exit;
    }

    // Insert user baru
    $sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $password, $role);

    if ($stmt->execute()) {
        echo "<script>alert('Registration successful. Please login.'); window.location.href='login.php';</script>";
    } else {
        echo "<script>alert('Registration failed.'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
