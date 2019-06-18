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
  var data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];
var output = table(data);
console.log(output);
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
		// What do we have to sell and how much does it cost?
		var sql = "SELECT product_name as name, product_description as descript, price FROM products";
        connection.query(sql, function(err, res) {
        if (err) throw err;
        var shelf = [];
        var data = [];
        var line = ["Product", "Description", "Price (USD)"];
        data.push(line);
        for (var i = 0; i < res.length; i++) {
            line = [];
        //   console.log("Product: " + res[i].name + " : " + res[i].descript + " || $: " + res[i].price);
          line.push(res[i].name, res[i].descript, res[i].price);
            data.push(line);
          shelf.push(res[i].name);

        }
        
        shelf.push("Quit");
        console.log(table(data));

        inquirer
            .prompt({
                name: "item",
                type: "list",
                message: "Would you like to purchase?",
                choices: shelf
            })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === "Quit") {
          console.log("Show ME the MONEY!");
          return;
        } else {
            // answer.item
            console.log(answer.item)
            main();
        } 
      });

        
      });
		

	

  }