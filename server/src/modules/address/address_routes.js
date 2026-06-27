const express = require("express");

const router = express.Router();

const addressController = require("./address_controller");

const authMiddleware = require("../../middleware/auth_middleware");

// Add Address
router.post(
  "/",
  authMiddleware,
  addressController.addAddress
);

// Get All Addresses
router.get(
  "/",
  authMiddleware,
  addressController.getAddresses
);

// Update Address
router.patch(
  "/:id",
  authMiddleware,
  addressController.updateAddress
);

// Delete Address
router.delete(
  "/:id",
  authMiddleware,
  addressController.deleteAddress
);

// Set Default Address
router.patch(
  "/:id/default",
  authMiddleware,
  addressController.setDefaultAddress
);

module.exports = router;