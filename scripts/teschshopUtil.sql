create database techshop;
set sql_safe_updates = 0

use techshop;


insert into product_categories values 
(1, "sample description 1", "product category 1");

insert into product_categories values 
(2, "sample description 2", "product category 2");
select * from product
select * from product_categories

delete from product
/*laptop*/
insert into product values 
(1, 4, "sample product description Asus Rog Strix Scar 15 2022", "assets/img/laptops/AsusRogStrixScar152022.jpg", "Asus Rog Strix Scar 15", 1500, 1);
insert into product values 
(2, 5, "sample product description Asus Rog Strix G15 2022", "assets/img/laptops/AsusRogStrixG152022.jpg", "Asus Rog Strix G15", 1600, 1);

insert into product values 
(3, 5, "sample product description Razer Blade 14 2022", "assets/img/laptops/RazerBlade14.jpg", "Razer Blade 14", 600, 1);
/*cpu*/

insert into product values
(4, 4, "sample product description Intel Core i9-12900", "assets/img/cpus/i912900k.jpg", "Intel Core i9-12900", 1500, 2);

insert into product values
(5, 4, "sample product description Intel Core i7-12700", "assets/img/cpus/i712700k.jpg", "Intel Core i7-12700", 1500, 2);

insert into product values
(6, 4, "sample product description Intel Core i5-12600", "assets/img/cpus/i512600.jpg", "Intel Core i5-12600", 1500, 2);
/*gpu*/

insert into product values
(7, 4, "sample product description RTX 3060 TI", "assets/img/gpus/rtx3060ti.jpg", "RTX 3060 TI", 1500, 3);

insert into product values
(8, 4, "sample product description RTX 3070 TI", "assets/img/gpus/rtx3070ti.jpg", "RTX 3070 TI", 1500, 3);

insert into product values
(9, 4, "sample product description RTX 3080 TI", "assets/img/gpus/rtx3080ti.jpg", "RTX 3080 TI", 1500, 3);

insert into product values
(10, 4, "sample product description RTX 3090 TI", "assets/img/gpus/rtx3090ti.jpg", "RTX 3090 TI", 1500, 3);

select * from product



select * from product;
delete from product_categories
use techshop;
insert into product_categories values
(1, "Laptops", "Laptops");

insert into product_categories values
(2, "Central Processing Units", "CPUs");

insert into product_categories values
(3, "Graphics Processing Units", "GPUs");

insert into product_categories values
(4, "Motherboards", "Motherboards")

delete from product_categories where id = 4
select * from product_categories

select * from customer
select * from cart_item
select * from product