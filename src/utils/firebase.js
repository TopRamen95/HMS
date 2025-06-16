// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpg06D_yHK_jE-OFd7J_Z5ee4uycgh1oU",
  authDomain: "hospitaldashboard-a9787.firebaseapp.com",
  projectId: "hospitaldashboard-a9787",
  storageBucket: "hospitaldashboard-a9787.firebasestorage.app",
  messagingSenderId: "944356436866",
  appId: "1:944356436866:web:dd5e8f74e5f64b9d0c3d9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;