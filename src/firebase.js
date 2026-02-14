// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu5pPRSTAx2zsRVvIgRdYxBoCvVxndi3c",
  authDomain: "service-finder-web-8a5a3.firebaseapp.com",
  projectId: "service-finder-web-8a5a3",
  storageBucket: "service-finder-web-8a5a3.firebasestorage.app",
  messagingSenderId: "340214991470",
  appId: "1:340214991470:web:7fa66795c56c7398da747f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;