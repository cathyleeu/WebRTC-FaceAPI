import { useState, useEffect } from 'react';
import {useSocket} from 'components/Socket';


interface Message {
  message: string; 
  username: string;
}

const useChat = () => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  // TODO : username, id 
  useEffect(() => {
    if(connected) {
      socket?.on('message', (message) => {
        messages.push(message);
        setMessages([...messages]);
      })
    }
  }, [connected])

  async function sendMessage(message:Message) {
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  return {
    messages,
    setMessages,
    sendMessage
  }
}

export default useChat;