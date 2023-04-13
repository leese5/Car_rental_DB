-- Sources:
-- This code was written by referencing various resources:
-- The Intro to SQL Exploration in the Week 3 Module, https://canvas.oregonstate.edu/courses/1901738/pages/exploration-intro-to-sql?module_item_id=22733693 
-- Activity 1, 2, 3 in Week 3 Module, https://canvas.oregonstate.edu/courses/1901738/pages/module-3-overview?module_item_id=22733690 
-- SQL Primary Key examples from W3 Schools, https://www.w3schools.com/mySQl/sql_ref_primary_key.asp 
-- SQL Foreign Key examples from W3 Schools, https://www.w3schools.com/SQL/sql_ref_foreign_key.asp 

-- Kestt van Zyl and Seongki Lee Group 154

-- Creating Vehicles Table
CREATE OR REPLACE TABLE Vehicles (
    vehicle_id int NOT NULL,
    segment varchar(255),
    brand varchar(255),
    name varchar(255),
    plate varchar(255),
    active int,
    PRIMARY KEY (vehicle_id)
);

-- Creating Branches Table
CREATE OR REPLACE TABLE Branches (
    branch_id int NOT NULL,
    branch_address varchar(255),
    active int,
    PRIMARY KEY (branch_id, branch_address),
    UNIQUE (branch_id)
);

-- Creating Users Table
CREATE OR REPLACE TABLE Users (
    user_id int NOT NULL,
    user_name varchar(255),
    rental_date date,
    return_date date,
    PRIMARY KEY (user_id, user_name, rental_date, return_date),
    UNIQUE (user_id)
);

-- Creating Rental_History Table
CREATE OR REPLACE TABLE Rental_History (
    rental_id int NOT NULL AUTO_INCREMENT,
    branch_id int NOT NULL,
    branch_address varchar(255),
    vehicle_id int,
    user_id int NOT NULL,
    user_name varchar(255),
    rental_date date,
    return_date date,
    PRIMARY KEY (rental_id),
    FOREIGN KEY (branch_id, branch_address) REFERENCES Branches(branch_id, branch_address),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    FOREIGN KEY (user_id, user_name, rental_date, return_date) REFERENCES Users(user_id, user_name, rental_date, return_date),
    UNIQUE (rental_id)
);

-- Populating the Users Table
INSERT INTO Users (user_id, user_name, rental_date, return_date)
VALUES (104, 'June Arbough', '2023-02-09', '2023-02-10'),
(115, 'John News', '2023-02-09', '2023-02-10'),
(109, 'Alice Johnson', '2023-02-09', '2023-02-10'),
(132, 'William Smith', '2023-02-09', '2023-02-10'),
(117, 'David Senior', '2023-02-09', '2023-02-10'),
(125, 'Annelise Jones', '2023-02-09', '2023-02-10'),
(146, 'James Frommer', '2023-02-09', '2023-02-10'),
(113, 'Anne Ramoras', '2023-02-09', '2023-02-10'),
(126, 'Delbert Joen', '2023-02-09', '2023-02-10'),
(163, 'Geoff Wabash', '2023-02-09', '2023-02-10'),
(155, 'Maria Alonzo', '2023-02-09', '2023-02-10'),
(156, 'Travis Bwangi', '2023-02-09', '2023-02-11'),
(123, 'Ralph Washington', '2023-02-09', '2023-02-12'),
(153, 'James Lee', '2023-02-09', '2023-02-13'),
(147, 'Darlene Smithson', '2023-02-09', '2023-02-14');

-- Populating the Branches Table
INSERT INTO Branches (branch_id, branch_address, active)
Values (1, '4 SW 3rd St', 1),
(2, '22 9th St', 1),
(3, '264 Monroe Ave', 1),
(4, '123 Monroe Ave', 1);

-- Populating the Vehicles Table
INSERT INTO Vehicles (vehicle_id, segment, brand, name, plate, active)
Values (4123, 'Compact', 'Honda', 'Civic', '924-FQL', 1),
(2123, 'Mid-Size', 'Toyota', 'Camry', '729-JRK', 1),
(4122, 'Compact', 'Honda', 'Civic', '917-LKE', 1),
(4121, 'Cross-Over', 'Ford', 'Escape', '871-FQT', 0),
(1123, 'Full-Size', 'Chevrolet', 'Impala', '824-GQL', 1),
(3123, 'SUV', 'Ford', 'Expedition', '974-FAL', 0),
(1124, 'SUV', 'Chevrolet', 'Tahoe', '687-ADL', 0),
(4124, 'SUV', 'GMC', 'Yukon', '892-PIL', 0),
(3213, 'Pick-Up Truck', 'Ford', 'F-150', '741-JKL', 0),
(1423, 'Pick_Up Truck', 'Chevrolet', 'Silverado', '999-ABC', 0),
(4252, 'Cross-Over', 'Toyota', 'Rav-4', '989-WXZ', 0),
(2423, 'Cross-Over', 'Ford', 'Escape', '574-NPQ', 0),
(3311, 'Mini-Van', 'Chrysler', 'Pacifica', '774-MOH', 0),
(1223, 'Mini-Van', 'Honda', 'Odyssey', '759-JHF', 0),
(1332, 'Mini-Van', 'Toyota', 'Sienna', '751-ZLT', 0);

-- Populating the Vehicles Table
INSERT INTO Rental_History (branch_id, branch_address, vehicle_id, user_id, user_name, rental_date, return_date)
Values (1, '4 SW 3rd St', 4123, 104, 'June Arbough', '2023-02-09', '2023-02-10'),
(2, '22 9th St', 2123, 115, 'John News', '2023-02-09', '2023-02-10'),
(3, '264 Monroe Ave', 4122, 109, 'Alice Johnson', '2023-02-09', '2023-02-10'),
(4, '123 Monroe Ave', 4121, 132, 'William Smith', '2023-02-09', '2023-02-10'),
(1, '4 SW 3rd St', 1123, 117, 'David Senior', '2023-02-09', '2023-02-10'),
(2, '22 9th St', 3123, 125, 'Annelise Jones', '2023-02-09', '2023-02-10'),
(3, '264 Monroe Ave', 1124, 146, 'James Frommer', '2023-02-09', '2023-02-10'),
(4, '123 Monroe Ave', 4124, 113, 'Anne Ramoras', '2023-02-09', '2023-02-10'),
(1, '4 SW 3rd St', 3213, 126, 'Delbert Joen', '2023-02-09', '2023-02-10'),
(2, '22 9th St', 1423, 163, 'Geoff Wabash', '2023-02-09', '2023-02-10'),
(3, '264 Monroe Ave', 4252, 155, 'Maria Alonzo', '2023-02-09', '2023-02-10'),
(4, '123 Monroe Ave', 2423, 156, 'Travis Bwangi', '2023-02-09', '2023-02-11'),
(1, '4 SW 3rd St', 3311, 123, 'Ralph Washington', '2023-02-09', '2023-02-12'),
(2, '22 9th St', 1223, 153, 'James Lee', '2023-02-09', '2023-02-13'),
(3, '264 Monroe Ave', 1332, 147, 'Darlene Smithson', '2023-02-09', '2023-02-14');