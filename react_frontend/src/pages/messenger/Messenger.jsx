import React, { useContext, useEffect, useRef, useState } from 'react';
import './messenger.css';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import SearchBox from '../../components/SearchBox/SearchBox';

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]); //stores all the conversation/chats
  const [currentChat, setCurrentChat] = useState(null); // stores the current conversation id we choose
  const [messages, setMessages] = useState([]); //stores the messages corresponding to the current convo id
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef(); //to connect to socket
  const [newMessage, setNewMessage] = useState(''); //stores the new message state from the text area
  const scrollRef = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);

  //connecting to socket
  useEffect(() => {
    socket.current = io('https://backend-ppzm.onrender.com');

    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`https://backend-ppzm.onrender.com/api/conversations/${user._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  //to load messages corresponding to current convo
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`https://backend-ppzm.onrender.com/api/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  //when we send a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user._id);

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post('https://backend-ppzm.onrender.com/api/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  //to auto scroll when new message sent/received
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <SearchBox />
            {conversations.map((c) => (
              <>
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className='vl'></div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea className='chatMessageInput' placeholder='enter message' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className='noCoversationText'>Open a conversation to start a chat</span>
            )}
          </div>
        </div>
        <div className='vl'></div>
      </div>
    </>
  );
}
