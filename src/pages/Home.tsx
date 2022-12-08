import { IonPage, IonContent } from '@ionic/react';
import Flush from './Flush';
import Login from './Login';
import Index from './Index';
import { getAuth, 
         onAuthStateChanged, 
         User} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import React, { useEffect, useState } from "react";

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
const auth = getAuth();

const Home: React.FC = () => {
  const [user, setUser] = useState<User | '' | null>(null);

  const authListener = () =>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser(user);
      } else {
        console.log(user)
        console.log('is not Authenticated')
        setUser('');
      }     
    })
  }

  useEffect(() =>{
    authListener();
  }, []);

if(user){return <Index/>}
if(!user){return <Login/>} else{
return (<Flush />)
}
}

export default Home;
