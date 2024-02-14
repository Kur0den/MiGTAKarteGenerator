CREATE DATABASE migtaKarte;
USE migtaKarte;

-- テーブル作成

CREATE Table doctor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
);

CREATE Table user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(16) NOT NULL,
    kana VARCHAR(32) NOT NULL,
);


CREATE USER 'migta-karte'@'api' IDENTIFIED BY '${MYSQL_USER_PASSWORD}';
GRANT ALL PRIVILEGES ON *.* TO 'migta-karte'@'api';
