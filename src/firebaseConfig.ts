import { useHistory } from 'react-router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

//check if user is authenticated
export function isAuthenticated(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      return true;
    } else {
    console.log('is not Authenticated')
    return false;
    }     
  })
}

//login function
export async function LoginUser(email: any, password: any){
  let history = useHistory();
    try{   
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
                history.push('/index');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage)
                const email_warning:any = document.getElementById('email_warning');
                const password_warning:any = document.getElementById('password_warning');
                const login_warning:any = document.getElementById('login_warning');
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
          });
        } 
    catch (error) {
        console.error(error)
    }
}

//sign up
export async function SigninUser(fname: any, lname: any, email: any, password: any){
    try{
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;

              updateProfile(user, {
                displayName: fname+" "+lname }).then(() => {
                    const name = user.displayName;
                    console.log(name);
                // ...
              }).catch((error:any)=>{
                const errorMessage:any = error.code;
                console.log(errorMessage);
              })
            .catch((error:any) => {
              const errorMessage:any = error.message;
              if (errorMessage ==="Firebase: Error (auth/email-already-in-use)."){
                const password_email:any = document.getElementById('email_warning');
                password_email.innerHTML='Email already in use';
              }
              else{
                alert('Opps! Something bad happened. Please try again');
              }
              console.log(errorMessage);
            });

            console.log(user);
        });
    } 
    catch (error) {
        console.error(error)
    }
}

//Google sign in
export function GoogleSignIn (){
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage)
    });
}

//Resetting password
export function verifyEmail(){
    const email = 'kalexmaina@gmail.com';
    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log('email sent - password reset')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage)
    // ..
  });
}

//sign out
export function logOut(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error:any) => {
    // An error happened.
  });
}