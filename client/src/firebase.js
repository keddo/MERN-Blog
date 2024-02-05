// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6e6ba.firebaseapp.com",
  projectId: "mern-blog-6e6ba",
  storageBucket: "mern-blog-6e6ba.appspot.com",
  messagingSenderId: "749648481065",
  appId: "1:749648481065:web:2740a00c21b2c93a804538"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);