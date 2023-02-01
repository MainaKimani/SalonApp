import { useHistory } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, 
         GoogleAuthProvider,
         sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyArXPrIwlhp24cyVgEx4QWP0VvIlm8mIcI",
    authDomain: "blend-parlor.firebaseapp.com",
    projectId: "blend-parlor",
    storageBucket: "blend-parlor.appspot.com",
    messagingSenderId: "852223461821",
    appId: "1:852223461821:web:91f28297ba1de7bbc8aad4",
    measurementId: "G-FY30XBCS3T"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);





//Resetting password
export function verifyEmail(){
    const email = 'kalexmaina@gmail.com';
    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('email sent - password reset')
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.error(errorMessage)
    // ..
  });
}
