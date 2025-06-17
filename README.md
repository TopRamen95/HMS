# 🌩️ CloudCure - Centralized Patient & Resource Management System

CloudCure is a centralized hospital management system featuring real-time OT scheduling, pharmacy inventory, and emergency alerts — all displayed in a smooth, animated dashboard interface. It supports both staff and patient views and is designed for fullscreen, kiosk-ready usage.

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Router, React Slick  
- **Backend**: Node.js, Express.js *(optional for advanced logic)*  
- **Database**: Firebase Firestore *(real-time NoSQL)*  
- **Utilities**: Firebase Auth *(optional)*, Postman *(for API testing)*

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

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cloudcure.git
cd cloudcure
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

Create a Firebase project and configure the following:

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

Visit **`http://localhost:3000`** to view the app in your browser.

---

## 📦 Firebase Collections

- **`otSchedule`**:  
  ```json
  {
    doctor: string,
    speciality: string,
    patientId: string,
    otNumber: number,
    time: timestamp,
    status: string
  }
  ```

- **`pharmacy`**:  
  ```json
  {
    name: string,
    stock: number,
    image: string (URL)
  }
  ```

- **`alerts`**:  
  ```json
  {
    type: string,
    location: string,
    status: string
  }
  ```

---

## 🧪 Features

✅ Real-time data updates with Firebase  
✅ Auto-rotating dashboards powered by animation  
✅ OT conflict detection logic  
✅ Emergency alert viewer with fullscreen display  
✅ Scroll-free, kiosk-ready UI  
✅ Visual inventory display (medicine images)  
✅ Support for both **Staff** and **Patient** views  
✅ Fully responsive design

---

## 📤 Deployment

### Option 1: Firebase Hosting

```bash
npm run build
firebase deploy
```

### Option 2: Netlify / Vercel

Simply drag and drop the `build/` folder into the deployment panel.

---

## 🔐 Firebase Security Rules (basic)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Replace with proper auth rules
    }
  }
}
```

---

## 🌍 Live Demo

> 🔗 Visit: [https://cloudcure.netlify.app/](https://cloudcure.netlify.app/)

👉 [Click here for Patient View](https://cloudcure.netlify.app/patient)  
By default, you'll be redirected to the Staff Dashboard.

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repository and submit a pull request.

---

## 📜 License

MIT © 2025 CloudCure Team

---

> Built with 💙 by students and builders aiming to digitize healthcare systems.  
> Operating System version is still in development mode.  
> To access it, please switch to the `Ondevlop` branch.
