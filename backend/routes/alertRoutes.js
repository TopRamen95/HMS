const express = require('express');
const {
  getAlerts,
  addAlert,
  updateAlertStatus
} = require('../controllers/alertController');

const router = express.Router();

router.get('/', getAlerts);
router.post('/', addAlert);
router.put('/:id', updateAlertStatus);

module.exports = router;
