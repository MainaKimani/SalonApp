import { IonContent, IonPage, IonDatetime , useIonAlert, IonCard, IonCardTitle } from '@ionic/react'
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from 'react'
import { DayPicker, Row, RowProps } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { format, differenceInCalendarDays  } from 'date-fns';

import { auth,db } from '../context/FirebaseConfig'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 
import { useIdToken } from "react-firebase-hooks/auth";

import { Button } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from '../components/Header';
import Footer from '../components/Footer';

import './Services.css';
import './main.css';

function BookingPage() {

    let history = useHistory();
    let services = () => {
        history.push('/services')
      }
    let logs = () => {
        history.push('/')
    }

    const params = useParams()
    let serviceId = params.id

    const [presentAlert] = useIonAlert();

    let [load, setLoad] = useState(false)
    let [arr,setArr]=useState([])
    let [arrStlyist,setArrStylist]=useState([])
    let [service, setService] = useState('')
    let [selected, setSelected] = useState('')
    let [blockedTime,setBlockedTime]=useState([])
    let [availableTime,setAvailableTime]=useState([])
    let working_hrs = ['9 am', '10 am', '11 am', "12 pm", 
                        '1 pm', '2 pm', '3 pm', '4 pm',
                        '5 pm','6 pm','7 pm','8 pm'];

    
    //Date handling
    var today = new Date()
    let [date, setDate] = useState()
    let [time, setTime] = useState()

    function isPastDate(date) {
        return differenceInCalendarDays(date, new Date()) < 0;
    }
    function OnlyFutureRow(props) {
        const isPastRow = props.dates.every(isPastDate);
        if (isPastRow) return <></>;
        return <Row {...props} />;
    }

    //get user
    const [user, loading, error] = useIdToken(auth);
    const [customer, setCustomer] = useState('');
    useEffect(() => {
        if (loading) return;
        if (user){
          setCustomer(user)
        }
      }, [user,loading]);
      
    //Get service
    useEffect(() => {
        const getService = async () => {
            const docRef = doc(db, "services", serviceId);
            const docSnap = await getDoc(docRef);

            const getStylist = async(elem) => {
                const docSnap = await getDoc(doc(db, "stylists", elem))
                setArr(arr.push({...docSnap.data(),id: elem}))
                setArrStylist([...arr])
            } 

            if (docSnap.exists()) {
                setService(docSnap.data())
                docSnap.data().stylist.forEach(item => getStylist(item))
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
        }
        getService();
    },[load])

    //List stylist and show clicked
    const Stylist = ({ active, onClick,elem }) => {
        return(
            <div onClick={onClick} className={active ? 'card_stylist active' : 'card_stylist'} >
                <IonCard>
                    <img alt="Stylist" src={elem.img} />
                    <IonCardTitle className='card_title'>{elem.name}</IonCardTitle>
                </IonCard>
            </div>
        )
    }

    //fetching available hours per stylist
    const getAvailableHours=async() => {
        const q = query(collection(db, "bookings"), where("stylist", "==", selected.id), where("date", "==", date));
        blockedTime=[]
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          blockedTime.push(doc.data().time)
        });
        setAvailableTime(working_hrs.filter((item) => !blockedTime.includes(item)))
    }

    useEffect(() => {
        if (date){
            if (format(date, 'PPP') === format(today, 'PPP')){
                let hour = new Date().getHours();
                if(hour>=20){
                    const x = working_hrs.splice(0,12)
                }
                if(hour===19){
                    const x = working_hrs.splice(0,11)
                }
                if(hour===18){
                    const x = working_hrs.splice(0,10)
                }
                if(hour===17){
                    const x = working_hrs.splice(0,9)
                }
                if(hour===16){
                    const x = working_hrs.splice(0,8)
                }
                if(hour===15){
                    const x = working_hrs.splice(0,7)
                }
                if(hour===14){
                    const x = working_hrs.splice(0,6)
                    console.log(working_hrs)
                }
                if(hour===13){
                    const x = working_hrs.splice(0,5)
                }
                if(hour===12){
                    const x = working_hrs.splice(0,4)
                }
                if(hour===11){
                    const x = working_hrs.splice(0,3)
                }
                if(hour===10){
                    const x = working_hrs.splice(0,2)
                }
                if(hour===9){
                    const x = working_hrs.splice(0,1)
                }
                if(hour<=8){
                    const x = working_hrs.splice(0,0)
                }   
            }
            getAvailableHours()
            setTime()
        }
    },[date,selected])
    

    //List hours and show clicked one
    const Hour = ({ active, time_hr, onClick }) => {
        return (
          <div onClick={onClick} className={active ? "hour active_time" : "hour"}>
            {time_hr}
          </div>
        );
    };

   
    //Saving appointment to firestore
    const saveAppointment = async()=>{
        const docRef = await addDoc(collection(db, "bookings"), {
            customer: customer.uid,
            service: serviceId,
            stylist: selected.id,
            date: date,
            time: time,
            status: 'pending'
          });
          console.log("Document written with ID: ", docRef.id);
          presentAlert({
            header: 'Success',
            subHeader: 'Appointment Booked Successfully',
            message: 'We will notify you once the appointment is confirmed.',
            buttons: ['OK'],
        })
          logs()
    }

  return (
    <IonPage>
    <IonContent>
    <Header />
        <div className='banner'>
          <div className='back_arrow' onClick={services}> <ChevronLeftIcon sx={{ fontSize: 32 }}/></div>
          <div className='banner_info'>Select stylist and book appointment</div>
        </div>
        <div className='services_container'>
            <div className='title'>{service.name}</div>
            <div className='stylist'>
                <p className='section_title'>Select stylist</p>
                <div className='stylists_list'>
                    {arrStlyist.map(elem =>(
                       <Stylist 
                            key={elem.id}
                            elem={elem}
                            active={elem === selected}
                            onClick={() =>setSelected(elem)}
                       />            
                    ))}
                </div>
            </div>
            <div className={selected ? 'date' : 'hiden'}>
                <p className='section_title'>Select Date</p>
                <DayPicker 
                    fromDate={today}
                    components={{ Row: OnlyFutureRow }}
                    hidden={isPastDate}
                    showOutsideDays
                    mode= 'single'
                    selected={date}
                    onSelect={setDate} 
                    //footer={footer} 
                />
            </div>
            <div className={date ? 'time' : 'hiden'}>
                <p className='section_title'>Select Time</p>
                <p>Pick a time from the available ones</p>
                    <div className="time_box">
                        {availableTime.map((t) => (
                          <Hour
                            key={t}
                            time_hr={t}
                            active={t === time}
                            onClick={() => setTime(t)}
                          />
                        ))}
                    </div>
            </div>
            <div className={time ? 'confirm' : 'hiden'}>
                <p className='section_title'>Confirm Appointment Details</p>
                <div className='details'>
                    <p> <b>Service</b>: {service.name}</p>
                    <p> <b>Stylist</b>: {selected.name}</p>
                    {date && 
                        <p> <b>Date</b>: {format(date, 'PPP')}</p> 
                    }
                    {time && 
                        <p> <b>Time</b>: {time}</p> 
                    }
                </div>
            </div>
            {time && 
            <div className='book-btn-container'>
                <Button
                    color="secondary"
                    type="submit"
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={saveAppointment}
                    sx={{ mt: 2, mb: 1 }}>Book Appointment
                </Button>
            </div>
            }

            <div className='bottom_spacer'><p> </p></div>
        </div>
    <Footer />
    </IonContent>
    </IonPage>
  )
}

export default BookingPage
