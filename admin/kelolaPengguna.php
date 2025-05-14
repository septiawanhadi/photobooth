<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] !== 'admin') {
    header("Location: ../users/login.php");
    exit;
}

include '../users/koneksi.php';

// Hapus user jika diminta
if (isset($_GET['hapus'])) {
    $id = intval($_GET['hapus']);
    $conn->query("DELETE FROM users WHERE id = $id AND role = 'user'");
    header("Location: kelolaPengguna.php");
    exit;
}

// Ambil semua user (bukan admin)
$result = $conn->query("SELECT id, username, created_at FROM users WHERE role = 'user' ORDER BY created_at DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manage User - Admin</title>
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
      <li><a href="#">Manage SnapSpot</a></li>
      <li><a href="#">Manage Contact US</a></li>
      <li><a href="logout.php">Logout</a></li>
    </ul>
  </nav>

    <div class="dashboard-container">
        <h1>Manage Users</h1>
        <a href="tambahUser.php" class="btn-add">+ Add User</a>
        <table class="user-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Terdaftar Sejak</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $no = 1;
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>{$no}</td>
                            <td>{$row['username']}</td>
                            <td>{$row['created_at']}</td>
                            <td><a href='kelolaPengguna.php?hapus={$row['id']}' onclick=\"return confirm('Hapus user ini?');\">Hapus</a></td>
                          </tr>";
                    $no++;
                }
                ?>
            </tbody>
        </table>
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
