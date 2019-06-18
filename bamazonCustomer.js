var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

// create the connection information for the MySQL database
var db = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "bamazon",
  password: "Passw0rd",

  database: "bamazon_DB"
});

// connect to the database
db.connect(function(err) {
  if (err) throw err;
  // run the main function after the connection is made to prompt the user
  main();
});

function main() {

    console.log("\n*******************************************************\n\n");
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to [Shop] or [Quit]?",
        choices: ["Shop", "Quit"]
      })
      .then(function(answer) {

        if (answer.action === "Shop") {
          shop();
        }
        else if(answer.action === "Quit") {
            console.log("\nTHANK YOU FOR SHOPPING AT BAMAZON");
            db.end();
        } 
      });
  }

function shop() {

	// Display what bamazon have to sell and how much does it costs
	var sql = "SELECT product_name as name, price FROM products";
	db.query(sql, function(error, rows) {
		if (error) throw err;
		displayInventory(rows);
	});
} 
	

function displayInventory (rows) {

	var shelf = [];
	var output = [];
	var line = ["Product", "Price (USD)"];
	output.push(line);

	for (var i = 0; i < rows.length; i++) {
		line = [];
		line.push(rows[i].name, rows[i].price);
		output.push(line);
		shelf.push(rows[i].name);
	}

	console.log(table(output));
	
	selectItem(shelf);
}

function selectItem(shelf) {
	
	shelf.push("Cancel"); // add the option to cancel
	inquirer
		.prompt({
			name: "item",
			type: "list",
			message: "Would you like to purchase?",
			choices: shelf
		})
		.then(function(answer) {
			// based on their answer, either call the bid or the post functions
			if (answer.item === "Cancel") {
				console.log("Purchase Cancelled");
				main();
			} else {
				// var item = answer.item;
				// console.log(item);
				getQuantity(answer.item);
			}
		});	
}

function getQuantity(item) {
	sql = "SELECT price, quantity_in_stock, upc FROM products WHERE product_name = '" + item + "'";
	db.query(sql, function(err, row) {
		if (err) throw err;
		var price = row[0].price;
		var qty = row[0].quantity_in_stock;
		var prodID = row[0].upc;
		if (qty === 0) {
			console.log("\nSorry, we are out of " + item + "\n");
			shop();
		} else {
			inquirer
				.prompt({
					name: "desiredQty",
					type: "number",
					message: "How many " + item + "would you like to purchase?",
					validate: function(value) {
						if (!isNaN(value)) {
						  return true;
						}
						return false;
					  }
				})
				.then(function(answer) {

					if (answer.desiredQty > qty) {
						console.log("\nSorry, we only have " + qty + " of " + item + "\n");
						shop(); 
					} else {
						var amount = price * answer.desiredQty;
						console.log("\n\nTHANK YOU for your purchase. The amount due is $" + amount.toFixed(2));
						updateInventory(prodID, answer.desiredQty);
						main();
					}
				});
		}
	})
}

function updateInventory(prodID, qtySold) {
	sql = "SELECT quantity_in_stock, quantity_sold FROM products WHERE upc = '" + prodID + "'";
	db.query(sql, function(err, row) {
		if (err) throw err;
		var inStock = row[0].quantity_in_stock - qtySold;
		var sold = row[0].quantity_sold + qtySold;
		db.query("UPDATE products SET ? WHERE upc = '" + prodID + "'",
		[
		  {
			quantity_in_stock: inStock,
			quantity_sold: sold
		  }
		],
		function(error) {
		  if (error) throw err;
		});
	});
}