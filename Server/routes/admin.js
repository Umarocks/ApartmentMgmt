var express = require("express");
var router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../middleware/hash");
const { adminController } = require("../controllers/adminController");
const { ownerController } = require("../controllers/OwnerController");

const { IsAdmin } = require("../middleware/IsAdmin");
const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../middleware/LoginChecker");

router.post(
  "/createAdmin",
  ensureAuthenticated,
  IsAdmin,
  adminController.createAdmin
);

router.post(
  "/createOwner",
  ensureAuthenticated,
  IsAdmin,
  adminController.createOwner
);

router.get(
  "/getAllTenant",
  ensureAuthenticated,
  IsAdmin,
  adminController.getAllTenants
);

router.get(
  "/getAllOwner",
  ensureAuthenticated,
  IsAdmin,
  adminController.getAllOwners
);

router.post(
  "/AllotParking",
  ensureAuthenticated,
  IsAdmin,
  adminController.allotParking
);

router.get(
  "/getAllComplaint",
  ensureAuthenticated,
  IsAdmin,
  adminController.getAllComplaints
);

router.get(
  "/totalOwner",
  ensureAuthenticated,
  IsAdmin,
  adminController.totalOwnerCount
);

router.get(
  "/totalTenant",
  ensureAuthenticated,
  IsAdmin,
  adminController.totalTenantCount
);

//create tenant
router.post(
  "/createTenant",
  ensureAuthenticated,
  IsAdmin,
  adminController.createTenant
);

router.post(
  "/createBlock",
  ensureAuthenticated,
  IsAdmin,
  adminController.createBlock
);

router.post(
  "/createApt",
  ensureAuthenticated,
  IsAdmin,
  adminController.createApt
);

module.exports = router;

//total employee count
// Admin can login. {DONE}
// Admin can view the tenant and owner details. {DONE}
// Admin can create owner.{DONE}
// Admin can allot parking slot.
// Admin can view the complaints.{DONE}
// Admin can see total Owners.{DONE}
// Admin can see total Tenants.{DONE}
// Admin can see total Employee.{DONE}
//  create block {DONE}

// TO DO:
//  create tenants
//                     Table "public.tenant"
//     Column    |         Type          | Collation | Nullable | Default
// --------------+-----------------------+-----------+----------+---------
//  tenant_id    | character varying(38) |           | not null |
//  name         | character(50)         |           | not null |
//  ssn          | character varying(9)  |           | not null |
//  age          | integer               |           |          |
//  perm_address | character varying(50) |           |          |
//  apt_no       | character varying(10) |           |          |
//  email        | character varying(50) |           |          |
//  block_id     | integer               |           |          |

//  create apartment
//                   Table "public.apartment"
//   Column  |         Type          | Collation | Nullable | Default
// ----------+-----------------------+-----------+----------+---------
//  apt_no   | character varying(10) |           | not null |
//  block_id | integer               |           | not null |
//  bedrooms | integer               |           | not null |
//  type     | character varying(10) |           | not null |
//  area     | integer               |           | not null |
//  floor    | integer               |           | not null |
//  address  | character varying(50) |           | not null |
//  owner_id | character varying(10) |           |          |

//  delete tenant or specific tenant/owner
//  add apartments or register new apartments
//  allocate apartments or something like that
