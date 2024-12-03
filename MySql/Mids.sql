CREATE DATABASE college;
USE college;  
 
CREATE TABLE student (
    sid INT PRIMARY KEY,
    sname VARCHAR(50),
    cgpa DECIMAL(3, 1),
    dob DATE,
    did INT
);
 
   
   CREATE TABLE course (
    code INT PRIMARY KEY,
    title VARCHAR(50),
    hours INT
);

CREATE TABLE depart (
    did INT PRIMARY KEY,
    dname VARCHAR(50)
);
 
  
  CREATE TABLE std_course (
    sid INT,
    coursecode INT,
    credhours INT,
    FOREIGN KEY (sid) REFERENCES student(sid),
    FOREIGN KEY (coursecode) REFERENCES course(code)
); 
   
   drop table std_course;
   update std_course set code= coursecode;
 
 INSERT INTO student (sid, sname, cgpa, dob, did) VALUES
(101, 'Alice', 3.5, '1998-01-15', 1),
(102, 'Bob', 3.3, '1999-04-20', 2),
(103, 'Charlie', 3.2, '2000-07-05', 1),
(104, 'David', 2.8, '1997-12-18', 1),
(105, 'Emily', 3.9, '2001-12-01', 3),
(106, 'Frank', 3.7, '2002-02-10', 5),
(107, 'Grace', 3.5, '1999-08-25', 8),
(108, 'Henry', 3.9, '2000-11-12', 7),
(109, 'Ivy', 3.2, '2001-03-25', 2),
(110, 'Jack', 3.1, '2001-05-05', 6),
(111, 'Zainab', 3.5, '2005-02-07', 9),
(112, 'Hawa', 3.2, '2008-06-01', 2);


INSERT INTO course (code, title, hours) VALUES
(1001, 'dbms', 4),
(1002, 'AI', 3),
(1003, 'ML', 3),
(1004, 'Algorithms', 4),
(1005, 'Com_network', 3),
(1006, 'Web_Dev', 3),
(1007, 'Data_Mining', 3),
(1008, 'OS', 3),
(1009, 'dsa', 4),
(1010, 'prob', 2);
 
  
  INSERT INTO depart (did, dname) VALUES
(1, 'CS'),
(2, 'EE'),
(3, 'Maths'),
(4, 'Physics'),
(5, 'Chemistry'),
(6, 'Biology'),
(7, 'History'),
(8, 'English'),
(9, 'Economics'),
(10, 'Psy');


INSERT INTO std_course (sid, coursecode, credhours) VALUES 
(101, 1001, 4),
(102, 1002, 3),
(103, 1003, 3),
(104, 1004, 4),
(105, 1005, 3),
(106, 1006, 3),
(107, 1007, 3),
(108, 1008, 3),
(109, 1009, 4)  ; 
  
  select * from student 
  where cgpa =3.9;
 
 
 
  select * from student 
  where cgpa = (
   select  cgpa from  student  
   order by cgpa desc  limit 1  
 ) ; 
    
     

select * from student;
     --  Display department id that has max number of student enrolled 
     select did , count(did) as maxstudents from student 
     group by did order by did limit 1  ;
     
    --  Display student id who are not enrolled in any course 
     
      
       select sid from student
       where  sid not  in ( 
       select  sid from std_course
       ) ;
      
      
       
       
        -- Display department id that has more student than cs department 
 
  select did   from student 
       group by did
       having count(*) < (
        select count(*) from student where did = (select did from depart where dname="cs")
        );
       
         
-- department id with maximum number of students; 

select did  , count(*) as max_students  
from student group by did order by count(*) DESC limit 1; 
        

-- Display dept wise highest and lowest cgpa  
 
 select did , max(cgpa)   , min(cgpa) from student 
 group by did ;
 
  
   -- total number of credit hours a student has taken 
    
    select sid ,  sum(credhours) as " Total Credit Hours " from  
    std_course group by sid order by sum(credhours) desc;

