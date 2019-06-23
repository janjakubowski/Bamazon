# Bamazon
Week 12 - Homework: An Amazon-like storefront using MySQL database. Functionality includes taking orders, restocking inventory and basic reporting.

## Objectives

This week's assignment adds a real RDBMS, mySQL, which will store the data about the Bamazon store instance that is created. Leveraging node.js to run the app, inquirer to prompt the users, which are one of the following customers, store managers or supervisors. Also, use some other npm packages to 'pretty-up' the output which goes to the terminal.

## Assignment

Note: The functionality described reflect the assignment with my modifications to what is built.

### Customer View (Minimum Requirement)

1. Create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

2. The app should then prompt users to buy something or to quit. If they are buuying: 

   * Ask them the ID of the product they would like to buy.
   * Ask how many units of the product they would like to buy.

3. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * Upate the database to reflect the remaining quantity.
   * Show the customer the total cost of their purchase.

### Manager View 

* A new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:
    * View Products for Sale 
    * View Low Inventory
    * Add to Inventory
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

###  Supervisor View 

Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.


### MySQL Database

1. MySQL Database is called `bamazon_DB`.

2. Created user `bamazon` who has read  and write to the data but not the schema. 

3. A Table inside of that database called `products`. `products` should have each of the following columns:

    * item_id (unique id for each product)
    * product_name (Name of product)
    * department_name
    * price (cost to customer)
    * stock_quantity (how much of the product is available in stores)

    * Populate this database with around 10 different products.

3. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id
   * department_name
   * over_head_costs


   https://www.barcodelookup.com/


