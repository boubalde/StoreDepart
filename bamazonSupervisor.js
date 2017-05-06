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

var startSupervisor = function() {
  inquirer.prompt({
    name: "SupervisorChoice",
    type: "list",
    message: "Would you like to do Manager ?",
    choices: ["View Product Sales by Department", "Create New Department"]
  }).then(function(answer) {
    if (answer.SupervisorChoice === "View Product Sales by Department" ) {
    	departmentSales();
    }
    else if (answer.SupervisorChoice === "Create New Department"){
     console.log('k');
    }
    
  });
};
var departmentSales= function(){
connection.query("SELECT * FROM department", function(err, res) {
  if (err) throw err;
  //console.log(res);
 var table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''} });
 table.push(
    ['department_ID', 'departement_name', 'over_head_costs', 'product_sales', 'total_profit']
  
);
  
for (var i = 0; i < res.length; i++) {
    var total_profit = res[i].total_sales - res[i].over_head_costs;
          table.push(
    [res[i].department_id , res[i].department_name , res[i].over_head_costs , res[i].total_sales, total_profit ]
   
);
            
          }
          console.log(table.toString());
});
  }
  startSupervisor();