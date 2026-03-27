import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, addMessage, clearError } from '../../store/chatSlice';
import { Send, Bot, User, Loader2, AlertCircle, Trash2 } from 'lucide-react';

const ChatInterface = () => {
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_OPENAI_API_KEY || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state) => state.chat);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    const userMessage = { role: 'user', content: inputValue.trim() };
    dispatch(addMessage(userMessage));
    setInputValue('');
    
    dispatch(sendMessage({ message: inputValue.trim(), apiKey }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>AI Chat Companion</h1>
      </header>

      <main className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        
        {isLoading && (
          <div className="loading-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}

        {error && (
          <div className="error-message p-4 border rounded bg-red-100/10 text-red-500 mt-4 flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => dispatch(clearError())} className="ml-auto">
              <Trash2 size={14} />
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <div className="input-area">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows="1"
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !inputValue.trim()} className="send-btn">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
