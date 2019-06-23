var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");

// create the connection information for the sql database
var db = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "bamazon",
	password: "Passw0rd",
	
	database: "bamazon_DB"
});

// connect to the mysql server and sql database
db.connect(function(err) {
	if (err) throw err;
	// run the start function after the connection is made to prompt the user
	console.log("connection made");
	main();
});

function main() {
	console.log("\n\n--------------------------------------------------------------------------\n")
inquirer
	.prompt({
	name: "action",
	type: "list",
	message: "What would you like to do?",
	choices: [
		"View Products for Sale", 
		"View Low Inventory",
		"Add to Inventory",
		"Add New Product",
		"Quit"
	]
	})
	.then(function(answer) {

		switch (answer.action) {

			case "View Products for Sale":
				display();
				// main();
				break;
					
			case "View Low Inventory":
				lowInventory();
				break;

			case "Add to Inventory":
				addInventory();
				break;
					
			case "Add New Product":
				console.log("D");
				main();
				break;

			case "Quit":
				console.log("Exiting the Bamazon Mangler application");
				db.end();
				break;
		}
	});
}

function display() {

	// shop variables 
	

	// What do we have to sell and how many of each?
	var sql = "SELECT upc, product_name AS name, price, quantity_in_stock AS qty FROM products";
	db.query(sql, function(error, rows) {
		if (error) throw err;
		displayInventory(rows);
	});
} 


function displayInventory (rows) {

	var output = new Table;
	
	rows.forEach(function(product) {
		output.cell('Product', product.name)
		output.cell('Price, USD', product.price, Table.number(2))
		output.cell('Quantity', product.qty, Table.number(0))
		output.newRow()
	});
	
	console.log("\n\n");
	console.log(output.toString());
	
	main();
	
}

function lowInventory() {
	
	var sql = "SELECT upc, product_name AS name, price, quantity_in_stock AS qty FROM products WHERE quantity_in_stock <= 10";
	db.query(sql, function(error, rows) {
		if (error) throw err;
		displayInventory(rows);
	});
};

function addInventory() {
	var sql = "SELECT upc, product_name AS name, price, quantity_in_stock AS qty FROM products";
	db.query(sql, function(error, rows) {
		if (error) throw err;
		console.log("apres query" + rows[0]);
		selectItems(rows);
	});
}

function selectItems(rows) {


	var output = new Table;
	var items = [];


	
	rows.forEach(function(product) {
		items.push(product.name);
		output.cell('Product', product.name);
		output.cell('Price, USD', product.price, Table.number(2));
		output.cell('Quantity', product.qty, Table.number(0));
		output.newRow();
		});
	
	console.log("\n\n");
	console.log(output.toString());

	selectItem(items);

}


function selectItem(items) {
	
	items.push("Cancel"); // add the option to cancel
	inquirer
		.prompt({
			name: "item",
			type: "list",
			message: "Which item would you like to add to?",
			choices: items
		})
		.then(function(answer) {
			// based on their answer, either call the bid or the post functions
			if (answer.item === "Cancel") {
				console.log("Add to Inventory Request Cancelled");
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
	db.query(sql, function(error, row) {
		if (error) throw err;
		if (row.length !== 1) { Console.log("something is wrong " + row.length + "items returned"); };
		var price = row[0].price;
		var qty = row[0].quantity_in_stock;
		var upc = row[0].upc;
		
			inquirer
				.prompt({
					name: "desiredQty",
					type: "number",
					message: "How many " + item + "would you like to add?",
					validate: function(value) {
						if (!isNaN(value)) {
						  return true;
						}
						return false;
					  }
				})
				.then(function(answer) {

					
						var newQty = qty + answer.desiredQty;
						console.log("\n\n" + answer.desiredQty + " has been added to " + item);
						console.log ("The new amount in inventory is " +  newQty);
						updateInventory(upc, newQty);
						main();
					
				});
		
	})
}

function updateInventory(upc, newQty) {
	// sql = "SELECT quantity_in_stock, quantity_sold FROM products WHERE upc = '" + upc + "'";
	// db.query(sql, function(err, row) {
		// if (err) throw err;
		db.query("UPDATE products SET ? WHERE upc = '" + upc + "'",
		[
		  {
			quantity_in_stock: newQty
		  }
		],
		function(error) {
		  if (error) throw err;
		});
	};
