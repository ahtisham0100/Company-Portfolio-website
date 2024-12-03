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
 
 show tables;
desc customer; 
 kill customer;  
 
 
 insert into customer (customerno ,customerCity , customerName) values 
(11,"multan" , "Eeshan") , 
(12, 'multan', 'Aiza'),
(13, 'multan', 'Fatima');
 
  select  customerno, customerCity, customername from customer; 
select * from  customer where customerCity='multan';
   select distinct  customerCity from  customer; 
   
   select  distinct customerCity , customername from customer;
   
use lab4;
select * from customer where id>1; 
delete from  customer where  id>1;
-- 4.5
--  delecting beased on the customer number   ;
delete from customer where customerno=11;
 
  -- 4.6   
  select * from  customer order by customerName;    -- ascending order; 
  
  select * from customer order by customerName desc;   -- descending order 
  
    SET SQL_SAFE_UPDATES = 0;
    delete from customer  where customerCity="multan"; 
    
alter database lab4 char set utf8;

--  TABLE modify  customerCity  ccity varchar(20) ; 
 CREATE TABLE students (
    student_id INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT,
    gender CHAR(1),
    gpa DECIMAL(3, 2),
    enrollment_year INT,
    major VARCHAR(50),
    advisor_id INT
); 

 
 INSERT INTO students (student_id, first_name, last_name, age, gender, gpa, enrollment_year, major, advisor_id) VALUES
(1, 'John', 'Doe', 20, 'M', 3.75, 2023, 'Computer Science', 101),
(2, 'Jane', 'Smith', 22, 'F', 3.85, 2022, 'Data Science', 102),
(3, 'Alice', 'Johnson', 19, 'F', 3.60, 2023, 'Cyber Security', 103),
(4, 'Bob', 'Brown', 21, 'M', 2.95, 2021, 'Artificial Intelligence', 101),
(5, 'Emma', 'Davis', 23, 'F', 3.20, 2022, 'Computer Networks', 102),
(6, 'Liam', 'Wilson', 20, 'M', 3.10, 2023, 'Software Engineering', 104),
(7, 'Olivia', 'Taylor', 18, 'F', 3.50, 2024, 'Machine Learning', 105),
(8, 'Noah', 'Martinez', 19, 'M', 3.00, 2024, 'Data Science', 103),
(9, 'Sophia', 'Anderson', 22, 'F', 2.80, 2021, 'Information Systems', 101),
(10, 'Lucas', 'Thomas', 21, 'M', 3.65, 2022, 'Software Engineering', 102);

   
   SELECT first_name, last_name FROM students;
SELECT DISTINCT major FROM students;
SELECT * FROM students WHERE enrollment_year = 2023;
SELECT * FROM students WHERE gender = 'M' AND gpa > 3.5 and age>=20;
SELECT * FROM students WHERE age >= 20;
select  *  from  students order by  gpa desc limit 5;   --  gives the top  5  elements; 

select *  from  students order by  gpa ASC limit 15;    -- returns top 15  elements;  

SELECT * FROM students ORDER BY gpa ASC LIMIT 5 offset 5;  --  offset gives the "value" , here 5 elements that come after the top 5 elements;

-- Retrieve the next 5 students after the top 5 based on GPA:

SELECT * FROM students ORDER BY  gpa desc LIMIT 5 offset 4;
select  *  from students  order by gpa desc limit 5;


SELECT enrollment_year, AVG(gpa) AS avg_gpa 
FROM students 
GROUP BY enrollment_year;

show databases;
use lab4; 
 select * from  students 
 order by gpa desc limit 2;  
 
  set SQL_SAFE_UPDATES=0;
  update students 
  set first_name="Topper Bhayaa" , last_name="unka last name"
  where 
  gpa>3.5;  
  
   
   select * from students
    where last_name is not 
    null; 
     
     update students set last_name=null;
  
delete from  students where gpa < 3; 
 
      select * from  students 
      where  gpa = (select  max(gpa) from students )  ; 
       
        
        update  students 
        set last_name = " ALPHA " 
      
         where gpa>3.5; 
          
           
            
             
              CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('Male', 'Female', 'Other'),
    date_of_birth DATE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(15),
    hire_date DATE NOT NULL,
    job_title VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2),
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);

 desc employee;
 
 
 INSERT INTO employee (first_name, last_name, gender, date_of_birth, email, phone_number, hire_date, job_title, department, salary, manager_id)
VALUES 
('Alice', 'Johnson', 'Female', '1990-02-15', 'alice.johnson@example.com', '123-456-7890', '2023-01-10', 'Software Engineer', 'Engineering', 85000.00, NULL),

('Bob', 'Smith', 'Male', '1985-07-20', 'bob.smith@example.com', '123-456-7891', '2021-05-23', 'Product Manager', 'Product', 95000.00, NULL),

('Carol', 'Taylor', 'Female', '1992-11-30', 'carol.taylor@example.com', '123-456-7892', '2022-04-10', 'Data Analyst', 'Data Science', 72000.00, 2),

('David', 'Brown', 'Male', '1988-03-17', 'david.brown@example.com', '123-456-7893', '2020-06-15', 'HR Manager', 'Human Resources', 67000.00, NULL),

('Eve', 'Wilson', 'Female', '1995-09-05', 'eve.wilson@example.com', '123-456-7894', '2024-03-01', 'UX Designer', 'Design', 78000.00, 2),

('Frank', 'Garcia', 'Male', '1991-08-12', 'frank.garcia@example.com', '123-456-7895', '2019-08-12', 'DevOps Engineer', 'Engineering', 83000.00, 1),

('Grace', 'Lee', 'Female', '1989-12-25', 'grace.lee@example.com', '123-456-7896', '2020-11-11', 'Marketing Specialist', 'Marketing', 63000.00, 4),

('Henry', 'Miller', 'Male', '1994-06-18', 'henry.miller@example.com', '123-456-7897', '2021-02-28', 'Sales Executive', 'Sales', 55000.00, 4),

('Ivy', 'Thomas', 'Female', '1993-03-21', 'ivy.thomas@example.com', '123-456-7898', '2023-05-18', 'Financial Analyst', 'Finance', 70000.00, 2),

('Jack', 'Wilson', 'Male', '1996-10-30', 'jack.wilson@example.com', '123-456-7899', '2023-09-01', 'Content Writer', 'Content', 60000.00, 7);

INSERT INTO employee (first_name, last_name, gender, date_of_birth, email, phone_number, hire_date, job_title, department, salary, manager_id)
VALUES 
('Anna', 'Green', 'Female', '1991-01-15', 'anna.green@example.com', '123-456-7810', '2022-07-15', 'Junior Developer', 'Engineering', 55000.00, 1),
('John', 'Doe', 'Male', '1993-08-21', 'john.doe@example.com', '123-456-7811', '2023-03-20', 'Software Engineer', 'Engineering', 75000.00, 1),
('Jane', 'Smith', 'Female', '1992-12-10', 'jane.smith@example.com', '123-456-7812', '2021-11-05', 'Data Scientist', 'Data Science', 95000.00, 2),
('Mark', 'Johnson', 'Male', '1995-02-19', 'mark.johnson@example.com', '123-456-7813', '2022-08-30', 'UX Researcher', 'Design', 65000.00, 5),
('Emily', 'Davis', 'Female', '1989-06-25', 'emily.davis@example.com', '123-456-7814', '2021-04-10', 'Product Manager', 'Product', 105000.00, 2),
('Luke', 'Brown', 'Male', '1990-11-05', 'luke.brown@example.com', '123-456-7815', '2020-09-18', 'Accountant', 'Finance', 72000.00, NULL),
('Sophia', 'Wilson', 'Female', '1988-05-17', 'sophia.wilson@example.com', '123-456-7816', '2019-12-20', 'Marketing Manager', 'Marketing', 85000.00, 7),
('Mia', 'Moore', 'Female', '1994-03-10', 'mia.moore@example.com', '123-456-7817', '2021-07-29', 'Sales Representative', 'Sales', 53000.00, 8),
('Noah', 'Taylor', 'Male', '1996-01-22', 'noah.taylor@example.com', '123-456-7818', '2022-05-14', 'HR Assistant', 'Human Resources', 45000.00, 4),
('Lily', 'Clark', 'Female', '1997-04-15', 'lily.clark@example.com', '123-456-7819', '2023-06-10', 'Marketing Specialist', 'Marketing', 62000.00, 7),
('James', 'Lee', 'Male', '1985-09-10', 'james.lee@example.com', '123-456-7820', '2018-11-22', 'Backend Developer', 'Engineering', 80000.00, 1),
('Charlotte', 'Evans', 'Female', '1994-07-05', 'charlotte.evans@example.com', '123-456-7821', '2020-02-12', 'Data Analyst', 'Data Science', 72000.00, 3),
('Oliver', 'Thomas', 'Male', '1992-03-14', 'oliver.thomas@example.com', '123-456-7822', '2021-01-25', 'UI Designer', 'Design', 67000.00, 5),
('Ava', 'Walker', 'Female', '1991-09-25', 'ava.walker@example.com', '123-456-7823', '2019-07-15', 'Finance Manager', 'Finance', 94000.00, NULL),
('Henry', 'Hall', 'Male', '1995-10-30', 'henry.hall@example.com', '123-456-7824', '2023-02-18', 'Sales Manager', 'Sales', 75000.00, 8),
('Isabella', 'Young', 'Female', '1993-11-09', 'isabella.young@example.com', '123-456-7825', '2020-03-14', 'Graphic Designer', 'Design', 60000.00, 5),
('Daniel', 'Allen', 'Male', '1990-04-29', 'daniel.allen@example.com', '123-456-7826', '2019-05-08', 'Business Analyst', 'Product', 86000.00, 2),
('Ella', 'King', 'Female', '1989-08-12', 'ella.king@example.com', '123-456-7827', '2022-09-30', 'HR Manager', 'Human Resources', 69000.00, NULL),
('Samuel', 'Scott', 'Male', '1994-02-27', 'samuel.scott@example.com', '123-456-7828', '2021-06-22', 'Operations Specialist', 'Operations', 72000.00, NULL),
('Olivia', 'Carter', 'Female', '1987-10-19', 'olivia.carter@example.com', '123-456-7829', '2017-01-15', 'Technical Lead', 'Engineering', 97000.00, 1);

INSERT INTO employee (first_name, last_name, gender, date_of_birth, email, phone_number, hire_date, job_title, department, salary, manager_id)
VALUES 
('Ana', 'Gren', 'Female', '1991-01-15', 'anna.green@example.m', '123-456-7810', '2022-07-15', 'Junior Developer', 'Eng', 55000.00, 1);

select avg(salary) from employee;
 
update employee
 set salary  =  salary + (0.5 * salary)
 where salary < (
 select avg(salary) from employee ) ;
    
    set sql_safe_updates=0;  
     
      update  employee 
      set salary=97000
      where first_name="Frank" and last_name="Garcia";
      select * from employee 
      group by department; 
          
           
            
             -- select from employee who are not in the listed department; 
             
             select * from 
             employee 
             where department not in  ( 
             select  distinct department_name from 
             department
             ) ; 
            
             
              
               
                --  each department employees with salary >  average salary ; 
                 
                    -- depart 
                 SELECT *
FROM employee e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employee
    WHERE department = e.department
);
 
  
   
   select *  from 
    employee e
   where e.salary >  ( 
     select avg(salary)  from employee where 
     department = e.department
     );  
      
       
        select departent  , salary , avg(salary)  from employee where 
     department = e.department;
                
                select department , salary ,  avg(salary) from  employee
                      where salary > avg(salary);
                
                  
                   select * from
                   employee 
                  having salary > (
                   select avg(salary) as average from employee );
                 
             SELECT 
    *
FROM
    employee e
WHERE
    salary > (SELECT 
            AVG(salary)
        FROM
            employee
        WHERE
            department = e.department);
              
         show databases;
         use lab4;
        select *  from employee  
        where (department,salary)  in (
        select department , max(salary) 
        from employee group by department);   
         
          create table department ( 
          
		dpt_let int primary key , 
        department_name varchar(20) 
           
           );            
             
             desc department;
             insert into department (dpt_let , department_name) values (1,"Design") , (2,"Engineering") , (3,"Content");