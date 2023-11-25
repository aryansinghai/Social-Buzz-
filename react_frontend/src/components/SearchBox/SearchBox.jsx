import './searchbox.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../UserCard/UserCard';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setUsers([]);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const getRes = async () => {
      if (search) {
        const res = await axios.get(`https://backend-ppzm.onrender.com/api/users/search?username=${search}`);
        setUsers(res.data.users);
      }
    };
    getRes();
    if (search === '') setUsers([]);
  }, [search]);

  return (
    <form className='search-form'>
      <input type='text' name='search' value={search} id='search' placeholder='Search...' ref={searchRef} onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />

      <div className={`users ${users.length > 0 ? '' : 'hide'}`} ref={searchRef}>
        {users.map((user) => (
          <Link to={`/profile/${user.username}`}>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </form>
  );
}
