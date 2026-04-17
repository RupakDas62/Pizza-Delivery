// server/routes/deliveryAgentRoutes.js
const express = require("express");
const {
  registerAgent,
  updateLocation,
  updateAvailability,
  assignOrder
} = require("../controllers/deliveryAgentController.js");

const router = express.Router();

router.post("/register", registerAgent);
router.put("/:id/location", updateLocation);
router.put("/:id/availability", updateAvailability);
router.post("/assign", assignOrder);

 module.exports = router;
