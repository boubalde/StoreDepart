var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

var productSale = function(){
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  //console.log(res);
  console.log("item_id\t product_name\t departement_name\t price\t stock_quantity");
  console.log("-------\t------------\t   --------------\t-------\t. -------------")
        for (var i = 0; i < res.length; i++) {
            // console.log("Title          Artist          Genre");
            console.log(res[i].item_id + "\t" + res[i].product_name + "\t" 
              + res[i].department_name + "\t" + res[i].price + "\t" 
              + res[i].stock_quantity );
          }
});

}

var lowInventory= function(){
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  for (var i=0; i<res.length; i++){
  if( 5 >res[i].stock_quantity) {
    console.log("item" + res[i].item_id + " has inventory less than 5" 
      + "\t" + "the product is :" + " " + res[i].product_name);
  }
  }


});
}

var addInventory = function(){

  inquirer.prompt([

  // Here we create a basic text prompt.
  {
    type: "input",
    message: "What is the ID of the product would like to add?",
    name: "id"
  },

  // Here we create a basic password-protected text prompt.
  {
    type: "input",
    message: "how many units of the product would like to add?",
    name: "units"
  }]).then(function(user) {
var the_index = user.id - 1;


connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  var Parse_stock = parseInt(res[the_index].stock_quantity);
  var parse_user = parseInt (user.units);
  var new_quantity= Parse_stock + parse_user;
  connection.query("UPDATE products SET ? WHERE ?", [{
      stock_quantity: new_quantity 
    },{
      item_id: user.id
    }], function(err, res) {

      console.log('item successfully added');
      console.log('now the quantity stock is:' + " " + new_quantity );
    })
});


  

});

}

var addProduct = function(){
inquirer.prompt([{
    name: "item_name",
    type: "input",
    message: "What is the product name you would like to add?"
  }, {
    name: "departement_name",
    type: "input",
    message: "Which department would you like to add?"
  }, {
    name: "item_price",
    type: "input",
    message: "What is the price of the product?"
  },{
    name: "item_quantity",
    type: "input",
    message: "What is the quantity of the product you are adding?"
    
  }]).then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query("INSERT INTO products SET ?", {
      product_name: answer.item_name,
      department_name: answer.departement_name,
      price: answer.item_price,
      stock_quantity: answer.item_quantity
    }, function(err) {
      if (err) throw err;
      console.log("Your new product was created successfully!");
      // re-prompt the user for if they want to bid or post
      start();
    });
  });

}



var startManager = function() {
  inquirer.prompt({
    name: "managerChoice",
    type: "list",
    message: "Would you like to do Manager ?",
    choices: ["View Products for Sale", "View Low Inventory", 
    "Add to Inventory", "Add New Product"]
  }).then(function(answer) {
    
    if (answer.managerChoice === "View Products for Sale" ) {
     productSale();
     startManager();
    }
    else if (answer.managerChoice === "View Low Inventory"){
     lowInventory();
     startManager();
    }
    else if(answer.managerChoice === "Add to Inventory"){
    addInventory();
    startManager();
    }
    else if (answer.managerChoice === "Add New Product"){
        addProduct();
        startManager();
    }

  });
};
 startManager();