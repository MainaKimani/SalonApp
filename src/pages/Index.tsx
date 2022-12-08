import { IonPage, IonContent } from '@ionic/react';
import Header from './Header'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { logOut } from '../firebaseConfig';
import { Link, Redirect } from 'react-router-dom';
 
const Index: React.FC = () => {
  const theme = createTheme({ });

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Header />
      <Button
                onClick={()=>{
                  logOut();
                  <Redirect to="/login" />
                }}
                color="secondary"
                type="submit"
                variant="contained"
                disableElevation
                sx={{ mt: 2, mb: 1 }}> <Link to="/home">logOut</Link>
      </Button>
      </ThemeProvider>
    </div>
      
  );
};

export default Index;
