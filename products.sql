DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50),
	price INTEGER(10) NOT NULL,
	stock_quantity INTEGER(10),
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("coffee", "grocery", 3, 201);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("chocolate", "grocery", 5, 140);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("bicycle", "sports", 150, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("soccer ball", "sports", 20, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("couch", "furniture", 200, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("dresser", "furniture", 120, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("shoes", "clothing", 50, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("jacket", "clothing", 75, 150);

