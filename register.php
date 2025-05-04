<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (first_name, last_name, username, password) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $first_name, $last_name, $username, $hashed_password);

    if ($stmt->execute()) {
        echo "Registration successful. <a href='login.php'>Login here</a>";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
    <title>Register</title>
</head>
<body>
<div class="register-page">
<div class="register-container">
    <form class="register-form" action="process_register.php" method="POST">
      <h2>SnapZone-Register</h2>
      <p class="subtext">Create your account. It's free and only takes a minute.</p>

      <div class="input-group">
        <input type="text" name="first_name" placeholder="First Name" required>
        <input type="text" name="last_name" placeholder="Last Name" required>
      </div>

      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <input type="password" name="confirm_password" placeholder="Confirm Password" required>

      <div class="checkbox-group">
        <input type="checkbox" id="terms" required>
        <label for="terms">I accept the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>.</label>
      </div>

      <button type="submit" class="btn-register">Register Now</button>

      <p class="login-link">Already have an account? <a href="login.php">Sign in</a></p>
    </form>
  </div>
  </div>
  <script>
    const hamburger = document.getElementById('hamburger');
   const menu = document.getElementById('menu');
   hamburger.addEventListener('click', function() {
     menu.classList.toggle('active');
   });
</body>
</html>
