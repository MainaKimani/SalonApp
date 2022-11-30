import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {  Avatar,
          Button,
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

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import { color } from '@mui/system';

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(!true);

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    setLoading(!true)

    console.log({
      email: email,
      password: password,
    });
  };
  
  const theme = createTheme({
    palette:{secondary:{main:'#EA4335',},}
  });

  return (
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
                  console.log('Google');
                }}
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                sx={{ mt: 5, mb: 1 }}>  with Google
              </Button>
            <Box component="form" noValidate onSubmit={loginSubmit} sx={{ mt: 1 }}>
              <Typography variant="body1" color="text" align='center' sx={{ mt: 3, mb: 3 }}>
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
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}>
                {'Invalid email address'}
              </Typography>
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
                sx={{ mt: -1, mb: 1, color:"#EA4335", fontSize:'12px' }}>
                {'Invalid email address'}
              </Typography>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <LoadingButton
                fullWidth
                type='submit'
                onClick={()=>{
                  setLoading(!true);
                }}
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 5, visibility: 'visible' }}
              >
                Log In
              </LoadingButton>

              <Grid container>
                <Grid className='reg_option' item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid className='reg_option' item>
                  <Link href="#" variant="body2">
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
    );
}

export default Login
