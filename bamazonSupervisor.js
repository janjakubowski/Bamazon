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
        "View Product Sales by Department",
        "Create New Department",
        "Quit"
      ]
    })
    .then(function(answer) {
        
      switch (answer.action) {

        case "View Product Sales by Department":
          console.log("A");
          main();
          break;
            
        case "Create New Department":
          console.log("B");
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
