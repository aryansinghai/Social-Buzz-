import React from 'react'
import "./userCard.css"

export default function UserCard({user}) {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <img 
            src={user.profilePicture? PF+user.profilePicture:PF+"person/noProfilePic.png"} 
            alt="" 
            className="userCardImg" 
        />
        <span style={{textAlign:"center"}}>{user.username}</span>

    </div>
  )
}
