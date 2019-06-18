DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (dept_id)
);

INSERT INTO department (dept_name) 
VALUES 	("Pet Supplies"),
			("Water & Seltzer"),
			("Books"),
			("Snacks");

CREATE TABLE products (
  upc CHAR(10) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department INT,
  cost DECIMAL(10,2),
  price DECIMAL(10,2),
  quantity_in_stock INT,
  quantity_sold INT,
  PRIMARY KEY (upc),
  FOREIGN KEY (department) REFERENCES department(dept_id)
);

INSERT INTO products (department, upc, product_name, price, cost, quantity_in_stock, quantity_sold)
VALUES  (2, "075720000616", "Poland Springs Spring Water, 1L", 1.19, 1.00, 50, 3456),
        (4, "637480020305", "Atkins Snack Caramel Chocolate Nut Roll Pack (19 + 1 Bonus Bar)", 24.99, 15.00, 5, 123),
        (3, "781118531648", "JavaScript and JQuery: Interactive Front-End Web Development", 39.99, 37.99, 0, 1234),
        (3, "780849304408", "The Art of Systems Architecting, Second Edition", 59.99, 57.99, 100, 26),
        (4, "029000016699", "Planters Mixed Nuts Lightly Salted: Peanut, Almond, Cashew, Pecan, Brazil Nut, Huzelnut, Pecan, 10.3 OZ (292g)", 4.99, 3.99, 100, 2345)
      --   ("070734053283", "Celestial Seasonings Bengal Spice", 5, 25),
		  ;
        
SELECT * FROM products;

-- CREATE TABLE inventory (
--   upc CHAR(10) NOT NULL,
--   PRIMARY KEY (upc)
-- );

-- CREATE TABLE price (
--   upc CHAR(10) NOT NULL,
--   PRIMARY KEY (upc)
-- )

