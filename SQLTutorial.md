# SQL Tutorial 

### 1- Create Database

```
CREATE DATABASE movies;
CREATE DATABASE IF NOT EXISTS movies;
```

### 2- Drop Database

```
DROP DATABASE movies;
```

### 3- Show Databases

```
SHOW DATABASES;
```

### 4- Create Table

```
CREATE TABLE table1 (
    Id int,
    FirstName varchar(255),
    LastName varchar(255),
    IsActive BOOLEAN
);
```

### 5- Select Table

```
SELECT * FROM table1;
SELECT column_name FROM table1;
SELECT column1, column2, column3 FROM table1;
SELECT DISTINCT * FROM table1;
SELECT DISTINCT column1, column2, column3 FROM table1;
```

### 6- Count 

```
SELECT COUNT (DISTINCT column1) FROM table1;
```

### 7- WHERE Clause

```
SELECT column1, column2 FROM table1 WHERE condition;
SELECT * FROM Customers WHERE country='Mexico';
SELECT * FROM Customers WHERE CustomerID=1;
SELECT * FROM Customers WHERE NOT City = 'Berlin';
SELECT * FROM Customers WHERE City = 'Berlin' AND PostalCode = 12209;
SELECT * FROM Customers WHERE City = 'Berlin' OR City = 'London';
SELECT * FROM Customers WHERE Price > 30;
SELECT * FROM Customers Where Price >= 30 OR CategoryID != 2; (<>)
SELECT * FROM Customers Where Price BETWEEN 50 AND 60; (BETWEEN expression is inclusive in SQL);
```
* The WHERE clause is only used in SELECT statement, it is also used in UPDATE, DELETE statements etc..

### 8- LIKE Operator

```
SELECT column1, column2 FROM table1 LIKE pattern;
```
There are different usages of pattern. Examples are shown in below;

* The following SQL statement selects all customers with a CustomerName starting with "a":

```
SELECT * FROM Customers WHERE CustomerName LIKE 'a%';
```

* The following SQL statement selects all customers with a CustomerName ending with "a":

```
SELECT * FROM Customers WHERE CustomerName LIKE '%a';
```

* The following SQL statement selects all customers with a CustomerName that have "or" in any position:

```
SELECT * FROM Customers WHERE CustomerName LIKE '%or%';
```

* The following SQL statement selects all customers with a CustomerName that have "r" in the second position:

```
SELECT * FROM Customers WHERE CustomerName LIKE '_r%';
```

* The following SQL statement selects all customers with a ContactName that starts with "a" and ends with "o":

```
SELECT * FROM Customest WHERE ContactName LIKE 'a%o';
```

### 9- IN Operator

The IN operator allows you to specify multiple values in a WHERE clause. <br>
The IN operator is a shorthand for multiple OR Conditions.

```
SELECT * FROM Customers WHERE Country IN ('Germany', 'France', 'UK');
SELECT vnf_app_id FROM vnf_applications WHERE vnf_app_name IN ('Firewall', 'DPI', 'BGP');
SELECT * FROM Customers WHERE Country NOT IN ('Germany', 'TURKEY');
SELECT vnf_app_id FROM vnf_applications WHERE vnf_app_id >= 4 AND vnf_app_description NOT LIKE 'NAT%' 
```

### 10- ORDER BY 

```
SELECT * FROM Customers ORDER BY Country DESC, City ASC;
```

### 11- INSERT INTO

It is possible to write the INSERT INTO statement in two ways. The first way specifies both column names and the values to be interted:

```
INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
```
If we are adding values for all columns of the table, we do not to specify the column names in the SQL query.

```
INSERT INTO table_name VALUES (value1, value2, value3, ...);
```
### 12- NULL VALUES

Basically IS NULL or IS NOT NULL

```
SELECT column1 FROM table1 WHERE column1 IS NOT NULL;
SELECT vnf_app_name FROM vnf_applications WHERE parent_app_id IS NULL;
```

### 13- UPDATE

```
UPDATE table_name SET column1 = value1, column2 = value2... WHERE condition;
UPDATE user_account SET email = 'milat@ulak.com.tr' WHERE email = 'milat@argela.com.tr';
```

### 14- DELETE

```
DELETE FROM table_name WHERE condition;
DELETE FROM permission WHERE permission_key = 'common:print';
DELETE FROM customers;
```

### 15- MIN - MAX FUNCTIONS

The MIN() function returns the smallest value of selected column<br>
The MAX() function returns the smallest value of selected column.

```
SELECT MIN(column1) FROM table1 WHERE condition1;
SELECT MAX(column1) FROM table1 WHERE condition1;
```

### 16- COUNT(), AVG(), SUM() FUNCTIONS

```
SELECT COUNT(column1) FROM table1 WHERE condition1;
SELECT AVG(column1) FROM table1 WHERE condition1;
SELECT SUM(column1) FROM table1 WHERE condition1;
```

### 17- JOINS 

A JOIN clause is used to combine rows from two or more tables, based on a related column between them.

```
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
```
* INNER JOIN
* LEFT JOIN
* RIGHT JOIN
* FULL OUTER JOIN

### 18- SQL UNION

The UNION operator is used to combine the result-set of two or more SELECT statements

* Each SELECT statement within UNION must have the same number of columns
* The columns must also have similar data types
* THe columns in each SELECT statement must also be in the same order

```
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;
```

The UNION operator selects only distinct values by default. To allow duplicate values,

```
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

### 19- GROUP BY

```
SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
ORDER BY COUNT(CustomerID) DESC;
```
### 20- TRUNCATE 

THe TRUNCATE TABLE statement is used to delete the data inside table, but not table itself.

```
TRUNCATE TABLE table_name;
```

### 21- ALTER TABLE

The ALTER TABLE statement is used to add, delete, or modify columns in an existing table.

```
ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE Customers ADD Email varchar(255);
ALTER TABLE Customers DROP COLUMN Email;
```

### 22- SQL Constraints

* Constraints can be column level or table level. Column level constraints apply to a column, <br>
and table level constraints apply to the whole table.
  
    * NOT NULL
    * UNIQUE
    * PRIMARY KEY: A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table.
    * FOREIGN KEY: ????
    * DEFAULT: Sets a default value for a column when no value is specified
    
```
CREATE TABLE Persons (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    Age int );
    
ALTER TABLE Persons MODIFY Age in NOT NULL;    
```

A table can have only ONE primary key, and in the table, this primary key can consist of single <br>
or multiple columns. 

```
CREATE TABLE Orders (
    OrderID in NOT NULL,
    OrderNumber int NOT NULL,
    PersonID int,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
    );
```

The CHECK constraint is used to limit the value range that can be placed in a column. <br>
If you define a CHECK constraint on a single column it allows only certain values for this column.

```
CREATE TABLE Persons ( 
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    CHECK (Age >= 18)
    );
```

```
ALTER TABLE Persons ADD CHECH (Age >= 18);
```

### 23- AUTO INCREMENT

Auto-increment allows a unique number to be generated automatically when a new record is inserted into a table.
Often this is the primary key field what we would like to be created automatically every time a new record is insterted.


```
CREATE TABLE Persons (
    Personid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (Personid)
```


### 24- ADDITIONAL INFORMATION

* For selecting some subset of string in sql query 

```
SELECT SUBSTRING(FIRST_NAME,1,3) FROM Worker;
```

* For concatenating different entries into one entry

```
SELECT CONCAT(FIRST_NAME, ' ', LAST_NAME) AS COMPLETE_NAME FROM Worker; 
```

```
SELECT * FROM Worker WHERE FIRST_NAME <> 'Vipul' AND FIRST_NAME <> 'Satish';
SELECT * FROM Worker WHERE FIRST_NAME NOT IN ('Vipul', 'Satish');
```

```
SELECT * FROM Worker WHERE FIRST_NAME LIKE '%a%';
```

```
SELECT COUNT(DEPARTMENT) FROM Worker WHERE DEPARTMENT = 'Admin';
SELECT * FROM Worker INNER JOIN Title ON Worker.WORKER_ID = Title.WORKER_REF_ID WHERE Title.WORKER_TITLE IN ('Manager');
SELECT * FROM Worker WHERE MOD(WORKER_ID, 2) <> 0;
```

### TABLE CLONE

The general query to clone a table with data is;

```
SELECT * INTO WorkerClone FROM Worker;
```

The general way to clone a table without information is;

```
SELECT * INTO WorkerClone FROM Worker WHERE 1 = 0;
```

Fetch intersecting records of two tables

```
(SELECT * FROM table1)
INTERSECT
(SELECT * FROM table2);
```

Duration Example
```
SELECT userId, AVG(duration) FROM sessions GROUP BY userId HAVING COUNT(duration) > 1;
```

