import { useContext } from 'react'
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
import { auth } from '../context/FirebaseConfig';
import { AuthContext } from '../context/AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

const Register = () => {

  let {registerUser,googleSignIn} = useContext(AuthContext)
  
  const theme = createTheme({
    palette:{secondary:{main:'#EA4335',},}
  });

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
                onClick={async()=>{ googleSignIn();
                  console.log('Clicked google sign in') }}
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 1 }}>  with Google
              </Button>
            <Box id="signupForm" component="form" noValidate onSubmit={registerUser} sx={{ mt: 1 }}>
              <Typography variant="body1" color="text" align='center' sx={{ mt: 0, mb: 1 }}>
                {'or'}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoFocus
              />
              <Typography 
                className='fname_warning'
                id='fname_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoFocus
              />
              <Typography 
                className='lname_warning'
                id='lname_warning'
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
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
              />
              <Typography 
                className='warning'
                id='password1_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
              <Typography 
                className='warning'
                id='password2_warning'
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

              <Typography 
                className='warning'
                id='register_warning'
                variant="body1"
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}> </Typography>

              <Grid container>
                <Grid className='reg_option' item>
                  
                  <Link href="/login" variant="body2">
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