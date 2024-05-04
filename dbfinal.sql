--Domain Creation 
CREATE DOMAIN EmailDomain AS VARCHAR(50)
	CHECK (VALUE ~ '^[a-zA-Z0-9.%]+@[a-zA-Z]+\.[a-zA-Z]+$');

CREATE DOMAIN PasswordDomain AS VARCHAR(15)
	CHECK (VALUE ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})[a-zA-Z0-9!@#$%^&*]+$');

CREATE DOMAIN PhoneNoDomain AS VARCHAR(15)
	CHECK (VALUE ~ '^\+[0-9]{11,15}$');
-- ensures uniqueness between the Admin and Maintenance_Staff tables for the Emp_ID attribute--
CREATE DOMAIN EmpIDDomain AS VARCHAR(10)
	CHECK (VALUE NOT IN (
    	SELECT Emp_ID FROM Admin
    	UNION ALL
    	SELECT Emp_ID FROM Maintenance_Staff));

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
    password VARCHAR(72) NOT NULL,
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
    Apt_no VARCHAR(10),
    addresss VARCHAR(50),
    block_id INT,  
    Owner_id id,  
    PRIMARY KEY(Email)  
);

--  TABLES REQUIRED FOR ARCHIVING OF DATA OR DATA STORAGE

CREATE TABLE tenant_archive (
    tenant_id INT PRIMARY KEY,
    age INT,
    ssn VARCHAR(11),
    name VARCHAR(255),
    perm_address TEXT,
    apt_no VARCHAR(255),
    email VARCHAR(255),
    archived_date DATE 
);

CREATE TABLE owner_archive (
   owner_id id,
    Name VARCHAR(20),
    SSN VARCHAR(9) NOT NULL,
    Phone_no phonenodomain NOT NULL,
    Address VARCHAR(30),
    Email emaildomain,
    archived_date DATE
    PRIMARY KEY (owner_id)
    
);

CREATE TABLE apartment_archive (
    Apt_No VARCHAR(10), 
    Block_id INT, 
    Bedrooms INT NOT NULL, 
    Type VARCHAR(10) NOT NULL, 
    Area INT NOT NULL, 
    Floor INT NOT NULL, 
    Address VARCHAR(50) NOT NULL, 
    owner_id id,  
    Archived_date DATE NOT NULL,  
    PRIMARY KEY (Apt_No, Block_id)
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


CREATE ROLE app_admin_role LOGIN PASSWORD 'admin_password';
CREATE ROLE app_owner_role LOGIN PASSWORD 'owner_password';
CREATE ROLE app_tenant_role LOGIN PASSWORD 'tenant_password';

-- GRANT CONNECT ON DATABASE AptMgmt TO app_admin_role ;
-- GRANT CONNECT ON DATABASE AptMgmt TO app_owner_role ;
-- GRANT CONNECT ON DATABASE AptMgmt TO app_tenant_role ;

-- admin
-- GRANT USAGE ON SCHEMA schema_name TO app_admin_role;
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

--VIEWS
CREATE VIEW TenantInformation AS 
SELECT t.Tenant_id, t.Name AS Tenant_Name, t.SSN AS Tenant_SSN, t.Age, t.Perm_address AS Tenant_Address, a.Apt_No, a.Block_id, a.Bedrooms, a.Type AS Apartment_Type, a.Area AS Apartment_Area, a.Floor, a.Address AS Apartment_Address
FROM Tenant t
JOIN Apartment a ON t.Apt_no = a.Apt_No;

CREATE VIEW TenantInformation AS 
SELECT t.Tenant_id, t.Name AS Tenant_Name, t.SSN AS Tenant_SSN, t.Age, t.Perm_address AS Tenant_Address, a.Apt_No, a.Block_id, a.Bedrooms, a.Type AS Apartment_Type, a.Area AS Apartment_Area, a.Floor, a.Address AS Apartment_Address
FROM Tenant t
JOIN Apartment a ON t.Apt_no = a.Apt_No;

CREATE VIEW ComplaintHistory AS
SELECT c.Complaint_ID, c.Complaint_description, c.Complaint_date, 
       CASE 
            WHEN c.Tenant_id IS NOT NULL THEN 'Tenant'
            WHEN c.Emp_ID IS NOT NULL THEN 'Maintenance Staff'
            ELSE 'Unknown'
       END AS Complainant_Type,
       CASE 
            WHEN c.Tenant_id IS NOT NULL THEN t.Name
            WHEN c.Emp_ID IS NOT NULL THEN m.Name
            ELSE NULL
       END AS Complainant_Name
FROM Complaint c
LEFT JOIN Tenant t ON c.Tenant_id = t.Tenant_id
LEFT JOIN Maintenance_Staff m ON c.Emp_ID = m.Emp_ID;

CREATE VIEW ApartmentAvailability AS
 SELECT a.apt_no,
    a.block_id,
    a.address,
    b.block_name,
        CASE
            WHEN p.tenant_id IS NULL THEN 'Vacant'::text
            ELSE 'Occupied'::text
        END AS availability
   FROM apartment a
     LEFT JOIN parking p ON a.block_id = p.block_id
     LEFT JOIN tenant t ON t.apt_no::text = a.apt_no::text AND t.block_id = a.block_id
     LEFT JOIN block b ON t.block_id = b.block_id;


CREATE VIEW AdminDashboard AS
SELECT 
    (SELECT COUNT(*) FROM Tenant) AS Total_Tenants,
    (SELECT COUNT(*) FROM Complaint) AS Total_Complaints,
    (SELECT SUM(Amount) FROM Payment) AS Total_Payments,
    (SELECT COUNT(*) FROM Maintenance_Staff) AS Total_Maintenance_Staff,
    (SELECT COUNT(*) FROM Apartment) AS Total_Apartments,
    (SELECT COUNT(*) FROM Parking) AS Total_Parking_Spots;



-- INDEXIG OF THE DATABASE
CREATE INDEX idx_login_email ON Login(Email);
CREATE INDEX idx_admin_adminid ON Admin(Emp_ID);
CREATE INDEX idx_employee_empid ON maintenance_staff(Emp_ID);
CREATE INDEX idx_owner_ownerid ON Owner(Owner_ID);
CREATE INDEX idx_complaint_complaintid ON Complaint(Complaint_ID);