const express = require("express");

const router = express.Router();

const authRoutes = require(
  "../modules/auth/auth_routes"
);

const categoryRoutes = require(
  "../modules/categories/categories_routes"
);

router.use("/auth", authRoutes);

router.use(
  "/categories",
  categoryRoutes
);

module.exports = router;