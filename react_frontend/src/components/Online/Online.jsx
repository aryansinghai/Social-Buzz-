import './Online.css';

export default function Online({ user }) {
  return (
    <li className='Friend'>
      <div className='profileImgContainer'>
        <img className='profileImg' src={`/assets/${user.profilePicture}`} alt='' />
        <span className='online'></span>
      </div>
      <span className='username'>{user.username}</span>
    </li>
  );
}
