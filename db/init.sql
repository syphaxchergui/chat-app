CREATE DATABASE IF NOT EXISTS chat_app_db ;

USE chat_app_db;

-- DROP TABLE IF EXISTS users;

-- CREATE TABLE `users` (
--   `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `username` varchar(255) NOT NULL,
--   `online` tinyint NOT NULL DEFAULT '0',
--   `password` varchar(255) NOT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `username` (`username`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- DROP TABLE IF EXISTS messages;

-- CREATE TABLE `messages` (
--   `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `text` varchar(255) NOT NULL,
--   `file` varchar(255) DEFAULT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   `sender` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `sender` (`sender`),
--   CONSTRAINT `messages_ibfk_1001` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- DROP TABLE IF EXISTS privatemessages;

-- CREATE TABLE `privatemessages` (
--   `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
--   `text` varchar(255) NOT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL,
--   `sender` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
--   `receiver` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
--   PRIMARY KEY (`id`),
--   KEY `sender` (`sender`),
--   KEY `receiver` (`receiver`),
--   CONSTRAINT `privatemessages_ibfk_1001` FOREIGN KEY (`sender`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
--   CONSTRAINT `privatemessages_ibfk_2002` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;