// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//meanin i add blo imp getauthentication from fb authentication
import {getAuth, GoogleAuthProvider} from "firebase/auth";
//added blo after using build firebase database
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMACMpU-TYZwmjou8WcOtZWYMz1-C8aiQ",
  authDomain: "movie-firebase-fd383.firebaseapp.com",
  projectId: "movie-firebase-fd383",
  storageBucket: "movie-firebase-fd383.appspot.com",
  messagingSenderId: "79026239497",
  appId: "1:79026239497:web:c594e3d3ff81519cdca0d8",
  measurementId: "G-X49N36G7WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//evry service look like below use get the auth pass(App)
export const auth= getAuth(app)
export const googleProvider= new GoogleAuthProvider();  //here done aftr addding to import abovemaking the const usable instead of gauthprovider

export const db= getFirestore(app);