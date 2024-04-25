-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 25, 2024 at 08:36 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `city_distance_winner`
--

DROP TABLE IF EXISTS `city_distance_winner`;
CREATE TABLE IF NOT EXISTS `city_distance_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerName` varchar(255) NOT NULL,
  `Answer1` varchar(3) DEFAULT NULL,
  `Answer2` varchar(3) DEFAULT NULL,
  `Answer3` varchar(3) DEFAULT NULL,
  `Answer4` varchar(3) DEFAULT NULL,
  `Answer5` varchar(3) DEFAULT NULL,
  `Answer6` varchar(3) DEFAULT NULL,
  `Answer7` varchar(3) DEFAULT NULL,
  `Answer8` varchar(3) DEFAULT NULL,
  `Answer9` varchar(3) DEFAULT NULL,
  `Answer10` varchar(3) DEFAULT NULL,
  `timetaken` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city_distance_winner`
--

INSERT INTO `city_distance_winner` (`id`, `PlayerName`, `Answer1`, `Answer2`, `Answer3`, `Answer4`, `Answer5`, `Answer6`, `Answer7`, `Answer8`, `Answer9`, `Answer10`, `timetaken`) VALUES
(1, 'Megan', '0', '48', '44', '7', '14', '31', '36', '14', '23', '17', NULL),
(2, 'Richard', '0', '6', '36', '9', '30', '43', '11', '9', '42', '29', NULL),
(3, 'asdsds', '0', '11', '40', '27', '27', '40', '25', '41', '38', '23', '12'),
(4, 'janusha', '0', '13', '41', '16', '46', '15', '16', '14', '46', '49', '12'),
(5, 'erszffddsfdfsdf', '0', '8', '11', '17', '9', '21', '44', '36', '38', '11', '12'),
(6, 'asd', '0', '9', '18', '28', '45', '13', '13', '37', '21', '25', '12'),
(7, 'zui', '0', '22', '16', '11', '36', '8', '6', '23', '49', '19', '12');

-- --------------------------------------------------------

--
-- Table structure for table `eightqueens_winner`
--

DROP TABLE IF EXISTS `eightqueens_winner`;
CREATE TABLE IF NOT EXISTS `eightqueens_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eightqueens_winner`
--

INSERT INTO `eightqueens_winner` (`id`, `name`) VALUES
(1, 'yesh'),
(2, 'tina'),
(3, 'malini'),
(4, 'Chala'),
(5, 'sefdfds'),
(6, 'ewer'),
(7, 'ayeshaa'),
(8, 'amare'),
(9, 'namziya'),
(10, 'namziya'),
(11, 'namziya');

-- --------------------------------------------------------

--
-- Table structure for table `predict_value_search_time`
--

DROP TABLE IF EXISTS `predict_value_search_time`;
CREATE TABLE IF NOT EXISTS `predict_value_search_time` (
  `sessionId` int(11) NOT NULL AUTO_INCREMENT,
  `binary_search_time` int(11) DEFAULT NULL,
  `jump_search_time` int(11) DEFAULT NULL,
  `exponential_search_time` int(11) DEFAULT NULL,
  `fibonacci_search_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`sessionId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predict_value_search_time`
--

INSERT INTO `predict_value_search_time` (`sessionId`, `binary_search_time`, `jump_search_time`, `exponential_search_time`, `fibonacci_search_time`) VALUES
(1, 50, 60, 70, 80),
(2, 40, 55, 65, 75),
(3, 0, 0, 0, 0),
(4, 0, 0, 0, 0),
(5, 0, 0, 0, 0),
(6, 0, 0, 0, 0),
(7, 0, 0, 0, 0),
(8, 0, 0, 0, 0),
(9, 0, 0, 0, 0),
(10, 0, 0, 0, 0),
(11, 0, 0, 0, 0),
(12, 0, 0, 0, 0),
(13, 0, 0, 0, 0),
(14, 0, 0, 0, 0),
(15, 0, 0, 0, 0),
(16, 0, 0, 0, 0),
(17, 0, 0, 0, 0),
(18, 0, 0, 0, 0),
(19, 0, 0, 0, 0),
(20, 0, 0, 0, 0),
(21, 0, 0, 0, 0),
(22, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `predict_value_winner`
--

DROP TABLE IF EXISTS `predict_value_winner`;
CREATE TABLE IF NOT EXISTS `predict_value_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_name` varchar(100) DEFAULT NULL,
  `correct_answer` int(11) DEFAULT NULL,
  `time_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pv_st_time` (`time_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predict_value_winner`
--

INSERT INTO `predict_value_winner` (`id`, `player_name`, `correct_answer`, `time_id`) VALUES
(1, 'sapumal', 1, 1),
(2, 'rajapakshamr', 0, 2),
(3, 'Jamzi', 3025, 16),
(4, 'janusha', 2818, 22);

-- --------------------------------------------------------

--
-- Table structure for table `remember_values_sort_time`
--

DROP TABLE IF EXISTS `remember_values_sort_time`;
CREATE TABLE IF NOT EXISTS `remember_values_sort_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bubble_sort` int(5) NOT NULL,
  `insertion_sort` int(5) NOT NULL,
  `merge_sort` int(5) NOT NULL,
  `radix_sort` int(5) NOT NULL,
  `shell_sort` int(5) NOT NULL,
  `quick_sort` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `remember_values_sort_time`
--

INSERT INTO `remember_values_sort_time` (`id`, `bubble_sort`, `insertion_sort`, `merge_sort`, `radix_sort`, `shell_sort`, `quick_sort`) VALUES
(1, 342, 21, 3, 3, 2, 4),
(2, 322, 23, 3, 3, 2, 3),
(3, 327, 23, 2, 4, 2, 4),
(4, 412, 24, 3, 5, 1, 4),
(5, 243, 22, 2, 2, 1, 3),
(6, 235, 21, 3, 3, 1, 3),
(7, 233, 23, 3, 3, 1, 3),
(8, 245, 17, 2, 3, 1, 3),
(9, 237, 24, 3, 3, 0, 2),
(10, 244, 17, 3, 3, 2, 4),
(11, 234, 21, 3, 3, 2, 4),
(12, 246, 26, 5, 4, 1, 5),
(13, 248, 24, 2, 4, 1, 3),
(14, 245, 24, 4, 4, 1, 4),
(15, 233, 16, 2, 3, 1, 3),
(16, 246, 29, 3, 5, 1, 4),
(17, 243, 21, 2, 4, 1, 3),
(18, 261, 26, 3, 4, 2, 4),
(19, 236, 22, 4, 3, 1, 3),
(20, 239, 21, 3, 3, 1, 3),
(21, 239, 17, 2, 4, 2, 3),
(22, 309, 24, 3, 4, 2, 4),
(23, 252, 22, 3, 4, 1, 3),
(24, 232, 24, 3, 3, 1, 2),
(25, 233, 22, 3, 4, 0, 4),
(26, 267, 23, 2, 3, 1, 4),
(27, 221, 21, 3, 3, 1, 4),
(28, 243, 21, 3, 3, 1, 4),
(29, 220, 23, 2, 3, 1, 4),
(30, 265, 17, 5, 5, 2, 4),
(31, 242, 16, 2, 3, 1, 3),
(32, 215, 19, 2, 2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `remember_values_winner`
--

DROP TABLE IF EXISTS `remember_values_winner`;
CREATE TABLE IF NOT EXISTS `remember_values_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_number` int(5) NOT NULL,
  `second_number` int(5) NOT NULL,
  `name` char(20) NOT NULL,
  `time_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rv_st_time` (`time_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `remember_values_winner`
--

INSERT INTO `remember_values_winner` (`id`, `first_number`, `second_number`, `name`, `time_id`) VALUES
(1, 874, 2304, 'amal', 4),
(2, 1, 11, 'nimnaz', 17),
(3, 14, 1, 'sumi', 19),
(4, 1, 9, 'zumi2', 23),
(5, 14, 0, 'naziha', 26),
(6, 5, 8, 'Chalz', 31),
(7, 9, 15, 'janusha', 32);

-- --------------------------------------------------------

--
-- Table structure for table `tic_tac_toe_winner`
--

DROP TABLE IF EXISTS `tic_tac_toe_winner`;
CREATE TABLE IF NOT EXISTS `tic_tac_toe_winner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tic_tac_toe_winner`
--

INSERT INTO `tic_tac_toe_winner` (`id`, `name`) VALUES
(1, 'rina'),
(2, 'tory'),
(4, 'aaas'),
(5, 'asalm'),
(6, 'Lathif'),
(7, 'nazeeha');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `predict_value_winner`
--
ALTER TABLE `predict_value_winner`
  ADD CONSTRAINT `fk_pv_st_time` FOREIGN KEY (`time_id`) REFERENCES `predict_value_search_time` (`sessionId`);

--
-- Constraints for table `remember_values_winner`
--
ALTER TABLE `remember_values_winner`
  ADD CONSTRAINT `fk_time` FOREIGN KEY (`time_id`) REFERENCES `remember_values_sort_time` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
