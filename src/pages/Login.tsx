import { IonContent, IonPage } from '@ionic/react';
import * as React from 'react';
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
import { LoginUser, GoogleSignIn,verifyEmail } from '../firebaseConfig';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const Login: React.FC = () => {
  const loginSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    //validation functions
    function validate_email(email: any) {
      const expression = /^[^@]+@\w+(\.\w+)+\w$/
       if (expression.test(email) === true) {
         // Email is good
         return true
       } else {
         // Email isn't good
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
    const email_warning:any = document.getElementById('email_warning');
    const password_warning:any = document.getElementById('password_warning');
    const login_warning:any = document.getElementById('login_warning');
    email_warning.innerHTML = '';
    password_warning.innerHTML = '';
    login_warning.innerHTML = '';

    //Run validation checks
    if (validate_email(email) === false) {
      email_warning.innerHTML='Please add a valid email address';
      return
    }
    if (validate_password(password) === false) {
      password_warning.innerHTML='Password ought to be 6 or more characters';
      return
    }

    //After all checks are passed, proceed to sign in functionality
    await LoginUser(email, password);
 

    console.log({
      email: email,
      password: password,
    });
  };
  
  const theme = createTheme({
    palette:{secondary:{main:'#EA4335',},}
  });

  return (
    <IonContent>
    <IonPage>
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
              <div className='greetings'>Get started...</div>
            </Typography>
            <Button
                onClick={()=>{
                  GoogleSignIn();
                }}
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 1 }}>  with Google
              </Button>
            <Box component="form" noValidate onSubmit={loginSubmit} sx={{ mt: 1 }}>
              <Typography variant="body1" color="text" align='center' sx={{ mt: 0, mb: 1 }}>
                {'or'}
              </Typography>
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
                sx={{ mt: 3, mb: 5, visibility: 'visible' }}
              >
                Log In
              </LoadingButton>
              <Typography 
                className='warning'
                id='login_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>
              <Grid container>
                <Grid className='reg_option' item xs>
                  <Link variant="body2" onClick= {verifyEmail}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid className='reg_option' item>
                  <Link href="/Register" variant="body2">
                    {"Don't have an account? Sign Up"}
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
    </IonPage>
    </IonContent>
    );
}

export default Login
