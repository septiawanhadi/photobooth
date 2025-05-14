<?php
include 'koneksi.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                $_SESSION['username'] = $row['username'];
                $_SESSION['role'] = $row['role']; 

                if ($row['role'] == 'admin') {
                    echo "<script>alert('Welcome Admin!'); window.location.href='../admin/admin.php';</script>";
                } else if ($row['role'] == 'user') {
                    echo "<script>alert('Login successful! Welcome User.'); window.location.href='home.php';</script>";
                } else {
                    echo "<script>alert('Unknown role. Access denied.'); window.history.back();</script>";
                }
            } else {
                echo "<script>alert('Incorrect password. Please try again.'); window.history.back();</script>";
            }
        } else {
            echo "<script>alert('Username not found. Please register first.'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('Failed to prepare statement.'); window.history.back();</script>";
    }
}
?>
