import { useHistory } from 'react-router-dom';
import { createContext,useState,useEffect } from 'react';
import { useAuthState,useIdToken } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";

import { getAuth, 
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         GoogleAuthProvider,
         signInWithPopup,
         onAuthStateChanged,
         updateProfile,
         sendPasswordResetEmail,  
         signOut} from "firebase/auth";

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
const auth = getAuth(app);


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const history = useHistory();

    let [user, setUser] = useState();

    //validation functions
    function validate_name(name) {
        if (name == null) {
          return false
        }
        if (name.length <= 0) {
          return false
        } else {
          return true
        }
    }
    function validate_email(email) {
        const expression = /^[^@]+@\w+(\.\w+)+\w$/
         if (expression.test(email) === true) {
           // Email is good
           return true
         } else {
           // Email isn't good
           return false
         }
    }
    function validate_password(password) {
        if (password.length <= 5) { // greater than 6
          return false} 
        else {
          return true
        }
    }


    //Register functionality
    let registerUser= async (event) => {
        
        event.preventDefault()
        
        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const firstname = data.get('firstname')
        const lastname = data.get('lastname')
        const password1 = data.get('password1')
        const password2 = data.get('password2')

        const fname_warning = document.getElementById('fname_warning')
        const lname_warning = document.getElementById('lname_warning')
        const email_warning = document.getElementById('email_warning')
        const password1_warning = document.getElementById('password1_warning')
        const password2_warning = document.getElementById('password2_warning')
        const register_warning = document.getElementById('register_warning')
        fname_warning.innerHTML = ''
        lname_warning.innerHTML = ''
        email_warning.innerHTML = ''
        password1_warning.innerHTML = ''
        password2_warning.innerHTML = ''
        register_warning.innerHTML = ''


        //Run validation checks
        if (!validate_name(firstname)) {
            fname_warning.innerHTML ='Please enter first name to sign up';
            return
        }
        if (!validate_name(lastname)) { 
            lname_warning.innerHTML='Please enter last name to sign up';
            return
        }
        if (!validate_email(email)) {
            email_warning.innerHTML='Please add a valid email address';
            return
        }
        if (!validate_password(password1)) {
            password1_warning.innerHTML='Password ought to be 6 or more characters';
            return
        }
        if (password1!==password2) {
            password1_warning.innerHTML='Password entered does not match'
            password2_warning.innerHTML='Password entered does not match'
            return
        }
        else{
            //firebase - register user
            createUserWithEmailAndPassword(auth, email, password1)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user  
                  updateProfile(user, {
                    displayName: firstname+" "+lastname }).then(() => {
                        const name = user.displayName;
                        console.log(name);
                  });
                  setUser(user);
                  history.push('/')
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  console.log(errorMessage);
                if (errorMessage ==="Firebase: Error (auth/email-already-in-use)."){
                    const email_warning = document.getElementById('email_warning');
                    email_warning.innerHTML='Email already in use';
                    return
                }
                else{
                    alert('Opps! Something bad happened. Please try again');
                    return
                }
            });
        }  
    }

    //log in functionality
    let loginUser= async (event) => {
        event.preventDefault();
        const credentials = new FormData(event.currentTarget);
        const email = credentials.get('email');
        const password = credentials.get('password');

        const email_warning = document.getElementById('email_warning');
        const password_warning = document.getElementById('password_warning');
        const login_warning = document.getElementById('login_warning');
        email_warning.innerHTML = '';
        password_warning.innerHTML = '';
        login_warning.innerHTML = '';

        if (!validate_email(email)) {
            email_warning.innerHTML='Please add a valid email address';
            return
        }
        if (!validate_password(password)) {
            password_warning.innerHTML='Password ought to be 6 or more characters';
            return
         }
        else{
            //firebase-login  
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setUser(user);
                    history.push('/')
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.error(errorMessage)
                    const email_warning = document.getElementById('email_warning');
                    const password_warning = document.getElementById('password_warning');
                    const login_warning = document.getElementById('login_warning')
                    if (errorMessage==='Firebase: Error (auth/user-not-found).'){
                        email_warning.innerHTML='Email not found';
                    }
                    if (errorMessage==='Firebase: Error (auth/invalid-email).'){
                        email_warning.innerHTML='Invalid email';
                    }
                    if (errorMessage==='Firebase: Error (auth/wrong-password).'){
                        password_warning.innerHTML='Incorrect password';
                    }
                    if (errorMessage==='Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
                        const errMsg = errorMessage.slice(9, -25)
                        login_warning.innerHTML=errMsg;
                    }
                    return
              });
        } 
    }

    //Google signin
    let googleSignIn = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            setUser(user);
            history.push('/');
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }
  

    //Logout user
    let logout = () => {
        signOut(auth).then(() => {
            history.push('/login')
          }).catch((error) => {
            // An error happened.
          });
    }

    //check user
    let isAuthenticated = ()=>{
         onAuthStateChanged(auth, (user) => {
          if (user) { 
            console.log('is authenticated')
            //setUser(user);
          } 
          else {
            console.log('is not authenticated')
            //setUser(user);
          }     
        })
      }
      
    
    let contextData ={
      user:user,
      logout:logout,
      registerUser:registerUser,
      loginUser:loginUser,
      googleSignIn:googleSignIn,
      isAuthenticated:isAuthenticated,
    }


   
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}