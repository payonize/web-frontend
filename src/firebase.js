// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBG-Fo3rhUVbH8TSkRyVHxMI9TPsseRXrw",
  authDomain: "payonize-2f179.firebaseapp.com",
  projectId: "payonize-2f179",
  storageBucket: "payonize-2f179.appspot.com",
  messagingSenderId: "867826863458",
  appId: "1:867826863458:web:49c2493d7f1c49f7e8b03b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Setup google auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      window.location.replace("/");
    })
    .catch((error) => console.error(error));
};
