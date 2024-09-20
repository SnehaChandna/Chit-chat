<<<<<<< HEAD
import React from 'react';
import Avatar from '../../assets/account.png'
import Call from '../../assets/call.png'
import Input from "../../components/input"
import Send from "../../assets/send.png"
import Attach from "../../assets/attach-file.png"

const Dashboard = () => {
  const contacts=[{
    name: 'Chetan',
    status: 'Hii there! I am using this',
    img: Avatar
  },
  {
    name: 'Chetan',
    status: 'Hii there! I am using this',
    img: Avatar
  },
  {
    name: 'Chetan',
    status: 'Hii there! I am using this',
    img: Avatar
  },
  {
    name: 'Chetan',
    status: 'Hii there! I am using this',
    img: Avatar
  },
  {
    name: 'Chetan',
    status: 'Hii there! I am using this',
    img: Avatar
  }]
  return (
    <div className='w-screen h-screen flex'>
      <div className='w-[20%] h-full bg-[#dbf0fe]'>
        <div className='flex justify-content items-center my-8'>
          <div className='ml-5'><img src={Avatar} width={50} height={75} /></div>
          <div className='ml-8'>
            <h3 className='2-xl font-semibold'>
              Sneha
            </h3>
            <p className='2-lg font-light'>
              My Account
            </p>
          </div>
        </div>
        <hr/>
        <div className='ml-3 mt-10 text-xlg text-[#1560BD]'>
          Chats
        </div>
        <div>
          {
          contacts.map(({ name, status, img })=> {
            return(
              <div className='flex items-center my-3 border-b border-b-gray-300'>
              <div className='cursor-pointer flex item-center'>
              <div className='ml-5 m-1 border p-[1px] rounded-full'><img src={img} width={45} height={60} /></div>
              <div className='ml-8'>
                <h3 className='text-xlg font-semibold'>
                  {name}
                </h3>
                <p className='text-sm font-light text-gray-400'>
                  {status}
                </p>
              </div>
              </div>
            </div>
            )
          })
        }
        </div>
      </div>
      <div className='w-[60%] h-screen bg-white flex flex-col items-center '>
          <div className='w-[90%] bg-[#dbf0fe] h-[60px] mt-7 rounded-full flex items-center px-10'>
          <div><img src={Avatar} width={35} height={35} /></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-xlg font-semibold'> Rahul </h3>
            <p className='text-sm font-light text-gray-400'> online </p>
          </div>
          <div className='cursor-pointer'><img src={Call} width={20} height={20} /></div>
          </div>
          <div className='h-[70%] w-full overflow-scroll shadow-sm'>
              <div className='px-10 py-14'>
                  <div className='max-w-[42%] rounded-b-xl rounded-tr-lg bg-[#edf3f7] p-4 mb-4'> 
                    Dummy text
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tl-lg bg-[#d8e8f2] ml-auto p-4 mb-4'>
                    Dummy text 
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tr-lg bg-[#edf3f7] p-4 mb-4'> 
                    Dummy text
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tl-lg bg-[#d8e8f2] ml-auto p-4 mb-4'>
                    Dummy text 
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tr-lg bg-[#edf3f7] p-4 mb-4'> 
                    Dummy text
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tl-lg bg-[#d8e8f2] ml-auto p-4 mb-4'>
                    Dummy text 
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tr-lg bg-[#edf3f7] p-4 mb-4'> 
                    Dummy text
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tl-lg bg-[#d8e8f2] ml-auto p-4 mb-4'>
                    Dummy text 
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tr-lg bg-[#edf3f7] p-4 mb-4'> 
                    Dummy text
                  </div>
                  <div className='max-w-[42%] rounded-b-xl rounded-tl-lg bg-[#d8e8f2] ml-auto p-4 mb-4'>
                    Dummy text 
                  </div>
              </div>
          </div>
          <div className='p-14 w-full flex item-center'>
              <Input placeholder='Message' className='w-[85%]' inputClassName='p-2 px-4 shadow-md rounded-full border-0 bg-[#d7ecf7] focus:ring-0 focus:border-0'/>
              <div className='ml-4 mt-1.5'><img src={Send} width={25} height={25} /></div>
              <div className='ml-4 mt-1.5'><img src={Attach} width={25} height={25} /></div>
          </div>
      </div>
      <div className='w-[20%] h-screen bg-[#dee9fa]'></div>
=======
import React, { useEffect, useState } from 'react';
import Avatar from '../../assets/account.png';
import Call from '../../assets/call.png';
import Send from "../../assets/send.png";
import Attach from "../../assets/attach-file.png";

const Input = ({ className, inputClassName, ...props }) => (
  <input
    className={`${inputClassName} w-full p-2 rounded-full outline-none`}
    {...props}
  />
);

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');


  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user:detail'));
        if (loggedInUser && loggedInUser.id) {
          const res = await fetch(`http://localhost:8000/api/conversations/${loggedInUser.id}`);
          const resData = await res.json();
          setConversations(resData);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId, conversationUser) => {
    try {
      const res = await fetch(`http://localhost:8000/api/message/${conversationId}`);
      const resData = await res.json();
      setMessages(resData);
      setSelectedConversation(conversationId);
      setSelectedUser(conversationUser);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    try {
      const res = await fetch('http://localhost:8000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: selectedConversation,
          senderId: user?.id,
          message: messageInput,
          receiverId: selectedUser?.id
        }),
      });
      const resData = await res.json();
      console.log('resData :>> ', resData);

      // Update the messages list with the new message
      setMessages(prevMessages => [...prevMessages, {
        ...resData,
        user: { id: user?.id } // Ensure the user object has an id for rendering
      }]);
      
      // Clear the input field
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='w-screen h-screen flex bg-gray-100'>
      {/* Left sidebar */}
      <div className='w-1/4 h-full bg-white shadow-md overflow-y-auto'>
        <div className='flex items-center p-4 border-b'>
          <img src={Avatar} className="w-12 h-12 rounded-full" alt="User Avatar" />
          <div className='ml-4'>
            <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
            <p className='text-sm text-gray-500'>My Account</p>
          </div>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Chats</h2>
          {conversations.map(({ conversationId, user: conversationUser }) => (
            conversationUser && (
              <div 
                key={conversationId} 
                className='flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition'
                onClick={() => fetchMessages(conversationId, conversationUser)}
              >
                <img src={Avatar} className="w-10 h-10 rounded-full" alt="Contact Avatar" />
                <div className='ml-3'>
                  <h4 className='font-medium'>{conversationUser.fullName}</h4>
                  <p className='text-sm text-gray-500'>{conversationUser.email}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className='flex-1 flex flex-col'>
        {selectedConversation ? (
          <>
            <div className='bg-white shadow-sm p-4 flex items-center'>
              <img src={Avatar} className="w-10 h-10 rounded-full" alt="Active Chat Avatar" />
              <div className='ml-4'>
                <h3 className='font-semibold'>{selectedUser?.fullName}</h3>
                <p className='text-sm text-gray-500'>{selectedUser?.email}</p>
              </div>
              <img src={Call} className="w-6 h-6 ml-auto cursor-pointer" alt="Call Icon" />
            </div>
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {messages.length > 0 ? (
                messages.map(({ user: messageUser, message }, index) => {
                  const isCurrentUser = messageUser?.id === user?.id;
                  return (
                    <div
                      key={index}
                      className={`max-w-[70%] p-3 rounded-lg ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message}
                    </div>
                  );
                })
              ) : (
                <div className='text-center text-gray-500 mt-10'>
                  No messages in this conversation yet
                </div>
              )}
            </div>
            <div className='p-4 bg-white'>
              <div className='flex items-center bg-gray-100 rounded-full p-2'>
                <Input
                  placeholder='Type a message...'
                  className='flex-1 bg-transparent border-none focus:ring-0'
                  inputClassName='bg-transparent'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <img src={Attach} className="w-6 h-6 mx-2 cursor-pointer" alt="Attach Icon" />
                <img 
                  src={Send} 
                  className={`w-6 h-6 cursor-pointer ${!messageInput.trim() ? 'opacity-50' : ''}`} 
                  alt="Send Icon"
                  onClick={sendMessage}
                  style={{ pointerEvents: messageInput.trim() ? 'auto' : 'none' }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <p className='text-xl text-gray-500'>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
>>>>>>> e6032e2f (backend integrated)
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> e6032e2f (backend integrated)
