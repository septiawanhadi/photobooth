-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Bulan Mei 2025 pada 13.13
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photobooth_snapzone`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `password`, `created_at`, `role`) VALUES
(1, 'Dyna', 'Nabilah Wiaam', 'nabilbil', '$2y$10$dsoS9Mzn1.NaB294HLdUgOg8VTgm.uhdxV/FRNOkv8DKoxdOiLCwa', '2025-04-25 10:29:18', 'user'),
(2, 'Restu', 'Utami', 'restutea', '$2y$10$j2IO4roBjQzRt20s.apnOu4cKpHR4.9Rt0rnERiJkYhO9ka2LueQS', '2025-04-25 10:32:00', 'user'),
(3, 'Septiawan', 'Hadi Prasetyo', 'septiawan', '$2y$10$b5TtWAllw.bRBVxFlyjQg.tX18jpYI8oxrUW4oDEDhgNuwV1lVujq', '2025-04-29 02:30:01', 'user'),
(4, 'admin', '1', 'admin', '$2y$10$wQfaYrUtNEPTHCLzeV1ceuUelHe9vKwSLf.1hzD2I5wSNfU6jBNO6', '2025-04-30 05:59:49', 'user'),
(5, 'laras', 'januapuspa', 'ayaseu', '$2y$10$v0mYKQU85ZpPuqD9D/gYQeIMVkxM9of.TabzHcsImDBXNfsPlVv6G', '2025-04-30 06:04:13', 'user');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
