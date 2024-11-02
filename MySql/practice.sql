show databases ; 
create database College; 


 create table department( id int primary key , name varchar(20)  not null) ;
insert into department (id  , name )  
values 
(1 ,"cse "), 
(2, "ee") , 
(3,"IS") ; 
   
   alter table department drop constraint department_chk_6;
    alter table department modify id int  check (id>0 and id<6) ;
    insert into department (id,name)  
   value (5,"ds"); 
  select * from department where id in (1,3); 
  desc department;

create table students( 
id int primary key , 
name   varchar(30) default "name not entered", 
contact int(13)  , 
dpt int  check (dpt>0 and dpt <4), 
foreign key (dpt)  references department(id) -- foreign key is department primary key
 ) ;     
 

    alter table students modify dpt int check(dpt>0 and dpt <4);
     alter table students add  contact int(15)  ;   
     
     INSERT INTO students (id, name, contact, dpt)
VALUES 
(11, 'Haider',64514651, 2) , 
(2, 'Muhammad Ali', 98765430, 3),
(3, DEFAULT, 555555555, 2),   -- Default name will be used
(4, 'Fatima Zahra', 123123123, 3),
(5, 'Hassan Raza', 321213151,1),
(6, 'Sarah Khan', 78978977, 3),
(7, DEFAULT, 11111111, 2),   -- Default name will be used
(8, 'Ali Akbar', 65465446, 3),
(9, 'Usman Tariq', 3333333, 1),
(10, 'Zara Ahmed', 9999999, 1);
   
   
    
  select *  from  students where dpt in (1,2); 
  select * from students;
   
    desc students;
 
--   id=2 , id=3;