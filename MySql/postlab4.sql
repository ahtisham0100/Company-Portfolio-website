show databases ; 
create database lab4; 
use lab4;
create table customer ( 
customerno int primary key , 
customerCity varchar(20)  not null , 
customerName varchar(20)  not null );   

insert into customer (customerno ,customerCity , customerName) values 
(1,"multan" , "Ahtisham") , 
(2, 'Lahore', 'Ali Raza'),
(3, 'Karachi', 'Fatima Khan'),
(4, 'Islamabad', 'Ahmed'),
(5, 'Rawalpindi', 'Usman Tariq'),
(6, 'Faisalabad', 'Hassan Iqbal'),
(7, 'Peshawar', 'Zainab Gul'),
(8, 'Quetta', 'Hamza Baloch'),
(9, 'Sialkot', 'Zara Malik'),
(10, 'Bahawalpur', 'Ahmed Shah'),
(11, 'Hyderabad', 'Nida ');  
 
 
 
 insert into customer (customerno ,customerCity , customerName) values 
(11,"multan" , "Eeshan") , 
(12, 'multan', 'Aiza'),
(13, 'multan', 'Fatima');

use lab4;
select * from customer; 

-- 4.5
--  delecting beased on the customer number   ;
delete from customer where customerno=11;
 
  -- 4.6   
  select * from  customer order by customerName;    -- ascending order; 
  
  select * from customer order by customerName desc;   -- descending order 
  
    SET SQL_SAFE_UPDATES = 0;
    delete from customer  where customerCity="multan"; 
    

