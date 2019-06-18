var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

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
//   var data = [
//     ['0A', '0B', '0C'],
//     ['1A', '1B', '1C'],
//     ['2A', '2B', '2C']
// ];
// var output = table(data);
// console.log(output);
//   console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
  main();
});

function main() {

    console.log("\n*******************************************************\n\n");
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to [SHOP] an auction or [QUIT] on an auction?",
        choices: ["Shop", "Quit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === "Shop") {
          console.log("Show ME the MONEY!");
          shop();
        }
        else if(answer.action === "Quit") {
            console.log("\nTHANK YOU FOR SHOPPING AT BAMAZON");
            connection.end();
        } else{
            console.log("Something's Wrong!!!")
            connection.end();
        }
      });
  }

  function shop() {

	// shop variables 
	

	// What do we have to sell and how much does it cost?
	var sql = "SELECT product_name as name, price FROM products";
	connection.query(sql, function(error, rows) {
		if (error) throw err;

		displayInventory(rows);

		
		
	});

        
            
        } 
    //   });

        
	//   };
	  
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

	shelf.push("Cancel");
	console.log(table(output));

	selectItem(shelf);

}

function selectItem(shelf) {

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
		connection.query(sql, function(err, row) {
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
                // choices: shelf
            })
            .then(function(answer) {
				// console.log(answer.desiredQty);
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
	connection.query(sql, function(err, row) {
		if (err) throw err;
		var inStock = row[0].quantity_in_stock - qtySold;
		var sold = row[0].quantity_sold + qtySold;
		connection.query("UPDATE products SET ? WHERE upc = '" + prodID + "'",
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
		

	

  