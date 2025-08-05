/* Firebase Configuration */
/* @description Firebase app initialization and auth setup */
/* @note Replace placeholder values with your actual Firebase project credentials */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export auth for use in other files if needed
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
export const auth = getAuth(app);
