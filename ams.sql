-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 05, 2020 at 12:29 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams`
--

-- --------------------------------------------------------

--
-- Table structure for table `majors`
--

CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `major_code` varchar(3) NOT NULL,
  `major_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `majors`
--

INSERT INTO `majors` (`id`, `major_code`, `major_name`) VALUES
(1, 'a', 'Akuntansi dan Keuangan Lembaga'),
(2, 'b', 'Otomatisasi Tata Kelola Perkantoran'),
(3, 'c', 'Rekayasa Perangkat Lunak'),
(4, 'd', 'Bisnis Daring Pemasaran');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nisn` char(5) NOT NULL,
  `class` varchar(3) NOT NULL,
  `major_code` varchar(3) NOT NULL,
  `birth_place` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `nisn`, `class`, `major_code`, `birth_place`, `birthday`, `photo`) VALUES
(7, 'Fadhil Rabbani', '10258', 'XII', 'c', 'Jakarta', '2002-05-08', '10258-1599983598344.jpg'),
(8, 'Ramadhanu', '10263', 'XII', 'c', 'Riau', '2001-02-22', '10263-1599983634479.jpg'),
(9, 'Yazid Ammirullah', '10270', 'XII', 'c', 'Jakarta', '2001-08-03', '10270-1599983678782.jpg'),
(11, 'Rizki Ramadhan', '10266', 'XII', 'c', 'Jakarta', '2002-11-26', '10266-1600065823056.jpg'),
(12, 'Fadhli Fadhilah', '10246', 'XII', 'c', 'Jambi', '2002-02-20', '10246-1600065888986.jpg'),
(13, 'Reza Safputra', '10264', 'XII', 'c', 'Padang', '2002-10-05', '10264-1600065966227.jpg'),
(14, 'Muhammad Akbar Habibie Khalid', '10256', 'XII', 'c', 'Jakarta', '2001-05-02', '10256-1600066034650.jpg'),
(16, 'Ahmad Saugi', '14250', 'XI', 'c', 'Jakarta', '2001-09-13', 'IMG-20200923-WA0036-1600836148132.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `username`, `email`, `photo`, `password`) VALUES
(8, 'Matthew Kormasela', 'admin12', 'admin12@smkn12jkt.com', '20200825_094916-removebg-preview-1599983266273.png', '$2a$08$DYeQCUiRJnpKTw/EastC/.1VKiKBOBiwcNgS9MwIh39KTB4jbTEui'),
(10, 'Tessalonika', 'tessa12', 'tessa@smkn12jkt.com', 'IMG-20200923-WA0034-1600836053850.jpg', '$2a$08$/F4REeYDPUU88nEMX8tBpu25OmPryL1/2LWbV1t8pDHuezOKTm4m2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`major_code`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nisn` (`nisn`),
  ADD KEY `major_code` (`major_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `photo` (`photo`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `majors`
--
ALTER TABLE `majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`major_code`) REFERENCES `majors` (`major_code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
