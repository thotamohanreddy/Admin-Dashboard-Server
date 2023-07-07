const express = require('express');
const router = express.Router();
const groupingControllers = require('../controllers/group');

router.get('/country', groupingControllers.groupByCountry);
router.get('/', groupingControllers.groupByField);

module.exports = router;