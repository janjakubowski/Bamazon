USE bamazon_DB;

INSERT INTO department (dept_name) 
VALUES 	("Pet Supplies"),
			("Water & Seltzer"),
			("Books"),
			("Snacks");
--
-- New department is ("Coffee & Tea") 

INSERT INTO products (department, upc, product_name, price, cost, quantity_in_stock, quantity_sold)
VALUES	(1, "072705115204", "Fromm Gold Adult Dog Food (33 lb)", 1.19, 1.00, 50, 3456),
			(1, "015958978127", "Pork Chomps Premium - Chicken Flavor Wrapped Porkskin Twists", 24.99, 15.00, 5, 123),
			(1, "859610005482", "Blue Buffalo - Crunchy Biscuits Duck Dog Treats - 10oz", 39.99, 37.99, 0, 1234),
			(2, "075720000616", "Poland Springs Spring Water, 1L", 1.19, 1.00, 50, 3456),
			(2, "075720000302", "Poland Springs Spring Water Sparkling, Lemon Ginger, 1L", 1.19, 1.00, 50, 3456),
			(4, "637480020305", "Atkins Snack Caramel Chocolate Nut Roll Pack (19 + 1 Bonus Bar)", 24.99, 15.00, 5, 123),
			(3, "781118531648", "JavaScript and JQuery: Interactive Front-End Web Development", 39.99, 37.99, 0, 1234),
			(3, "780849304408", "The Art of Systems Architecting, Second Edition", 59.99, 57.99, 100, 26),
			(4, "029000016699", "Planters Mixed Nuts Lightly Salted, 10.3oz (292g)", 4.99, 3.99, 100, 2345),
			(4, "854487006877", "Saffron Road - Crunchy Chickpeas Salted Caramel, 4.5oz", 4.99, 3.99, 100, 2345),
			(4, "829739000323", "Rhythm Superfoods, Kale Chips, Zesty Nacho", 5.99, 5.49, 70, 222);
-- 
-- New product is (5, "070734053283", "Celestial Seasonings Bengal Spice", 3.79, 3.22, 10000, 0)
		  