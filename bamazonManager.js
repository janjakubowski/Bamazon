var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "bamazon",
	password: "Passw0rd",
	
	database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
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
				console.log("A");
				main();
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
				connection.end();
				break;

			default:
				console.log("Something's Wrong!!!")
				connection.end();
		}
	});
}
