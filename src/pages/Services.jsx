import { IonContent, IonPage, IonList, IonItem, IonLabel } from '@ionic/react'
import { useHistory, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
 
import { db } from '../context/FirebaseConfig'
import { collection, getDocs } from "firebase/firestore"; 

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './Services.css';
import './main.css';

const Services = () => {

    let history = useHistory();
    let home = () => {
        history.push('/')
      }
    
    let [arr,setArr]=useState([])

    let service = {}


    useEffect(() => {
        const getServices = async () => {
            const data = await getDocs(collection(db, "services"));
            setArr(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
        }
        getServices();
    },[])

   
    console.log("Beyond", arr)
  return (
    <IonPage>
        <IonContent>
        <Header />
            <div className='banner' onClick={home}>
              <div className='back_arrow'> <ChevronLeftIcon sx={{ fontSize: 32 }}/></div>
              <div className='banner_info'>Select service to proceed</div>
            </div>
            <div className='services_container'>
                <div className='title'>Services Offered:</div>
                <IonList>
                    {arr.map(elem =>( 
                    <IonItem button key={elem.id}>
                        <Link className='link' to={`/services/${elem.id}`}>
                        <IonLabel>
                            <div className='element'>
                                <h2>{elem.name}</h2>
                                <p>Ksh. {elem.price}</p>
                            </div>
                        </IonLabel>
                        </Link>
                    </IonItem>
                    ))}
                </IonList>
            </div>
        <Footer />
        </IonContent>
    </IonPage>
    
  )
}

export default Services