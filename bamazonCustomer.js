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
        message: "Would you like to [SHOP] an auction or [QUIT] on an auction?",
        choices: ["SHOP", "QUIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === "SHOP") {
          console.log("Show ME the MONEY!");
          main();
        }
        else if(answer.action === "QUIT") {
            console.log("THANK YOU FOR SHOPPING AT BAMAZON")
            connection.end();
        } else{
            console.log("Something's Wrong!!!")
            connection.end();
        }
      });
  }