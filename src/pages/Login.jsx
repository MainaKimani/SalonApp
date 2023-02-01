import { useContext,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState,useIdToken } from "react-firebase-hooks/auth";
import { IonContent, IonPage } from '@ionic/react';
import {  Button,CssBaseline,TextField,FormControlLabel,Checkbox,
          Link,Grid,Box,Typography,Container } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './main.css';
import { auth } from '../context/FirebaseConfig';
import { AuthContext } from '../context/AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const Login = () => {
  
  const theme = createTheme({
    palette:{secondary:{main:'#EA4335',},}
  });

  let history = useHistory()
  
  let {loginUser,googleSignIn} = useContext(AuthContext)

  const [user, loading, error] = useIdToken(auth);
    
    useEffect(() => {
        if (loading) return;
        if (user) history.replace("/");
      }, [user,loading]);
    
    console.log(user)

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
              <div className='greetings'>Get started...</div>
            </Typography>
            <Button
                onClick={()=>{
                    googleSignIn();
                }}
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 1 }}>  with Google
              </Button>
            <Box component="form" noValidate onSubmit={loginUser} sx={{ mt: 1 }}>
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
                  <Link variant="body2">
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
    </IonContent> 
    </IonPage>
    );
}

export default Login
