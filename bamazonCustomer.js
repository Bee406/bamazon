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
    con.query("SELECT*FROM products", function (err, res) {
        // if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price + "\nQuantity: " + res[i].stock_quantity);
            console.log("----------------------");
        }

        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the product?",
                name: "id",
                validate: function (value) {
                    if (parseInt(value) <= res.length) {
                        return true;
                    }
                    else { return false };
                }
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "qty",
            },
        ]).then(function (answer) {
            var productId = (answer.id) - 1; //subtract 1 to get the correct index
            var quantity = parseInt(answer.qty);

            if (res[productId].stock_quantity >= quantity) {
                var total = parseFloat((res[productId].price) * quantity);
                console.log("Success! Your total is: $" + total);

                con.query("UPDATE products SET ? WHERE ?", [
                    { stock_quantity: (res[productId].stock_quantity) - quantity },
                    { item_id: answer.id },
                ])

            }
            else {
                console.log("We're sorry, there are not enough items in stock!");
            }
            startOver();

        });

    });
};

function startOver() {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to purchase a different item?",
        name: "prompt"
    }).then (function(answer){
        if (answer.prompt){
            afterConnection();         
        }
        else{console.log("Okay. Thanks for visiting!");
            con.end();
        }
    });

}












