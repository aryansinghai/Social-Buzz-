import './post.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://backend-ppzm.onrender.com/api/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put('https://backend-ppzm.onrender.com/api/posts/' + post._id + '/like', { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture ? `assets/${user.profilePicture}` : 'assets/person/noProfilePic.png'} className='postProfileImg' alt='' />
            </Link>
            <span className='postUserName'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img src={`assets/${post.img}`} className='postImg' alt='' />
        </div>

        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img src={`assets/like.png`} alt='' className='likeIcon' onClick={likeHandler} />
            <img src={`assets/heart.png`} alt='' className='likeIcon' onClick={likeHandler} />
            <span className='postLikeCounter'>{like} people liked it</span>
          </div>
        </div>
      </div>
    </div>
  );
}
