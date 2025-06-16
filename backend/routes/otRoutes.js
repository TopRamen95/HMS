const express = require('express');
const {
  getOTSchedule,
  addOTSchedule,
  updateOTSchedule
} = require('../controllers/otController');

const router = express.Router();

router.get('/', getOTSchedule);
router.post('/', addOTSchedule);
router.put('/:id', updateOTSchedule);

module.exports = router;
