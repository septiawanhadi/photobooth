<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] != 'admin') {
    header("Location: ../user/login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Responsive Admin Page</title>
  <link rel="stylesheet" href="../cssAdmin/style.css" />
</head>
<body>
  <!-- Mobile Toggle -->
  <div class="toggle-btn" id="toggleBtn">☰</div>

  <!-- Sidebar -->
  <nav class="sidebar" id="sidebar">
    <header>Selamat Datang, <?php echo $_SESSION['username']; ?>!</header>
    <ul>
<li><a href="admin.php">Dashboard</a></li>
      <li><a href="kelolaPengguna.php">Manage Users</a></li>
      <li><a href="#">Manage Gallery</a></li>
      <li><a href="#">Manage SnapSpot</a></li>
      <li><a href="#">Manage Contact US</a></li>
      <li><a href="logout.php">Logout</a></li>
    </ul>
  </nav>

  <!-- Main Content -->
  <section class="main-content">
    <h1>Ceritanya Admin Panel</h1>
    <p>Navbar nya di ganti pake sidebar yakk</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae fugiat sunt esse. Sapiente, ab perferendis. Laudantium sit exercitationem vel, minus, amet blanditiis consectetur libero tenetur asperiores tempore assumenda corrupti vero.</p>
    <!-- Add your dashboard widgets or content here -->
  </section>

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
