-- DROP DATABASE IF EXISTS bamazon_DB;
-- CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  product_description VARCHAR(255),
  department  VARCHAR(20),
  price INT,
  quanity INT,
  sold INT,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, product_description, price, quanity)
VALUES  ("vanilla", "Ice Cream", 5, 100),
        ("chocolate","Ice Cream", 5, 25);
        
SELECT * FROM products;

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
