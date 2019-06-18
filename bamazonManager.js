var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

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
				console.log("B");
				main();
				break;

			case "Add to Inventory":
				console.log("C");
				main();
				break;
					
			case "Add New Product":
				console.log("D");
				main();
				break;

			case "Quit":
				console.log("See Ya Later Alligator");
				db.end();
				break;
		}
	});
}

function display() {

	// shop variables 
	

	// What do we have to sell and how much does it cost?
	var sql = "SELECT upc, product_name AS name, price, quantity_in_stock AS qty FROM products";
	db.query(sql, function(error, rows) {
		if (error) throw err;

		displayInventory(rows);

		
		
	});

        
            
        } 
    //   });

        
	//   };
	  
function displayInventory (rows) {
	// var shelf = [];
	var output = [];
	var line = ["UPC", "Product", "Price (USD)", "Quantity"];
	output.push(line);

	for (var i = 0; i < rows.length; i++) {
		line = [];
		line.push(rows[i].upc, rows[i].name, rows[i].price, rows[i].qty);
		output.push(line);
		// shelf.push(rows[i].name);
	}

	// shelf.push("Cancel");
	console.log(table(output));

	main();

}
