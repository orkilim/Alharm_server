const express = require("express");
const router = express.Router();
const womanController = require('../controllers/woman');
const auth = require("../middleware/auth");

router.post('/save', womanController.SaveWomanAndGuards);
router.put('/update', womanController.UpdateWoman);
router.get('/getguards', womanController.getGuardsFromDB);
router.get('/sms', womanController.sendSMS);

router.post('/signup', womanController.signup);
router.post('/login', womanController.login);


module.exports = router;