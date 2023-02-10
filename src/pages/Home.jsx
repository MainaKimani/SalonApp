import { IonContent, IonPage } from '@ionic/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import './main.css';
import { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../context/FirebaseConfig'
import { useAuthState,useIdToken } from "react-firebase-hooks/auth";

import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

import placeholder from "../assets/img/placeholder.png"
import banner from "../assets/img/banner.png"
import treatment from "../assets/img/hair-care.png"
import haircut from "../assets/img/haircut.png"
import manicure from "../assets/img/manicure.png"


const Home = () => {

  const theme = createTheme({ });

  let {logout} = useContext(AuthContext)

  let history = useHistory()

  const [user, loading, error] = useIdToken(auth);
  const [customer, setCustomer] = useState('');
    
  useEffect(() => {
      if (loading) return;
      if (!user){history.replace("/login")};
      if (user){
        setCustomer(user);
        history.push("/");
      }
    }, [user,loading]);
  
    console.log('user: ', customer)

  let name = customer.displayName
  let email = customer.email
  let photo = customer.photoURL
  let uid = customer.uid

  let services = () => {
    history.push('/services')
  }

  return (
    
    <ThemeProvider theme={theme}>
    <IonPage>
      <IonContent fullscreen>  
        <Header />
        <div className='user_banner'>
          <div className='profile_img'>
            <img className='user_img' src={photo ? photo : placeholder}/>
          </div>
          <div className='user'>
            <div className='username'> Hello, {name} </div>
            <div className='user_message'> Let's serve you today! </div>
          </div>
        </div>
        <div className='salon_container'>
          <div className='salon_img'>
            <img className='salon_banner_img' src={banner}/>
          </div>
          <div className='salon_info'>
            <p className='sub_title'>The Blend Salon</p>
            <div className='location'>
              <div className='salon_icon'><RoomOutlinedIcon /></div>
              <p className='details'>Annex Square - 3rd Floor,<br/>Along Limuru Rd., Ruaka</p>
            </div>
            <div className='time'>
              <div className='salon_icon'><AccessTimeOutlinedIcon /></div>
              <p className='details'>9:00 AM to 9:00 PM</p>
            </div>
          </div>

          <div className="book_btn"> 
           <Button  variant="contained" color="warning" disableElevation fullWidth onClick={services}>Book Appointment</Button>
          </div>

          <div className='spacer'> </div>

          <div className='services_highlight'>
            <p className='sub_title'>Services</p>
            <div className='services_list'>
              <div className='service_container'>
                <div className='service 1'>
                  <img className='service_img' src={treatment}/>
                </div>
                <p>Treatment</p>
              </div>
              <div className='service_container'>
                <div className='service 2'>
                  <img className='service_img' src={haircut}/>
                </div>
                <p>Haircut</p>
              </div>
              <div className='service_container'>
                <div className='service 3'>
                  <img className='service_img' src={manicure}/>
                </div>
                <p>Manicure</p>
              </div>
              <div className='service_container' onClick={services}>
                <div className='service more'>
                  <div className='more_icon'><DashboardCustomizeIcon sx={{ fontSize: 60 }}/></div>
                </div>
                <p className='more_tag'>More</p>
              </div>
            </div>
          </div>

          <div className='spacer'> </div>

          <Button onClick={()=>{logout()}} color="secondary" type="submit" variant="contained" 
          disableElevation sx={{ mt: 2, mb: 1 }}> <Link to="/home">logOut</Link> </Button>

        </div>
        <Footer />
      </IonContent>
      </IonPage>
      </ThemeProvider>

  );
};

export default Home;
