import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, X, Paperclip, Smile, ShieldCheck } from 'lucide-react';
import './ProjectChat.css';

export default function ProjectChat({ currentUser, recipientName, isOpen, onClose }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: recipientName,
      text: "Hello! I've started reviewing your proposal. It looks promising, but I have some questions regarding the feasibility of the Phase II hardware optimization.",
      time: "10:30 AM",
      type: 'received'
    },
    {
      id: 2,
      sender: 'System',
      text: "Clarification requested by Supervisor.",
      time: "10:31 AM",
      type: 'system'
    }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response
    if (currentUser === 'Supervisor') {
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'Student',
                text: "Thank you for the feedback, Doctor. I'm working on the hardware specs now. I'll update the PDF by tomorrow.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'received'
            }]);
        }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`project-chat-drawer ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        <div className="chat-title-group">
          <div className="chat-avatar-glow">
            <MessageSquare size={20} color="var(--royal-purple)" />
          </div>
          <div className="chat-info">
            <h3>Collaboration Portal</h3>
            <p>Chatting with {recipientName}</p>
          </div>
        </div>
        <button className="chat-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="chat-body" ref={scrollRef}>
        <div className="chat-encrypted-notice">
          <ShieldCheck size={14} />
          Messages are encrypted and visible only to assigned parties.
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            {msg.type !== 'system' && <span className="message-sender">{msg.sender}</span>}
            <div className={`message-bubble ${msg.type}`}>
              {msg.text}
              <span className="message-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-footer" onSubmit={handleSend}>
        <div className="chat-input-wrapper">
          <button type="button" className="chat-util-btn">
            <Paperclip size={18} />
          </button>
          <input 
            type="text" 
            placeholder="Type your feedback here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" className="chat-util-btn">
            <Smile size={18} />
          </button>
        </div>
        <button type="submit" className="chat-send-btn" disabled={!message.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
