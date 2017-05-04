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
  console.log("department_ID\t \t departement_name\t over_head_costs\t product_sales\t total_profit ");
  console.log("-------\t------------\t   --------------\t ------------\t -------------\t ------------ ")
        for (var i = 0; i < res.length; i++) {
            var total_profit = res[i].total_sales - res[i].over_head_costs;
            console.log(res[i].department_id + "\t" + res[i].department_name + "\t" 
              + res[i].over_head_costs + "\t" + res[i].total_sales + "\t" 
              + total_profit );
          }
});
  }
  startSupervisor();