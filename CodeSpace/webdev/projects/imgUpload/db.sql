 CREATE DATABASE companyblogs;
use companyblogs;
create table post(
postname varchar(30)  primary key
);

create table explanation(
paragraph varchar(255),
post varchar(30) ,
foreign key(post) references post(postname)
);


create table images(
post varchar(30), 
imageaddress  varchar(50),
foreign key(post) references post(postname)
);
