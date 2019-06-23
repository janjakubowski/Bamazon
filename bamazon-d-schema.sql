DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE department (
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (dept_id)
);

            
SELECT * FROM department;

DROP TABLE products;

CREATE TABLE products (
  upc CHAR(12) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department INT,
  cost DECIMAL(10,2),
  price DECIMAL(10,2),
  quantity_in_stock INT,
  quantity_sold INT,
  PRIMARY KEY (upc),
  FOREIGN KEY (department) REFERENCES department(dept_id)
);

SELECT price, quantity_in_stock AS qty FROM products WHERE product_name = 'Planters Mixed Nuts Lightly Salted: Peanut, Almond, Cashew, Pecan, Brazil Nut, Huzelnut, Pecan, 10.3 OZ (292g)';


        
SELECT * FROM products;

-- CREATE TABLE inventory (
-- 	upc CHAR(10) NOT NULL,
-- 	quantity_in_stock INT,
--   	quantity_sold INT,
-- 	PRIMARY KEY (upc),
-- 	FOREIGN KEY (upc) REFERENCES products(upc)
-- );

-- CREATE TABLE price (
--   upc CHAR(10) NOT NULL,
--   PRIMARY KEY (upc)
-- )

