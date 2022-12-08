import React, { useEffect, useState } from "react";
import { IonContent, IonPage } from '@ionic/react';
import {  Button,
          CssBaseline,
          TextField,
          FormControlLabel,
          Checkbox,
          Link,
          Grid,
          Box,
          Typography,
          Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './main.css';
import { SigninUser, GoogleSignIn } from '../firebaseConfig';
import Index from './Index';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

import { getAuth, 
  onAuthStateChanged, 
  User} from "firebase/auth";
import { initializeApp } from 'firebase/app';


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

const Register: React.FC = () => {
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

  const loginSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Fetch each input data
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstname = data.get('firstname');
    const lastname = data.get('lastname');

    //validation functions
    function validate_name(name: any) {
      if (name == null) {
        return false
      }
      if (name.length <= 0) {
        return false
      } else {
        return true
      }
    }
    function validate_email(email: any) {
      const expression = /^[^@]+@\w+(\.\w+)+\w$/
       if (expression.test(email) === true) {
         // Email is good
         return true
       } else {
         // Email is not good
         return false
       }
    }
    function validate_password(password: any) {
      if (password.length <= 5) { // Firebase only accepts lengths greater than 6
        return false} 
      else {
        return true
      }
    }

    //Run validation checks
    if (validate_name(firstname) === false) {
      const password_fname:any = document.getElementById('fname_warning');
      password_fname.innerHTML='Please enter first name to sign up';
      return
    }
    if (validate_name(lastname) === false) {
      const password_lname:any = document.getElementById('lname_warning');
      password_lname.innerHTML='Please enter last name to sign up';
      return
    }
    if (validate_email(email) === false) {
      const password_email:any = document.getElementById('email_warning');
      password_email.innerHTML='Please add a valid email address';
      return
    }
    if (validate_password(password) === false) {
      const password_warning:any = document.getElementById('password_warning');
      password_warning.innerHTML='Password ought to be 6 or more characters';
      return
    }
    
    //After all checks are passed, proceed to sign in functionality
    await SigninUser(firstname, lastname, email, password);
    

    console.log({
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });
  };
  
  const theme = createTheme({
    palette:{secondary:{main:'#EA4335',},}
  });

  if(user){return <Index/>}
  return (
    <IonPage>
    <IonContent>
    <div className="login_page">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              <div className='greetings'>Sign Up...</div>
            </Typography>
            <Button
                onClick={async()=>{
                  GoogleSignIn ();
                  console.log('Clicked google sign in');
                }}
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 1 }}>  with Google
              </Button>
            <Box id="signupForm" component="form" noValidate onSubmit={loginSubmit} sx={{ mt: 1 }}>
              <Typography variant="body1" color="text" align='center' sx={{ mt: 0, mb: 1 }}>
                {'or'}
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstnane"
                label="First Name"
                name="firstname"
                autoFocus
              />
              <Typography 
                className='fname_warning'
                id='password_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastnane"
                label="Last Name"
                name="lastname"
                autoFocus
              />
              <Typography 
                className='lname_warning'
                id='password_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <Typography 
                className='warning'
                id='email_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography 
                className='warning'
                id='password_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                fullWidth
                type='submit'
                variant="contained"
                sx={{ mt: 2, mb: 2,}}
              >
                Sign Up
              </LoadingButton>

              <Grid container>
                <Grid className='reg_option' item>
                  
                  <Link href="/home" variant="body2">
                    {"Have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

      <Typography variant="body2" color="text.secondary" className='copyright'>
            {'Copyright © '}
            <Link color="inherit" href="">
               The Blend Parlor
            </Link>
            {', '+new Date().getFullYear()}
      </Typography>
    </div>
    </IonContent>
    </IonPage>
    );
}

export default Register