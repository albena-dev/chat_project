// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// console.log(import.meta.env)



// const firebaseConfig = {
//   apiKey: "AIzaSyDw-7mi4SmrtAelSyejjROsrsi-xkL5Sm4",
//   authDomain: "chatproject1-59a40.firebaseapp.com",
//   databaseURL: "https://chatproject1-59a40-default-rtdb.firebaseio.com",
//   projectId: "chatproject1-59a40",
//   storageBucket: "chatproject1-59a40.firebasestorage.app",
//   messagingSenderId: "423449800121",
//   appId: "1:423449800121:web:32fedd4269f8e98bf8da68",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyDw-7mi4SmrtAelSyejjROsrsi-xkL5Sm4",
//   authDomain: "chatproject1-59a40.firebaseapp.com",
//   projectId: "chatproject1-59a40",
//   storageBucket: "chatproject1-59a40.firebasestorage.app",
//   messagingSenderId: "423449800121",
//   appId: "1:423449800121:web:32fedd4269f8e98bf8da68",
// };

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN ,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env. VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
