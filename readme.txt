========== Read Me ==========

1. Create Database
CREATE DATABASE ams CHARACTER SET utf8 COLLATE utf8_general_ci;

2. Create Users Table
CREATE TABLE users(
	id int AUTO_INCREMENT UNIQUE PRIMARY KEY,
	full_name varchar(255) NOT NULL,
	username varchar(255) NOT NULL UNIQUE,
	email varchar(255) NOT NULL UNIQUE,
	photo varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL UNIQUE
);

3. CREATE majors Table
CREATE TABLE majors(
	id int AUTO_INCREMENT NOT NULL UNIQUE,
	major_code varchar(3) NOT NULL PRIMARY KEY,
	major_name varchar(255) NOT NULL
);

3. Insert data majors
INSERT INTO majors VALUES(null, 'a', 'Akuntansi dan Keuangan Lembaga'),(null, 'b', 'Otomatisasi Tata Kelola Perkantoran'),(null, 'c', 'Rekayasa Perangkat Lunak'),(null, 'd', 'Bisnis Daring Pemasaran');

4. Create students Table
CREATE TABLE students(
	id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	name varchar(255) NOT NULL,
	nisn char(5) NOT NULL UNIQUE,
	class varchar(3) NOT NULL,
	major_code varchar(3) NOT NULL,
	birth_place varchar(255) NOT NULL,
	birthday date NOT NULL,
	photo varchar(255) NOT NULL
);

