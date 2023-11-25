import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ? await axios.get('https://backend-ppzm.onrender.com/api/posts/profile/' + username) : await axios.get('https://backend-ppzm.onrender.com/api/posts/timeline/' + user._id);
      setPosts(
        // eslint-disable-next-line array-callback-return
        res.data.sort((p1, p2) => {
          if (p1 !== null && p2 !== null) return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
