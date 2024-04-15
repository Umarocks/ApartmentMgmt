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
    Owner_id id,
    Name VARCHAR(20),
    SSN VARCHAR(9) NOT NULL,
    Phone_no phonenodomain NOT NULL,
    Address VARCHAR(30),
    Email emaildomain,
    PRIMARY KEY (Owner_id)
);

-- Create table Payment
CREATE TABLE Payment (
    Payment_id id,
    Mode VARCHAR(10),
    Payment_date DATE,
    Amount NUMERIC(5,2),
    Owner_id id,
    Tenant_id id,
    PRIMARY KEY (Payment_id)
);

-- Create table Login
CREATE TABLE Login (
    Email emaildomain,
    Password VARCHAR(72) NOT NULL,
    Role userrole NOT NULL,
    PRIMARY KEY (Email)
);

-- Create table Admin
CREATE TABLE Admin (
    Emp_ID id,
    Name CHAR(10),
    Phone phonenodomain,
    Shift_Timings VARCHAR(50),
    Authorization_Type userrole,
    Email emaildomain,
    PRIMARY KEY (Emp_ID)
);

-- Create table Maintenance Staff
CREATE TABLE Maintenance_Staff (
    Emp_ID id,
    Name CHAR(10),
    Phone phonenodomain,
    Shift_Timings VARCHAR(50),
    Contract_Length VARCHAR(20),
    Role userrole,
    Email emaildomain,
    PRIMARY KEY (Emp_ID)
);

-- Create table Tenant
CREATE TABLE Tenant (
    Tenant_id id, 
    Name CHAR(20) NOT NULL, 
    SSN VARCHAR(9) NOT NULL, 
    Age INT,
    Perm_address VARCHAR(50), 
    Apt_no VARCHAR(10), 
    Email emaildomain, 
    phone_no phonenodomain,
    block_id INT,
    PRIMARY KEY (Tenant_id)
);

-- Create table Tenant_Contact
CREATE TABLE Tenant_Contact (
    Tenant_id id, 
    Phone phonenodomain, 
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
    Owner_id id, 
    PRIMARY KEY (Apt_No, Block_id)
    -- PRIMARY KEY (Apt_No)

);

-- Create table Parking
CREATE TABLE Parking (
    Spot_no INT, 
    Type VARCHAR(10), 
    Block_id INT, 
    Tenant_id id, 
    PRIMARY KEY (Spot_no)
);

-- Create table Manages
CREATE TABLE Manages (
    Emp_ID id, 
    Block_id INT, 
    PRIMARY KEY (Emp_ID, Block_id)
);

-- Create table Complaint
CREATE TABLE Complaint (
    Complaint_ID id,
    Complaint_description VARCHAR(100) NOT NULL,
    Complaint_date DATE NOT NULL,
    Emp_ID id,
    Tenant_id id,
    PRIMARY KEY (Complaint_ID)
);

-- Create table Rents
CREATE TABLE Rents (
    Tenant_id id, 
    Owner_id id, 
    Rent_amount NUMERIC(5,2) NOT NULL,  
    PRIMARY KEY(Tenant_id, Owner_id)  
);

-- Create table Apartment_application
CREATE TABLE Apartment_application (
    Email emaildomain,  
    Phone phonenodomain NOT NULL,
    Name CHAR(20),  
    Apt_address VARCHAR(50),  
    Owner_id id,  
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
