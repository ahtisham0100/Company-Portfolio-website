-- Step 1: Create the database
CREATE DATABASE task4;
USE task4;

-- Step 2: Create the Facility table
CREATE TABLE Facility (
    facno CHAR(4) PRIMARY KEY NOT NULL, 
    facname VARCHAR(30) NOT NULL
);

-- Insert values into Facility
INSERT INTO Facility VALUES  
('F100', 'FOOTBALL STADIUM'),
('F101', 'BASKETBALL ARENA'),
('F102', 'BASEBALL FIELD'),
('F103', 'RECREATION ROOM');

-- Step 3: Create the Customer1 table
CREATE TABLE Customer1 (
    custno CHAR(4) PRIMARY KEY NOT NULL, 
    custname VARCHAR(30) NOT NULL, 
    custaddress VARCHAR(20) NOT NULL,
    internal VARCHAR(3) NOT NULL, 
    contact VARCHAR(30) NOT NULL,
    phone CHAR(7) NOT NULL, 
    city VARCHAR(15) NOT NULL, 
    custstate CHAR(2) NOT NULL, 
    zip CHAR(5) NOT NULL
);

-- Insert values into Customer1
INSERT INTO Customer1 VALUES 
('C100', 'Faisal Naseer', 'Box 352200', 'YES', 'Mary Manager', '6857100', 'Boulder', 'CO', '80309'),
('C101', 'Mubashir Nazir', 'Box 352400', 'YES', 'Sally Supervisor', '5431700', 'Boulder', 'CO', '80309'),
('C103', 'Babar Nawaz', 'Box 352020', 'YES', 'Bill Baseball', '5431234', 'Boulder', 'CO', '80309'),
('C104', 'Waheed Iqbal', 'Box 351200', 'YES', 'Sue Softball', '5434321', 'Boulder', 'CO', '60309'),
('C105', 'Hashir Shahid', '123 AnyStreet', 'YES', 'Coach Bob', '4441234', 'Louisville', 'CO', '80027');

-- Step 4: Create the Employee1 table
CREATE TABLE Employee1 (
    empno CHAR(4) PRIMARY KEY NOT NULL,
    empname VARCHAR(38) NOT NULL, 
    department VARCHAR(20) NOT NULL, 
    email VARCHAR(48) NOT NULL, 
    phone CHAR(6) NOT NULL
);

-- Insert values into Employee1
INSERT INTO Employee1 VALUES
('E100', 'Alex', 'Administration', 'xyz@edu.pk', '311111'),
('E101', 'Bhatti', 'Manager', 'x@edu.pk', '311112'),
('E102', 'Ducky', 'Coach', 'z@edu.pk', '311113'),
('E103', 'Alexa', 'XYZX', 'yz@edu.pk', '311114');

-- Step 5: Create the EventRequest table
CREATE TABLE EventRequest (
    eventno CHAR(4) PRIMARY KEY NOT NULL,
    dateheld DATE NOT NULL,
    datereq DATE NOT NULL,
    facn CHAR(4) NOT NULL,
    custno CHAR(4) NOT NULL,
    dateauth DATE,
    reqstatus VARCHAR(10) NOT NULL,
    estcost DECIMAL(7,2) NOT NULL,
    estaudience INT NOT NULL,
    budno CHAR(5),
    FOREIGN KEY (facn) REFERENCES Facility(facno),
    FOREIGN KEY (custno) REFERENCES Customer1(custno)
);

-- Insert values into EventRequest
INSERT INTO EventRequest VALUES
('E100', '2018-10-25', '2018-10-01', 'F100', 'C100', '2018-10-05', 'Approved', 5000.00, 80, 'B100'),
('E104', '2018-12-03', '2018-11-20', 'F101', 'C101', '2018-11-22', 'Approved', 3000.00, 50, 'B102'),
('E105', '2018-12-03', '2018-11-25', 'F102', 'C103', '2018-11-26', 'Approved', 4500.00, 70, 'B103'),
('E106', '2018-12-12', '2018-11-30', 'F100', 'C104', '2018-12-01', 'Approved', 6000.00, 100, 'B104');

-- Step 6: Create the EventPlan table
CREATE TABLE EventPlan (
    planno CHAR(6) PRIMARY KEY NOT NULL,
    eventno CHAR(4) NOT NULL,
    workdate DATE NOT NULL,
    notes VARCHAR(50),
    activity VARCHAR(15) NOT NULL,
    empno CHAR(4),
    FOREIGN KEY (eventno) REFERENCES EventRequest(eventno),
    FOREIGN KEY (empno) REFERENCES Employee1(empno)
);

-- Insert values into EventPlan
INSERT INTO EventPlan VALUES
('P1000', 'E100', '2018-10-25', 'Standard operation', 'Operation', 'E102'),
('P1001', 'E104', '2018-12-03', 'Watch for gate crashers', 'Operation', 'E102'),
('P1002', 'E105', '2018-12-03', 'Standard operation', 'Operation', 'E102'),
('P1003', 'E106', '2018-12-12', 'Watch for seat switching', 'Operation', 'E101'),
('P1004', 'E106', '2018-12-12', 'Standard cleanup', 'Cleanup', 'E101'),
('P1005', 'E104', '2018-12-12', 'Light cleanup', 'Cleanup', 'E101'),
('P1006', 'E101', '2018-10-26', 'Extra security', 'Setup', 'E102');

-- Step 7: Create the Location table
CREATE TABLE Location (
    locno CHAR(4) PRIMARY KEY NOT NULL,
    facno CHAR(4) NOT NULL,
    locname VARCHAR(20) NOT NULL,
    FOREIGN KEY (facno) REFERENCES Facility(facno)
);

-- Insert values into Location
INSERT INTO Location VALUES
('L100', 'F100', 'Locker Room'),
('L101', 'F100', 'Plaza'),
('L102', 'F100', 'Vehicle Gate'),
('L103', 'F101', 'Locker Room'),
('L104', 'F100', 'Ticket Booth'),
('L105', 'F101', 'Gate'),
('L106', 'F100', 'Pedestrian Gate');
 
 CREATE TABLE EventRequest1 (
    eventno CHAR(4) NOT NULL,
    dateheld DATE NOT NULL,
    datereq DATE NOT NULL,
    facn CHAR(4) NOT NULL,
    custno CHAR(4) NOT NULL,
    dateauth DATE,
    ReqStatus VARCHAR(10) NOT NULL,
    estcost DECIMAL(7, 2) NOT NULL,
    estaudience INT NOT NULL,
    budno CHAR(5),
    PRIMARY KEY (eventno),
    FOREIGN KEY (facn) REFERENCES Facility,
    FOREIGN KEY (custno) REFERENCES Customer1
);
 select * from eventrequest1;
  select * from eventrequest;
  
drop table EventRequest;
show databases;  
drop table emplyoees;