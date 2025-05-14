<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../users/login.php");
    exit;
}

include '../users/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = 'user'; // tetap user

    // Cek apakah username sudah ada
    $check = $conn->query("SELECT * FROM users WHERE username = '$username'");
    if ($check->num_rows > 0) {
        $error = "Username sudah terdaftar!";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (username, password, role, created_at) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("sss", $username, $password, $role);
        if ($stmt->execute()) {
           header("Location: kelolaPengguna.php");
            exit;
        } else {
            $error = "Gagal menambahkan user.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Add User - Admin</title>
  <link rel="stylesheet" href="../cssAdmin/style.css" />
</head>
<body>
  <!-- Mobile Toggle -->
  <div class="toggle-btn" id="toggleBtn">☰</div>

  <!-- Sidebar -->
  <nav class="sidebar" id="sidebar">
    <header>SnapZone.</header>
    <ul>
      <li><a href="admin.php">Dashboard</a></li>
      <li><a href="kelolaPengguna.php">Manage Users</a></li>
      <li><a href="#">Manage Gallery</a></li>
      <li><a href="editHome.php">Edit Home</a></li>
      <li><a href="#">Manage SnapSpot</a></li>
      <li><a href="editAbout.php">Edit About</a></li>
      <li><a href="#">Manage Contact US</a></li>
      <li><a href="logout.php">Logout</a></li>
    </ul>
  </nav>
    <div class="dashboard-container">
    <h1>Add New User</h1>

    <?php if (isset($error)): ?>
        <p style="color: red;"><?= $error ?></p>
    <?php elseif (isset($success)): ?>
        <p style="color: green;"><?= $success ?></p>
    <?php endif; ?>

    <form method="POST" class="form-container">
        <label>Username:</label><br>
        <input type="text" name="username" required><br><br>

        <label>Password:</label><br>
        <input type="password" name="password" required><br><br>

        <button type="submit">Add User</button>
        <a href="kelolaPengguna.php" style="margin-left: 10px;">Back</a>
    </form>
    </div>
    

  <script>
    // Toggle sidebar on mobile
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  </script>
</body>
</html>
