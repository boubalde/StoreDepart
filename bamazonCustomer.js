var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});
var displayTable = function(){

 connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  console.log("item_id\t product_name\t department_name\t price\t stock_quantity");
  console.log("-------\t------------\t   --------------\t-------\t. -------------")
        for (var i = 0; i < res.length; i++) {
            // console.log("Title          Artist          Genre");
            console.log(res[i].item_id + "\t" + res[i].product_name + "\t" 
              + res[i].department_name + "\t" + res[i].price + "\t" 
              + res[i].stock_quantity );
          }
});
}
//displayTable();
console.log("\n");
	var order = function() {
inquirer.prompt([

  // Here we create a basic text prompt.
  {
    type: "input",
    message: "What is the ID of the product would like to buy?",
    name: "id"
  },

  // Here we create a basic password-protected text prompt.
  {
    type: "input",
    message: "how many units of the product would like to buy?",
    name: "units"
  }

  
// Once we are done with all the questions... "then" we do stuff with the answers
// In this case, we store all of the answers into a "user" object that inquirer makes for us.
]).then(function(user) {
	
	var the_index = user.id - 1;
	//var quant = user.units;

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  var parse_stock = parseInt(res[the_index].stock_quantity);
  //var quantity_left = res[the_index].stock_quantity - user.units;
   var parse_userUnits = parseInt (user.units);
   var quantity_left = parse_stock - parse_userUnits;
  var total_cost = res[the_index].price * user.units;
  var sales= res[the_index].product_sales + total_cost;
  
  if (parse_stock >= parse_userUnits){
  	connection.query('UPDATE products SET ? WHERE ?', [{
  		stock_quantity: quantity_left
  	},{
  		item_id: user.id
  	}], function(err, res) {
  		console.log(err);
  		console.log('Order successfully done. the cost of your purchase is'
  		 + " " + total_cost);
  	})
  	connection.query('UPDATE products SET ? WHERE ?', [{
  		product_sales: sales
  	},{
  		item_id: user.id
  	}], function(err, res) {

  		console.log('the product total sales is' + sales );
  	})

  }
  else{
  	console.log('Insufficient quantity!');
  	console.log('the order is not gonna occur!');
  }
});
 

});
};
order();
// displayTable();
