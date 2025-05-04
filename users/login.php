<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/style.css">
    <title>Login</title>
</head>
<body>
<div class="login-page">
<div class="login-container">
    <form class="login-form" action="process_login.php" method="POST">
      <h2>SnapZone-Login</h2>
      <p class="subtext">Welcome back! Please enter your credentials.</p>
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <select name="role" required>
        <option value="">Login as...</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button type="submit" class="btn-login">Login Now</button>
      <p class="register-link">Don't have an account? <a href="register.php">Register here</a></p>
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
