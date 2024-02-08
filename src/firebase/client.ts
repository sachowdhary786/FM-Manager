// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw_t3ru0THvDtgw2X9OfAAvNQuEOqYVlM",
  authDomain: "fm-app-d7655.firebaseapp.com",
  databaseURL: "https://fm-app-d7655-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fm-app-d7655",
  storageBucket: "fm-app-d7655.appspot.com",
  messagingSenderId: "161073862530",
  appId: "1:161073862530:web:882eb8625aa3adbe73a19b",
  measurementId: "G-49TBGRW9HX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);