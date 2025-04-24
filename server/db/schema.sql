-- Create database
CREATE DATABASE IF NOT EXISTS laptop_tracking_system;
USE laptop_tracking_system;

-- Laptop table
CREATE TABLE IF NOT EXISTS Laptop (
  LaptopId VARCHAR(50) PRIMARY KEY,
  Brand VARCHAR(100) NOT NULL,
  Model VARCHAR(100) NOT NULL,
  SerialNumber VARCHAR(100) NOT NULL UNIQUE,
  PurchaseDate DATETIME
);

-- User table
CREATE TABLE IF NOT EXISTS User (
  UserId VARCHAR(50) PRIMARY KEY,
  FirstName VARCHAR(100) NOT NULL,
  LastName VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL UNIQUE,
  PhoneNumber VARCHAR(20)
);

-- Admin table
CREATE TABLE IF NOT EXISTS Admin (
  AdminId VARCHAR(50) PRIMARY KEY,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL
);

-- Transaction table
CREATE TABLE IF NOT EXISTS Transaction (
  TransactionId VARCHAR(50) PRIMARY KEY,
  UserId VARCHAR(50) NOT NULL,
  LaptopId VARCHAR(50) NOT NULL,
  BorrowDate DATETIME NOT NULL,
  ReturnDate DATETIME,
  FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE,
  FOREIGN KEY (LaptopId) REFERENCES Laptop(LaptopId) ON DELETE CASCADE
);

-- Alert table
CREATE TABLE IF NOT EXISTS Alert (
  AlertId VARCHAR(50) PRIMARY KEY,
  UserId VARCHAR(50) NOT NULL,
  Message TEXT NOT NULL,
  CreateDate DATETIME NOT NULL,
  Status VARCHAR(20) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE
);

-- ActivityLog table
CREATE TABLE IF NOT EXISTS ActivityLog (
  LogId VARCHAR(50) PRIMARY KEY,
  UserId VARCHAR(50) NOT NULL,
  AdminId VARCHAR(50) NOT NULL,
  ActivityDate DATETIME NOT NULL,
  ActivityType VARCHAR(100) NOT NULL,
  FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE,
  FOREIGN KEY (AdminId) REFERENCES Admin(AdminId) ON DELETE CASCADE
);

-- Create admin user
INSERT INTO Admin (AdminId, Username, Password)
VALUES ('ADM001', 'admin', '$2b$10$KpH5yAe.tNdBVjuF0njaWeQQLtZ8W41kWJgw4SxsKq9eJUjOYnv3O');
-- The password is 'admin123' (hashed) 