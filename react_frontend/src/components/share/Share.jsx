import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import './share.css';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      try {
        await axios.post('https://backend-ppzm.onrender.com/api/upload', data);
      } catch (err) {}
    }
    try {
      await axios.post('https://backend-ppzm.onrender.com/api/posts', newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img src={user.profilePicture ? user.profilePicture : 'assets/person/noProfilePic.png'} className='shareProfileImg' alt='' />
          <input placeholder={"what's in your mind " + user.username + '?'} className='shareInput' ref={desc} />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia className='shareIcon' htmlColor='tomato' />
              <span className='shareOptionText'>Photo or Video</span>
              <input style={{ display: 'none' }} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
            </label>
            <div className='shareOption'>
              <Label className='shareIcon' htmlColor='blue' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room className='shareIcon' htmlColor='green' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions className='shareIcon' htmlColor='orange' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
