import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfjOtKXIP5Ujs41ekLMuK2waENds_DH2Q",
  authDomain: "nextjs-foodies.firebaseapp.com",
  projectId: "nextjs-foodies",
  storageBucket: "nextjs-foodies.appspot.com",
  messagingSenderId: "108738446539",
  appId: "1:108738446539:web:4dda412c7be863e143474e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export {storage}