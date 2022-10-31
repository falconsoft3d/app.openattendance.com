// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Config from "react-native-config";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Config.APIKEY,
  authDomain: Config.AUTHDOMAIN,
  projectId: Config.PROJECTID,
  storageBucket: Config.STORAGEBUCKET,
  messagingSenderId: Config.MESSAGINGSENDERID,
  appId: Config.APPID,
  measurementId: Config.MEASUREMENTID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {db, auth, storage};