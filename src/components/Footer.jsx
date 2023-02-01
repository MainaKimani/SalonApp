import './footer.css'
import { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Footer() {
  
  const [value, setValue] = useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
    return (
    <div className="footer_bar">
      <BottomNavigation sx={{ width: 600 }} value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
        <BottomNavigationAction label="My Bookings" icon={<ReceiptLongOutlinedIcon />} />
        <BottomNavigationAction label="Account" icon={<AccountCircleOutlinedIcon />} />
      </BottomNavigation>
        {/* <div className='icon home_icon'><HomeOutlinedIcon sx={{ fontSize: 28 }} /></div>
        <div className='icon logs_icon'><ReceiptLongOutlinedIcon sx={{ fontSize: 28 }} /></div>
        <div className='icon account_icon'><AccountCircleOutlinedIcon sx={{ fontSize: 28 }} /></div> */}
    </div>
  )
}

export default Footer