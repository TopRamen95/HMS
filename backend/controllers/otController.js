const fs = require('fs');
const path = require('path');
const otPath = path.join(__dirname, '../data/otData.json');
let otData = require('../data/otData.json');

const getOTSchedule = (req, res) => {
  res.json(otData);
};

const addOTSchedule = (req, res) => {
  const newEntry = req.body;
  newEntry.id = Date.now(); // simple ID
  otData.push(newEntry);

  fs.writeFileSync(otPath, JSON.stringify(otData, null, 2));
  res.status(201).json(newEntry);
};

const updateOTSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = req.body;

  const index = otData.findIndex(item => item.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  otData[index] = { ...otData[index], ...updated };

  fs.writeFileSync(otPath, JSON.stringify(otData, null, 2));
  res.json(otData[index]);
};

module.exports = {
  getOTSchedule,
  addOTSchedule,
  updateOTSchedule
};
