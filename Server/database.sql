--Domain Creation 
CREATE DOMAIN EmailDomain AS VARCHAR(50)
	CHECK (VALUE ~ '^[a-zA-Z0-9.%]+@[a-zA-Z]+\.[a-zA-Z]+$');

CREATE DOMAIN PasswordDomain AS VARCHAR(15)
	CHECK (VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})[a-zA-Z0-9!@#$%^&*]+$');

CREATE DOMAIN PhoneNoDomain AS VARCHAR(15)
	CHECK (VALUE ~ '^\+[0-9]{1,3}[0-9]{10}$');
 
-- ensures uniqueness between the Admin and Maintenance_Staff tables for the Emp_ID attribute--

CREATE DOMAIN AgeDomain AS INT
	CHECK (VALUE >= 0 AND VALUE <= 120);
 	
CREATE DOMAIN ID AS VARCHAR(38);

CREATE DOMAIN UserRole AS VARCHAR (15) 
    CHECK (VALUE IN ('Admin','Employee','Owner','Tenant'));

-- Create table Owner
CREATE TABLE Owner (
    Owner_id VARCHAR(38),
    Name VARCHAR(20),
    SSN VARCHAR(9) NOT NULL,
    Phone_no VARCHAR(10) NOT NULL,
    Address VARCHAR(30),
    Email VARCHAR(50),
    PRIMARY KEY (Owner_id)
);

-- Create table Payment
CREATE TABLE Payment (
    Payment_id VARCHAR(38),
    Mode VARCHAR(10),
    Payment_date DATE,
    Amount NUMERIC(5,2),
    Owner_id VARCHAR(38),
    Tenant_id VARCHAR(38),
    PRIMARY KEY (Payment_id)
);

-- Create table Login
CREATE TABLE Login (
    Email VARCHAR(50),
    Password VARCHAR(72) NOT NULL,
    Role VARCHAR(15) NOT NULL,
    PRIMARY KEY (Email)
);

-- Create table Admin
CREATE TABLE Admin (
    Emp_ID VARCHAR(38),
    Name CHAR(10),
    Phone VARCHAR(10),
    Shift_Timings VARCHAR(50),
    Authorization_Type VARCHAR(15),
    Email VARCHAR(50),
    PRIMARY KEY (Emp_ID)
);

-- Create table Maintenance Staff
CREATE TABLE Maintenance_Staff (
    Emp_ID VARCHAR(38),
    Name CHAR(10),
    Phone VARCHAR(10),
    Shift_Timings VARCHAR(50),
    Contract_Length VARCHAR(20),
    Role VARCHAR(20),
    Email VARCHAR(50),
    PRIMARY KEY (Emp_ID)
);

-- Create table Tenant
CREATE TABLE Tenant (
    Tenant_id VARCHAR(38), 
    Name CHAR(20) NOT NULL, 
    SSN VARCHAR(9) NOT NULL, 
    Age INT,
    Perm_address VARCHAR(50), 
    Apt_no VARCHAR(10), 
    Email VARCHAR(50), 
    phone_no VARCHAR(10),
    block_id INT,
    PRIMARY KEY (Tenant_id)
);

-- Create table Tenant_Contact
CREATE TABLE Tenant_Contact (
    Tenant_id VARCHAR(38), 
    Phone VARCHAR(10), 
    PRIMARY KEY (Tenant_id, Phone)
);

-- Create table Block
CREATE TABLE Block (
    Block_id INT, 
    Block_name VARCHAR(10) NOT NULL, 
    Address VARCHAR(50), 
    PRIMARY KEY (Block_id)
);

-- Create table Apartment
CREATE TABLE Apartment (
    Apt_No VARCHAR(10), 
    Block_id INT, 
    Bedrooms INT NOT NULL, 
    Type VARCHAR(10) NOT NULL, 
    Area INT NOT NULL, 
    Floor INT NOT NULL, 
    Address VARCHAR(50) NOT NULL, 
    Owner_id VARCHAR(38), 
    PRIMARY KEY (Apt_No, Block_id)
    -- PRIMARY KEY (Apt_No)

);

-- Create table Parking
CREATE TABLE Parking (
    Spot_no INT, 
    Type VARCHAR(10), 
    Block_id INT, 
    Tenant_id VARCHAR(38), 
    PRIMARY KEY (Spot_no)
);

-- Create table Manages
CREATE TABLE Manages (
    Emp_ID VARCHAR(38), 
    Block_id INT, 
    PRIMARY KEY (Emp_ID, Block_id)
);

-- Create table Complaint
CREATE TABLE Complaint (
    Complaint_ID VARCHAR(38),
    Complaint_description VARCHAR(100) NOT NULL,
    Complaint_date DATE NOT NULL,
    Emp_ID VARCHAR(38),
    Tenant_id VARCHAR(38),
    PRIMARY KEY (Complaint_ID)
);

-- Create table Rents
CREATE TABLE Rents (
    Tenant_id VARCHAR(38), 
    Owner_id VARCHAR(38), 
    Rent_amount NUMERIC(5,2) NOT NULL,  
    PRIMARY KEY(Tenant_id, Owner_id)  
);

-- Create table Apartment_application
CREATE TABLE Apartment_application (
    Email VARCHAR(50),  
    Phone VARCHAR(10) NOT NULL,
    Name CHAR(20),  
    Apt_address VARCHAR(50),  
    Owner_id VARCHAR(38),  
    PRIMARY KEY(Email)  
);

-- Add foreign key constraints using ALTER TABLE statements
ALTER TABLE Owner ADD CONSTRAINT fk_owner_login FOREIGN KEY (Email) REFERENCES Login ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Payment ADD CONSTRAINT fk_payment_owner FOREIGN KEY (Owner_id) REFERENCES Owner ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Payment ADD CONSTRAINT fk_payment_tenant FOREIGN KEY (Tenant_id) REFERENCES Tenant ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Admin ADD CONSTRAINT fk_admin_login FOREIGN KEY (Email) REFERENCES Login ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Maintenance_Staff ADD CONSTRAINT fk_maintenance_staff_login FOREIGN KEY (Email) REFERENCES Login ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Tenant ADD CONSTRAINT fk_tenant_login FOREIGN KEY (Email) REFERENCES Login ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Tenant ADD CONSTRAINT fk_tenant_apartment FOREIGN KEY (Apt_no,block_id) REFERENCES Apartment;
ALTER TABLE Tenant_Contact ADD CONSTRAINT fk_tenant_contact FOREIGN KEY (Tenant_id) REFERENCES Tenant ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Apartment ADD CONSTRAINT fk_apartment_block FOREIGN KEY (Block_id) REFERENCES Block ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Apartment ADD CONSTRAINT fk_apartment_owner FOREIGN KEY (Owner_id) REFERENCES Owner ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Parking ADD CONSTRAINT fk_parking_block FOREIGN KEY (Block_id) REFERENCES Block ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Parking ADD CONSTRAINT fk_parking_tenant FOREIGN KEY (Tenant_id) REFERENCES Tenant ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Manages ADD CONSTRAINT fk_manages_admin FOREIGN KEY (Emp_ID) REFERENCES Admin ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Manages ADD CONSTRAINT fk_manages_block FOREIGN KEY (Block_id) REFERENCES Block ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Complaint ADD CONSTRAINT fk_complaint_maintenance_staff FOREIGN KEY (Emp_ID) REFERENCES Maintenance_Staff ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Complaint ADD CONSTRAINT fk_complaint_tenant FOREIGN KEY (Tenant_id) REFERENCES Tenant ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Rents ADD CONSTRAINT fk_rents_tenant FOREIGN KEY (Tenant_id) REFERENCES Tenant ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Rents ADD CONSTRAINT fk_rents_owner FOREIGN KEY (Owner_id) REFERENCES Owner ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Apartment_application ADD CONSTRAINT fk_apartment_application_login FOREIGN KEY (Email) REFERENCES Login ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE Apartment_application ADD CONSTRAINT fk_apartment_application_owner FOREIGN KEY (Owner_id) REFERENCES Owner ON UPDATE CASCADE ON DELETE CASCADE;


--Alter table to add cascade constraints
ALTER TABLE Owner
DROP CONSTRAINT IF EXISTS fk_owner_login,
ADD CONSTRAINT fk_owner_login
FOREIGN KEY (Email) 
REFERENCES Login 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Payment
DROP CONSTRAINT IF EXISTS fk_payment_owner,
ADD CONSTRAINT fk_payment_owner
FOREIGN KEY (Owner_id) 
REFERENCES Owner 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Payment
DROP CONSTRAINT IF EXISTS fk_payment_tenant,
ADD CONSTRAINT fk_payment_tenant
FOREIGN KEY (Tenant_id) 
REFERENCES Tenant 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Admin
DROP CONSTRAINT IF EXISTS fk_admin_login,
ADD CONSTRAINT fk_admin_login
FOREIGN KEY (Email) 
REFERENCES Login 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Maintenance_Staff
DROP CONSTRAINT IF EXISTS fk_maintenance_staff_login,
ADD CONSTRAINT fk_maintenance_staff_login
FOREIGN KEY (Email) 
REFERENCES Login 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Tenant
DROP CONSTRAINT IF EXISTS fk_tenant_login,
ADD CONSTRAINT fk_tenant_login
FOREIGN KEY (Email) 
REFERENCES Login 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Tenant
DROP CONSTRAINT IF EXISTS fk_tenant_apartment,
ADD CONSTRAINT fk_tenant_apartment
FOREIGN KEY (Apt_no) 
REFERENCES Apartment 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Tenant_Contact
DROP CONSTRAINT IF EXISTS fk_tenant_contact,
ADD CONSTRAINT fk_tenant_contact
FOREIGN KEY (Tenant_id) 
REFERENCES Tenant 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Apartment
DROP CONSTRAINT IF EXISTS fk_apartment_block,
ADD CONSTRAINT fk_apartment_block
FOREIGN KEY (Block_id) 
REFERENCES Block 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Apartment
DROP CONSTRAINT IF EXISTS fk_apartment_owner,
ADD CONSTRAINT fk_apartment_owner
FOREIGN KEY (Owner_id) 
REFERENCES Owner 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Parking
DROP CONSTRAINT IF EXISTS fk_parking_block,
ADD CONSTRAINT fk_parking_block
FOREIGN KEY (Block_id) 
REFERENCES Block 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Parking
DROP CONSTRAINT IF EXISTS fk_parking_tenant,
ADD CONSTRAINT fk_parking_tenant
FOREIGN KEY (Tenant_id) 
REFERENCES Tenant 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Manages
DROP CONSTRAINT IF EXISTS fk_manages_admin,
ADD CONSTRAINT fk_manages_admin
FOREIGN KEY (Emp_ID) 
REFERENCES Admin 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Manages
DROP CONSTRAINT IF EXISTS fk_manages_block,
ADD CONSTRAINT fk_manages_block
FOREIGN KEY (Block_id) 
REFERENCES Block 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Complaint
DROP CONSTRAINT IF EXISTS fk_complaint_maintenance_staff,
ADD CONSTRAINT fk_complaint_maintenance_staff
FOREIGN KEY (Emp_ID) 
REFERENCES Maintenance_Staff 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Complaint
DROP CONSTRAINT IF EXISTS fk_complaint_tenant,
ADD CONSTRAINT fk_complaint_tenant
FOREIGN KEY (Tenant_id) 
REFERENCES Tenant 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Rents
DROP CONSTRAINT IF EXISTS fk_rents_tenant,
ADD CONSTRAINT fk_rents_tenant
FOREIGN KEY (Tenant_id) 
REFERENCES Tenant 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Rents
DROP CONSTRAINT IF EXISTS fk_rents_owner,
ADD CONSTRAINT fk_rents_owner
FOREIGN KEY (Owner_id) 
REFERENCES Owner 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Apartment_application
DROP CONSTRAINT IF EXISTS fk_apartment_application_login,
ADD CONSTRAINT fk_apartment_application_login
FOREIGN KEY (Email) 
REFERENCES Login 
ON UPDATE CASCADE 
ON DELETE CASCADE;

ALTER TABLE Apartment_application
DROP CONSTRAINT IF EXISTS fk_apartment_application_owner,
ADD CONSTRAINT fk_apartment_application_owner
FOREIGN KEY (Owner_id) 
REFERENCES Owner 
ON UPDATE CASCADE 
ON DELETE CASCADE;

-- unique combination of address and block_name
ALTER TABLE block
ADD CONSTRAINT unique_block_address UNIQUE (block_name, address);
--Check all non cascade foreign keys
SELECT conname AS constraint_name,
       conrelid::regclass AS table
FROM pg_constraint
WHERE contype = 'f'
  AND confdeltype <> 'c';

-- Adding New Admin Manually
INSERT INTO Login (Email,Password,Role) VALUES ('john@example.com','admin123','Admin');

INSERT INTO Admin (Emp_ID, Name, Phone, Shift_Timings, Authorization_Type, Email)
VALUES ('A88494d28-3ef3-45ff-91bf-04a50b6d2d8e', 'John', '1234567890', '9:00 AM - 5:00 PM', 'Admin', 'john@example.com');

-- ADD a new table named signups that admin can approve for login and correctly assign the role;

-- Initilize parking pkey to be composite 
ALTER TABLE parking DROP CONSTRAINT parking_pkey;
ALTER TABLE parking ADD PRIMARY KEY (spot_no, block_id);



CREATE ROLE admin_role LOGIN PASSWORD 'admin_password';
CREATE ROLE app_owner_role LOGIN PASSWORD 'owner_password';
CREATE ROLE tenant_role LOGIN PASSWORD 'tenant_password';
CREATE ROLE employee_role LOGIN PASSWORD 'tenant_password';

-- admin
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_admin_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_admin_role;



-- owner
-- Grant access to view their properties
GRANT SELECT ON TABLE apartment TO app_owner_role;
-- Grant access to manage (respond to) complaints related to their properties
GRANT SELECT, UPDATE ON TABLE complaint TO app_owner_role;
-- Grant access to view payments for their properties
GRANT SELECT ON TABLE payment TO app_owner_role;
-- Grant access to view tenants for their properties
GRANT SELECT ON tenant TO app_owner_role;


--tenant
-- Grant access to make payments and view their own payments
GRANT INSERT, SELECT ON TABLE payment TO app_tenant_role;
-- Grant access to file and view their complaints
GRANT INSERT, SELECT ON TABLE complaint TO app_tenant_role;
-- Grant access to view their apartment details
GRANT SELECT ON TABLE apartment TO app_tenant_role;

