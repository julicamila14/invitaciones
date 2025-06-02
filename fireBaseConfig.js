// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeGJY1odD_srFk3c8xyAjHbA79ppRUg9k",
  authDomain: "casamiento-book.firebaseapp.com",
  databaseURL: "https://casamiento-book-default-rtdb.firebaseio.com",
  projectId: "casamiento-book",
  storageBucket: "casamiento-book.firebasestorage.app",
  messagingSenderId: "614673774986",
  appId: "1:614673774986:web:7c349ad341bd0269a43073",
  measurementId: "G-PL50F8FCHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);