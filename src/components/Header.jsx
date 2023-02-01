import { useState, useEffect } from 'react';
import { NotificationsOutlined } from '@mui/icons-material';
import './header.css';

function Header() {

  let [color, setColor] = useState(true);

  // useEffect(() => {
  //   const COLOR_CHANGE_THRESHOLD = 10;

  //    if(window.scrollY >= COLOR_CHANGE_THRESHOLD && color !== true){
  //             setColor(true)
  //         }
  //    if(window.scrollY < COLOR_CHANGE_THRESHOLD && color !== false){
  //             setColor(false)
  //         }
  // }, [window.scrollX])


  return (
    <div className={color ? 'top_bar header_bg' : 'top_bar'}>
        <div className='top_bar_content'>
          <span className='app_name'>The Blend</span>
          <div className='menu_icon'><NotificationsOutlined /></div>
        </div>
    </div>
  )
}

export default Header