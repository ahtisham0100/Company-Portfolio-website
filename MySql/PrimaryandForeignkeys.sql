show databases; 
 create database testDataBase; 
 use testDataBase; 
 create table info( 
id int primary key not null , 
name varchar(30) not null,
contact int(12) not null
 ) ; 
 
 desc info;
 
 insert into info(id,name , contact ) values (1,"ahtihsam",0301091933) , (2,"ahtihsam",0301091933) , (3,"ahtihsam",0301091933);
 
 select * from info; 
 select info where id=1;  
 drop database testDataBase;
  drop database emplyoees;
  show databases;
use task4; 
show tables;
select * from  eventrequest;
--   alter table info  comments varchar(30) not null;

create database FKPRACTICE;
USE FKPRACTICE; 
create table Parent( 
id int primary key,
name varchar(20) not null, 
foreign key (id) references child(primaryid)    -- this is not gonna work unless we create the child table with the column primaryid;
); 
 
  create table child(primaryid int primary key ,   
  contact int not null , 
  name varchar(30) default "no name" 
)  ; 
 
 alter table child modify name varchar(30)  default "no name";
 
 INSERT INTO child (primaryid, contact) VALUES (1, 03545454), (2, 6545464);
select * from child;
  
  -- changing the values based on  primary key 
   
   update child set name="Muhammad Ahtisham Arif" where primaryid=1; 
      update child set name="Muhammad" where primaryid=2; 

   select * from child;
INSERT INTO Parent (id, name) 
VALUES (1, 'Ahtisham'), (2, 'Muhammad');  

select name ,id from parent where id=1;

 
 
