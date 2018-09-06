var inquirer = require("inquirer");

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

con.connect(function (err) {
    if (err) throw err;
    afterConnection();
});


function afterConnection() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Manager Mode"]
    }).then(function (answer) {
        if (answer.action === "View Products for Sale") {
            availableProducts();
        }
        else if (answer.action === "View Low Inventory") {
            lowInventory();
        }
        else if (answer.action === "Add to Inventory") {
            addInventory();
        }
        else if (answer.action === "Add New Product") {
            addProduct();
        }
        else {
            con.end();
        }

    });
};

function availableProducts() {
    console.log("Viewing products for sale...\n");
    con.query("SELECT*FROM products", function (err, res) {
        // if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nQuantity: " + res[i].stock_quantity);
            console.log("----------------------");
        }
        afterConnection();
    });

};

function lowInventory() {
    console.log("Viewing low inventory...\n");
    con.query("SELECT*FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (parseInt(res[i].stock_quantity) < 5) {
                console.log("Item ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nQuantity: " + res[i].stock_quantity);
                console.log("----------------------");
            }  
        }
        afterConnection();
        
    });
};

function addProduct() {
    console.log("Adding a new product...\n");
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the product?",
            name: "name"
        },
        {
            type: "input",
            message: "What department is the product for?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the price for customers?",
            name: "price",
        },
        {
            type: "input",
            message: "How many are items are being added?",
            name: "qty"
        }
    ]).then(function (answer) {
        con.query("INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.qty
            },
            function () {
                console.log("Product added");
                availableProducts();
            });
    });
};

function addInventory() {
    console.log("Adding new inventory...\n");
    con.query("SELECT * FROM products", function (err, res) {
        inquirer.prompt([
            {
                type: "input",
                message: "Which items are being added?",
                name: "itemAdded",
            },
            {
                type: "input",
                message: "How many are being added?",
                name: "qtyAdded",
            }
        ]).then(function(answer){
            var itemIndex = (answer.itemAdded) - 1;
            var qtyAdded = parseInt(answer.qtyAdded);
            con.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: parseFloat((res[itemIndex].stock_quantity) + qtyAdded)},
                {item_id: answer.itemAdded},
            ], function(){
                console.log("Items added");
                availableProducts();
            });
        });
    });
}
