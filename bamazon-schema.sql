-- DROP DATABASE IF EXISTS bamazon_DB;
-- CREATE DATABASE bamazon_DB;

-- USE bamazon_DB;

-- CREATE TABLE product (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_name VARCHAR(100) NOT NULL,
--   product_description VARCHAR(255),
--   department  VARCHAR(45),
CONSTRAINT FK_dept FOREIGN KEY (dept_id)
    REFERENCES Department(DeptID)
--   starting_bid INT default 0,
--   highest_bid INT default 0,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE inventory (
--   id INT NOT NULL AUTO_INCREMENT,
--   item_name VARCHAR(100) NOT NULL,
--   category VARCHAR(45) NOT NULL,
--   starting_bid INT default 0,
--   highest_bid INT default 0,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE department (
--   dept_id INT NOT NULL AUTO_INCREMENT,
--   item_name VARCHAR(100) NOT NULL,
--   category VARCHAR(45) NOT NULL,
--   starting_bid INT default 0,
--   highest_bid INT default 0,
--   PRIMARY KEY (id)
-- );
