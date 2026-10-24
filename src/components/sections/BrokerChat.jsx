import React from 'react';

import { useState , useEffect } from 'react';
import { useParams } from 'react-router';
import { io } from "socket.io-client";
import brokerService from '../../services/brokerService';

const BrokerChat = () => {

    const [broker,setBroker]=useState()


    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [inputText, setInputText] = useState("");

    const {id}=useParams()

    console.log(id)

    const getBroker=async()=>{

        try{

            const data=await brokerService.getSingleBroker(id)

            console.log(data)
            setBroker(data.broker)

        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getBroker(id)
    } , [id])



  // Default broker profile info
  const {
    name = broker?.name || "",
    profileImage = broker?.image,
    isOnline = true
  } = broker || {};

 

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="max-w-md mx-auto h-[600px] flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden font-sans">
      {/* Top Bar / Header */}
      <div className="flex items-center space-x-3 px-5 py-4 border-b border-gray-100 bg-white">
        <div className="relative">
          <img
            src={profileImage}
            alt={name}
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 leading-tight">{name}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isOnline ? 'Active now' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  isUser
                    ? 'bg-gray-900 text-white rounded-br-none'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-xs'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default BrokerChat;