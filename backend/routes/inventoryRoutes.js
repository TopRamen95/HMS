const express = require('express');
const { getInventory, addMedicine, updateStock } = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', getInventory);
router.post('/', addMedicine);
router.put('/:id', updateStock);

module.exports = router;
