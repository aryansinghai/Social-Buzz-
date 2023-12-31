import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../Online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`https://backend-ppzm.onrender.com/api/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    if (currentUser.followings.includes(user?._id)) {
      setFollowed(true);
    }
  }, [currentUser, user]);

  const handleFollow = async () => {
    try {
      if (!followed) {
        await axios.put(`https://backend-ppzm.onrender.com/api/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: 'FOLLOW', payload: user._id });
        setFollowed(true);
      } else {
        console.log('You are already following this user.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      if (followed) {
        await axios.put(`https://backend-ppzm.onrender.com/api/users/${user._id}/unfollow`, { userId: currentUser._id });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
        setFollowed(false);
      } else {
        console.log('You are not following this user.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img src='/assets/gift.png' className='birthdayImg' alt='' />
          <span className='birthdayText'>
            <b>Pari</b> and <b>3 others friends</b> have a birthday today
          </span>
        </div>
        <img src='/assets/ad.png' alt='' className='rightbarAd' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='FriendList'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={followed ? handleUnfollow : handleFollow}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : 'Other'}</span>
          </div>
        </div>

        <h4 className='rightbarTitle'>User Friends</h4>

        <div className='rightbarFollowings'>
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`} style={{ textDecoration: 'none' }} key={friend._id}>
              <div className='rightbarFollowing'>
                <img src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/noProfilePic.png'} alt='' className='rightbarFollowingImg' />
                <span className='rightbarFollowingName'>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>{user ? <ProfileRightBar /> : <HomeRightBar />}</div>
    </div>
  );
}
