const express = require("express");

const router = express.Router();
const discountController = require("./discount_controller");
const authMiddleware = require("../../middleware/auth_middleware");
const adminMiddleware = require("../../middleware/admin_middleware");

router.get("/available", discountController.getAvailableDiscounts);

router.use(authMiddleware, adminMiddleware);
router.post("/", discountController.createDiscount);
router.get("/", discountController.getDiscounts);
router.get("/:id", discountController.getDiscountById);
router.patch("/:id", discountController.updateDiscount);
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
