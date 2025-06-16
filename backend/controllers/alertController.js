const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/alertsData.json');
let alerts = require('../data/alertsData.json');

const getAlerts = (req, res) => {
  res.json(alerts);
};

const addAlert = (req, res) => {
  const newAlert = req.body;
  newAlert.id = Date.now(); // unique numeric ID
  alerts.push(newAlert);
  fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
  res.status(201).json(newAlert);
};

const updateAlertStatus = (req, res) => {
  const id = parseInt(req.params.id); // ensure numeric
  const updated = req.body;

  console.log('🔁 Resolving Alert ID:', id);
  console.log('📋 Current IDs:', alerts.map(a => a.id));

  const index = alerts.findIndex(item => item.id === id);
  if (index === -1) {
    console.error('❌ Alert not found');
    return res.status(404).json({ message: 'Not found' });
  }

  alerts[index] = { ...alerts[index], ...updated };
  fs.writeFileSync(dataPath, JSON.stringify(alerts, null, 2));
  res.json(alerts[index]);
};

module.exports = { getAlerts, addAlert, updateAlertStatus };
