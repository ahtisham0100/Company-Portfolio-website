CREATE DATABASE project_management_system;

USE project_management_system;

CREATE TABLE Clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(15)
);

CREATE TABLE Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    estimated_hours INT,
    status ENUM('In Progress', 'Completed', 'Delayed') DEFAULT 'In Progress',
    client_id INT,
    financial_status ENUM('Pending', 'Settled') DEFAULT 'Pending',
    FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);
select * from projects ;

CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    hourly_rate DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Timesheets (
    timesheet_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    employee_id INT,
    hours INT,
    date_worked DATE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(employee_id)
);

CREATE TABLE Invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    invoice_date DATE,
    total_amount DECIMAL(10, 2),
    status ENUM('Pending', 'Paid') DEFAULT 'Pending',
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

select * from employees;

DELIMITER //
CREATE TRIGGER generate_invoice_on_completion
AFTER UPDATE ON Projects
FOR EACH ROW
BEGIN
    DECLARE total_cost DECIMAL(10, 2);

    IF NEW.status = 'Completed' AND OLD.status != 'Completed' THEN
        SELECT SUM(t.hours * e.hourly_rate) INTO total_cost
        FROM Timesheets t
        JOIN Employees e ON t.employee_id = e.employee_id
        WHERE t.project_id = NEW.project_id;

        INSERT INTO Invoices (project_id, invoice_date, total_amount, status)
        VALUES (NEW.project_id, CURDATE(), total_cost, 'Pending');
    END IF;
END; //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE calculate_invoice_total(IN project_id INT)
BEGIN
    DECLARE total_cost DECIMAL(10, 2);

    SELECT SUM(t.hours * e.hourly_rate) INTO total_cost
    FROM Timesheets t
    JOIN Employees e ON t.employee_id = e.employee_id
    WHERE t.project_id = project_id;

    SELECT total_cost AS invoice_total;
END; //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE generate_project_report(IN project_id INT)
BEGIN
    SELECT p.project_name, p.status, SUM(t.hours) AS total_hours, 
           SUM(t.hours * e.hourly_rate) AS total_cost, i.status AS invoice_status
    FROM Projects p
    JOIN Timesheets t ON p.project_id = t.project_id
    JOIN Employees e ON t.employee_id = e.employee_id
    LEFT JOIN Invoices i ON p.project_id = i.project_id
    WHERE p.project_id = project_id
    GROUP BY p.project_name, p.status, i.status;
END; //
DELIMITER ;

UPDATE Invoices i
JOIN Projects p ON i.project_id = p.project_id
SET i.status = 'Paid'
WHERE p.financial_status = 'Settled';

DELIMITER //

CREATE TRIGGER sync_financial_status
AFTER UPDATE ON Projects
FOR EACH ROW
BEGIN
    IF NEW.financial_status = 'Settled' THEN
        UPDATE Invoices
        SET status = 'Paid'
        WHERE project_id = NEW.project_id;
    END IF;
END //

DELIMITER ;

SELECT p.project_id, p.project_name, p.financial_status, i.status AS invoice_status
FROM Projects p
LEFT JOIN Invoices i ON p.project_id = i.project_id
WHERE p.financial_status != i.status;

INSERT INTO Clients (client_name, contact_name, contact_email, contact_phone)
VALUES
('Tech Solutions', 'John Doe', 'johndoe@techsolutions.com', '1234567890'),
('Creative Agency', 'Jane Smith', 'janesmith@creativeagency.com', '0987654321'),
('Global Enterprises', 'Mark Brown', 'markbrown@globalenterprises.com', '1122334455');

INSERT INTO Projects (project_name, description, start_date, estimated_hours, status, client_id, financial_status)
VALUES
('Website Redesign', 'Redesign the company website', '2024-01-15', 200, 'In Progress', 1, 'Pending'),
('Marketing Campaign', 'Develop a marketing campaign for new product', '2024-02-01', 150, 'Delayed', 2, 'Pending'),
('Data Migration', 'Migrate data to a new system', '2024-01-01', 300, 'Completed', 3, 'Settled');

INSERT INTO Employees (employee_name, hourly_rate)
VALUES
('Alice Johnson', 50.00),
('Bob Martin', 60.00),
('Charlie Davis', 55.00),
('Diana Evans', 65.00);

INSERT INTO Timesheets (project_id, employee_id, hours, date_worked)
VALUES
(1, 1, 10, '2024-01-16'),
(1, 2, 15, '2024-01-17'),
(2, 3, 20, '2024-02-02'),
(3, 4, 25, '2024-01-05'),
(3, 1, 30, '2024-01-06');

INSERT INTO Invoices (project_id, invoice_date, total_amount, status)
VALUES
(3, '2024-01-10', 3000.00, 'Paid'),
(1, '2024-02-01', 1500.00, 'Pending');

SELECT * FROM Clients;
SELECT * FROM Projects;
SELECT * FROM Employees;
SELECT * FROM Timesheets;
SELECT * FROM Invoices;

UPDATE Projects SET status = 'Completed' WHERE project_id = 2;

SELECT * FROM Invoices WHERE project_id = 2;

CALL calculate_invoice_total(2);

TRUNCATE TABLE Timesheets;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE employees;
SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Projects;
SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE clients;
SET FOREIGN_KEY_CHECKS = 1;

TRUNCATE TABLE invoices;


CALL generate_project_report(1);




DELIMITER //

CREATE PROCEDURE issueBook(
    IN bookid INT,
    IN member_id INT
)
BEGIN
    DECLARE availablecopies INT; -- Declare a variable for available copies

    -- Retrieve the number of available copies for the book
    SELECT CopiesAvailable
    INTO availablecopies
    FROM Books
    WHERE BookID = bookid;

    -- Check if there are copies available
    IF availablecopies > 0 THEN
        -- Update the CopiesAvailable column in Books table
        UPDATE Books
        SET CopiesAvailable = CopiesAvailable - 1
        WHERE BookID = bookid;

        -- Insert a record into BorrowedBooks table
        INSERT INTO BorrowedBooks (BookID, MemberID, BorrowDate, ReturnDate)
        VALUES (bookid, member_id, CURDATE(), NULL);
    ELSE
        -- Raise an error for no available copies
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Book not available!';
    END IF;
END //

DELIMITER ;