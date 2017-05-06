 create database Bamazon;
use Bamazon;
create table products (
item_id int not null auto_increment,
product_name varchar(50) null,
department_name varchar(50) null,
price decimal (20,4) null,
stock_quantity  int (20) null,
ALTER TABLE products
ADD product_sales decimal (20,4) null;


primary key (item_id)
);
insert into products (product_name, department_name, price, stock_quantity)
values ('jeans', 'clothing', 90, 30);

insert into products (product_name, department_name, price, stock_quantity)
values ('tshirts', 'clothing', 60, 40);

insert into products (product_name, department_name, price, stock_quantity)
values ('converse', 'shoes', 115, 40);

insert into products (product_name, department_name, price, stock_quantity)
values ('sandal', 'shoes', 40, 20);

insert into products (product_name, department_name, price, stock_quantity)
values('suits', 'clothing', 300, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ('guess', 'watch', 120, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ('apple', 'watch', 400, 10);

insert into products (product_name, department_name, price, stock_quantity)
values('venus', 'dress', 29, 10);

insert into products (product_name, department_name, price, stock_quantity)
values('handbags', 'bags', 50, 20);

insert into products (product_name, department_name, price, stock_quantity)
values('crossbody bags', 'bags',  60, 20);

insert into products (product_name, department_name, price, stock_quantity)
values('luna amp', 'wallet', 12, 10);

insert into products (product_name, department_name, price, stock_quantity)
values('swivel prong', 'belt', 40, 20);

insert into products (product_name, department_name, price, stock_quantity)
values('reversible', 'belt', 45, 14);

insert into products (product_name, department_name, price, stock_quantity)
values('rivington stripe', 'watch', 98, 20);