import "./Sidebar.css";
import {RssFeed,Chat,QuestionMark} from "@mui/icons-material"
import {Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"


export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    
                    
                    
                    <li className="sidebarListItem">
                        <QuestionMark className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                   
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFrindList">
                    {Users.map(u=>(
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}