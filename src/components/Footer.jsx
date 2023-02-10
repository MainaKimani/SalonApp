import './footer.css'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Footer() {

  let history = useHistory();
    let Home = () => {
        history.push('/')
      }
      let Bookings = () => {
        history.push('/Bookings')
      }
      let Account = () => {
        history.push('/Account')
      }
  
  const [value, setValue] = useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
    return (
    <div className="footer_bar">
      <BottomNavigation sx={{ width: 600 }} value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon onClick={Home} />} />
        <BottomNavigationAction label="My Bookings" icon={<ReceiptLongOutlinedIcon onClick={Bookings} />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleOutlinedIcon onClick={Account} />} />
      </BottomNavigation>
        {/* <div className='icon home_icon'><HomeOutlinedIcon sx={{ fontSize: 28 }} /></div>
        <div className='icon logs_icon'><ReceiptLongOutlinedIcon sx={{ fontSize: 28 }} /></div>
        <div className='icon account_icon'><AccountCircleOutlinedIcon sx={{ fontSize: 28 }} /></div> */}
    </div>
  )
}

export default Footer