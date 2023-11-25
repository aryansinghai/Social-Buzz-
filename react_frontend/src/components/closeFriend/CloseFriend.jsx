import './CloseFriend.css';

export default function CloseFriend({ user }) {
  return (
    <div>
      <li className='sidebarFriend'>
        <img src={`/assets/${user.profilePicture}`} alt='' className='sidebarFriendImg' />
        <span className='sidebarFriendName'>{user.username}</span>
      </li>
    </div>
  );
}
