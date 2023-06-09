// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAFFYTTedLDx5rBLQAuXio_hiHyP-bC28",
  authDomain: "recipe-app-challenge-7c995.firebaseapp.com",
  projectId: "recipe-app-challenge-7c995",
  storageBucket: "recipe-app-challenge-7c995.appspot.com",
  messagingSenderId: "466226496177",
  appId: "1:466226496177:web:c56252ba3295bc22665890",
  measurementId: "G-JCS3GFRGWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)


