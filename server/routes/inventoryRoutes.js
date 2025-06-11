const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

const {
  createInventory,
  getInventory,
  updateInventory,
} = require("../controllers/inventoryController");

router.post("/", protect, adminOnly, createInventory);
router.get("/", protect, getInventory); // For both admin/user to view inventory
router.put("/", protect, adminOnly, updateInventory);

module.exports = router;
