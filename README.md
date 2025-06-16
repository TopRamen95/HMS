# 🌩️ CloudCure - Centralized Patient & Resource Management System

CloudCure is a centralized hospital management system featuring real-time OT scheduling, pharmacy inventory, and emergency alerts — all displayed in a smooth, animated dashboard interface. It supports both staff and patient views and is designed for fullscreen, kiosk-ready usage.

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Router, React Slick
- **Backend**: Node.js, Express.js (optional for advanced logic)
- **Database**: Firebase Firestore (real-time NoSQL)
- **Utilities**: Firebase Auth (optional), Postman (for API testing)

---

## 📁 Project Structure

```
cloudcure/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── OTSchedule.js
│   │   ├── Alerts.js
│   │   ├── Pharmacy.js
│   │   ├── staff/
│   │   │   └── StaffLayout.js
│   │   └── patient/
│   │       └── PatientDashboard.js
│   ├── utils/
│   │   └── firebase.js
│   └── App.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/cloudcure.git
cd cloudcure
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

Create a Firebase project and a file:

**`src/utils/firebase.js`**

```js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
```

---

## 🌐 Running the App

```bash
npm start
```

Visit `http://localhost:3000` to view the app.

---

## 📦 Firebase Collections

- `otSchedule`:  
  `{ doctor, speciality, patientId, otNumber, time, status }`

- `pharmacy`:  
  `{ name, stock, image }`

- `alerts`:  
  `{ type, location, status }`

---

## 🧪 Features

✅ Real-time data with Firebase  
✅ Auto-rotating dashboards with animation  
✅ OT conflict detection  
✅ Emergency alerts viewer  
✅ Scroll-free fullscreen UI  
✅ Inventory display with medicine images  
✅ Staff and Patient view support  
✅ Responsive (kiosk-ready)

---

## 📤 Deployment

### Option 1: Firebase Hosting

```bash
npm run build
firebase deploy
```

### Option 2: Netlify / Vercel

Drag and drop the `build/` folder.

---

## 🔐 Firebase Security Rules (basic)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Replace with auth rules
    }
  }
}
```
---------------------------------------------------------------
Visit https://cloudcure.netlify.app/ to view the deployed app
---------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome! Please fork and create a PR.

---

## 📜 License

MIT © 2025 CloudCure Team

---

> Built with 💙 by students and builders aiming to digitize healthcare systems.
> Operating System version is still in development mode to access it please proceed to Ondevlop branch.
