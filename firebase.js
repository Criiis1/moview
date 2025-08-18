// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCvN-R88eOGwzVqpG3yu3VT2ln5kXu9hc",
    authDomain: "xview-61e57.firebaseapp.com",
    projectId: "xview-61e57",
    storageBucket: "xview-61e57.firebasestorage.app",
    messagingSenderId: "453533348544",
    appId: "1:453533348544:web:339b141ee00f0b7d7c7325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };