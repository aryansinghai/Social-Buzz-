import './topbar.css';
import { Chat } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { logoutCall } from '../../apiCalls';
import SearchBox from '../SearchBox/SearchBox';

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = () => {
    logoutCall(dispatch);
  };

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className='logo'>Social Buzz</span>
        </Link>
      </div>

      <div className='topbarCenter'>
        <SearchBox />
      </div>

      <div className='topbarRight'>
        <div className='topbarLinks'>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <span className='topbarLink'>HomePage</span>
          </Link>
          <Link to='/messenger'>
            <div className='chatOption'>
              <span>Chat</span>
              <Chat />
            </div>
          </Link>
        </div>

        <div className='topbarIcons'>
          <Link to={`assets/profile/${user.username}`}>
            <img src={user.profilePicture ? `assets/${user.profilePicture}` : 'assets/person/noProfilePic.png'} alt='' className='topbarImg' />
          </Link>
          <span className='topbarLink2' onClick={handleClick}>
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
