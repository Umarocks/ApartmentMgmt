-- to log all the complaints ( we need to create log table )
-- since admin or tenant might delete a complaint either to withdraw or once complaint is solved might delete it
CREATE OR REPLACE FUNCTION log_complaint_insert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO complaint_audit (complaint_id, created_at, tenant_id)
  VALUES (NEW.complaint_id, NEW.date, NEW.tenant_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_complaint_insert
AFTER INSERT ON complaint
FOR EACH ROW EXECUTE FUNCTION log_complaint_insert();



-- Trigger to Validate Payment Amount
CREATE OR REPLACE FUNCTION validate_payment_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.amount <= 0 THEN
    RAISE EXCEPTION 'Payment amount must be positive.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_payment_insert
BEFORE INSERT ON payment
FOR EACH ROW EXECUTE FUNCTION validate_payment_amount();



-- Check if the apartment number exists in the apartment table
CREATE OR REPLACE FUNCTION check_apartment_exists()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the apartment number exists in the apartment table
    IF NOT EXISTS (SELECT 1 FROM apartment WHERE apt_no = NEW.apt_no) THEN
        RAISE EXCEPTION 'Apartment number does not exist.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_tenant_insert
BEFORE INSERT ON tenant
FOR EACH ROW EXECUTE FUNCTION check_apartment_exists();




-- When a tenant is removed from the system, archive their information for record-keeping purposes.
CREATE OR REPLACE FUNCTION archive_deleted_tenant()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO tenant_archive (tenant_id, age, ssn, name, perm_address, apt_no, email, archived_date)
  VALUES (OLD.tenant_id, OLD.age, OLD.ssn, OLD.name, OLD.perm_address, OLD.apt_no, OLD.email, CURRENT_DATE);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenant_before_delete
BEFORE DELETE ON tenant
FOR EACH ROW EXECUTE FUNCTION archive_deleted_tenant();





-- When a owner is removed from the system, archive their information for record-keeping purposes.
CREATE OR REPLACE FUNCTION archive_deleted_owner()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO owner_archive (owner_id, ssn, phone_no, address, name, email, archived_date)
  VALUES (OLD.owner_id, OLD.ssn, OLD.phone_no, OLD.address, OLD.name, OLD.email, CURRENT_DATE);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER owner_before_delete
BEFORE DELETE ON owner
FOR EACH ROW EXECUTE FUNCTION archive_deleted_owner();




CREATE OR REPLACE FUNCTION archive_deleted_apartment()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO apartment_archive (
        Apt_No, 
        Block_id, 
        Bedrooms, 
        Type, 
        Area, 
        Floor, 
        Address, 
        Owner_id, 
        Archived_date
    ) VALUES (
        OLD.Apt_No, 
        OLD.Block_id, 
        OLD.Bedrooms, 
        OLD.Type, 
        OLD.Area, 
        OLD.Floor, 
        OLD.Address, 
        OLD.Owner_id, 
        CURRENT_DATE
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER apartment_before_delete
BEFORE DELETE ON Apartment
FOR EACH ROW EXECUTE FUNCTION archive_deleted_apartment();




-- CREATE OR REPLACE FUNCTION auto_increase_rent()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     v_last_increase DATE;
-- BEGIN

--     SELECT last_rent_increase INTO v_last_increase FROM Rents
--     WHERE Tenant_id = NEW.Tenant_id AND Owner_id = NEW.Owner_id;
    
--     IF v_last_increase IS NULL OR (CURRENT_DATE - v_last_increase) > INTERVAL '1 year' THEN
--         UPDATE Rents
--         SET Rent_amount = Rent_amount * 1.03, 
--             last_rent_increase = CURRENT_DATE
--         WHERE Tenant_id = NEW.Tenant_id AND Owner_id = NEW.Owner_id;
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER increase_rent_annually
-- AFTER INSERT OR UPDATE OF Rent_amount ON Rents
-- FOR EACH ROW EXECUTE FUNCTION auto_increase_rent();



-- Assertions
ALTER TABLE apartment
ADD CONSTRAINT check_positive_rent CHECK (rent_amount > 0);

ALTER TABLE apartment
ADD CONSTRAINT check_positive_rooms CHECK (bedrooms > 0);


