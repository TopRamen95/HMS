const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/inventoryData.json');
let inventory = require('../data/inventoryData.json');

const getInventory = (req, res) => {
  res.json(inventory);
};

const addMedicine = (req, res) => {
  const newMed = req.body;
  newMed.id = Date.now();
  inventory.push(newMed);
  fs.writeFileSync(dataPath, JSON.stringify(inventory, null, 2));
  res.status(201).json(newMed);
};

const updateStock = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;

  const index = inventory.findIndex(item => item.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  inventory[index] = { ...inventory[index], ...updated };
  fs.writeFileSync(dataPath, JSON.stringify(inventory, null, 2));
  res.json(inventory[index]);
};

module.exports = { getInventory, addMedicine, updateStock };
