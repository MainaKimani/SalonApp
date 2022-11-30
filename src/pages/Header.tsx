import { NotificationsOutlined } from '@mui/icons-material';
import './main.css';

function Header() {
  return (
    <div className="top_bar">
        <div className='top_bar_content'>
          <span className='app_name'>The Blend</span>
          <div className='menu_icon'><NotificationsOutlined /></div>
        </div>
    </div>
  )
}

export default Header