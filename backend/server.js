const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const otRoutes = require('./routes/otRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const alertRoutes = require('./routes/alertRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/ot', otRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/alerts', alertRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
