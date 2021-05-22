const express = require("express");
const router = express.Router();
const adminController = require('../controllers/events');
const auth = require("../middleware/auth");

router.get('/get', adminController.getStatistics);



module.exports = router;