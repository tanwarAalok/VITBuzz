import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAXtb7VuEMyM17nmRuwn_wiTXu-EbxfS4Q",

  authDomain: "vitbuzz-c84dd.firebaseapp.com",

  projectId: "vitbuzz-c84dd",

  storageBucket: "vitbuzz-c84dd.appspot.com",

  messagingSenderId: "183328457842",

  appId: "1:183328457842:web:ebdf991c60e80aff66eeeb",

  measurementId: "G-SYG74865CV",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const STORAGE = getStorage(app);
