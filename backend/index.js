const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const app = express();

// Firebase Admin SDK Setup
const serviceAccount = require('/Users/mahaanbhat/Desktop/cloudcure-react/backend/cloudcure-39e63-firebase-adminsdk-fbsvc-41f256c1c3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cloudcure-1bf3c.firebaseio.com',
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/api/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html')); // This will load DashboardAdmin
});

app.get('/admin/add-doctor', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html')); // AddDoctor page
});

// ... more frontend routes

// API routes (e.g., for Firebase Firestore interaction)
const doctorsRouter = require('./routes/doctors');
app.use('/api/doctors', doctorsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🌐 Server running on http://localhost:${PORT}`));
