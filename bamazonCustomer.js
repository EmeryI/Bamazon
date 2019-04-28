var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "admin",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
    searchProduct();
});

function displayItems() {
    var query = "SELECT * FROM bamazon_db.products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id);
            console.log(res[i].product_name);
            console.log(res[i].price);
        }

    });

}

function searchProduct() {
    inquirer
        .prompt({
            name: "item_id",
            type: "input",
            message: "What is your product's item id?"
        })
        .then(function(answer) {
            console.log(answer);
            var query = "SELECT * FROM bamazon_db.products WHERE item_id=" + answer.item_id;
            connection.query(query, function(err, res) {
                console.log(res);
                // for (var i = 0; i < res.length; i++) {
                //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
                // }
                // runSearch();
            });
        });
    productQuantity();
}

function productQuantity() {
    inquirer
        .prompt({
            name: "stock_quantity",
            type: "input",
            message: "how many units of the product they would like to buy?"
        })
        .then(function(answer) {
            console.log(answer);
            // var query = "SELECT * FROM bamazon_db.products WHERE item_id=" + answer.item_id;
            // connection.query(query, function(err, res) {
            //     console.log(res);
            //     // for (var i = 0; i < res.length; i++) {
            //     //   console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
            //     // }
            //     // runSearch();
            // });
        });
}