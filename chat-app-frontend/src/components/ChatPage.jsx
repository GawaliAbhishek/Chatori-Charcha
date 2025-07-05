import React, { useEffect, useRef } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import { useState } from 'react'
import useChatContext from '../context/chatContext'
import { useNavigate } from 'react-router'
import SockJS from 'sockjs-client'
import { baseURL } from '../config/AxiosHelper'
import { Stomp } from '@stomp/stompjs'
import toast from 'react-hot-toast'
import { getMessages } from '../services/RoomService'
import { timeAgo } from '../config/TimeHelpwe'

const ChatPage = () => {

     const{ roomId,currentUser,connected,setConnected,setRoomId,setCurrentUser } = useChatContext();
     const navigate = useNavigate();
    
     useEffect(()=>{
        if(!connected)
            navigate("/")
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[connected , roomId , currentUser ])
     

    const [messages, setMessages] = useState([])
    const[input ,setInput]=useState("")
    const chatBoxRef = useRef(null)
    const[stompClient ,setStompClient]=useState(null)

    useEffect(()=>{
    async function loadMessages(){
        try {
          const messages =  await getMessages(roomId);
        //   console.log(messages);
          setMessages(messages);
          
        } catch (error) {
            console.log(error);
            
        }
    }

   if(connected)
     loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // scroll down
    useEffect(()=>{
        if(chatBoxRef.current){
            chatBoxRef.current.scroll({
                top:chatBoxRef.current.scrollHeight,
                behavior:"smooth",
            })
        }
    },[messages])
    // stomp client init
    useEffect(()=>{

        const connectWebSocket = ()=>{
        // sockJS object creation
        const sock = new SockJS(`${baseURL}/chat`);

        //create a client
        const client = Stomp.over(sock);
        client.connect({},()=>{

            setStompClient(client);

            toast.success('Connected to Websocket')

            client.subscribe(`/topic/room/${roomId}`,(message)=>{
                console.log(message);

                const newMessage = JSON.parse(message.body);

                setMessages((prev)=>[...prev,newMessage]);
                
            })
        })
        }

        if(connected)
            connectWebSocket();

    },[roomId,connected])

    // send messages
    const sendMesssge = async ()=>{
        if(stompClient && connected && input.trim()){
            // console.log(input);
            const message ={
                sender:currentUser,
                content:input,
                roomId:roomId,
            }

            stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
            setInput("");
            
        }
    }

    const handleLogout =()=>{
        stompClient.disconnect();
        setConnected(false);
        setRoomId("")
        setCurrentUser("")
        navigate("/")
    }

    return (
        <div className=''>
            <header className='dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5  shadow flex justify-around items-center'>
                <div>
                    <h1 className='text-xl font-semibold'><span>{currentUser}</span></h1>
                </div>
                <div>
                    <h1 className='text-xl font-semibold'><span>{roomId}</span></h1>
                </div>
                <div>
                    <button
                    onClick={handleLogout}
                     className='dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded'>Leave Group</button>
                </div>
            </header>


            <main ref={chatBoxRef} className='py-20 w-2/3 dark:bg-slate-800 mx-auto h-screen overflow-auto  border'>
                {messages.map((message, index) => 
                    <div key={index} className={`flex px-10 
                    ${message.sender == currentUser ?"justify-end":"justify-start"}`}>
                        <div  className={`my-2 p-2 max-w-xs rounded 
                            ${message.sender == currentUser ?  "bg-purple-500":" bg-blue-500 " }`}>
                        <div className='flex flex-row gap-5'>
                            <img className='h-10 w-10' src="https://avatar.iran.liara.run/public/29" alt="" />
                            <div className='flex flex-col gap-1'>
                                <p className='text-sm font-bold'>{message.sender}</p>
                                <p>{message.content}</p>
                                <p className='text-xs text-gray-800'>{timeAgo(message.timestamp)}</p>
                            </div>
                        </div>

                    </div>
                    </div>
                )
                }

            </main>



            <div className='fixed bottom-4 w-full h-16'>
                <div className='h-full  pr-10 gap-4 flex items-center justify-between rounded w-1/2 mx-auto dark:bg-gray-900'>

                    <input
                    value={input}
                    onChange={(e)=>{setInput(e.target.value)}}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            sendMesssge();
                        }
                    }}
                     type='text'
                        placeholder="Type your message here..."
                        className="w-full dark:bg-gray-900  px-5 py-2 rounded h-full focus:outline-none  " />

                    <div className='flex gap-3'>
                        <button className='dark:bg-green-600 h-10 w-10 rounded-full flex justify-center items-center '>
                            <MdAttachFile size={18} />
                        </button>

                        <button onClick={sendMesssge} className='dark:bg-blue-600 h-10 w-10 rounded-full flex justify-center items-center '>
                            <MdSend size={18} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChatPage