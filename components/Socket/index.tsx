import { createContext, useState, useEffect, useContext } from "react";

import SocketIO, { Socket } from 'socket.io-client';


type Message = {
  message: string; 
  username: string;
}
interface SocketContextType {
  messages?: Message[];
  sendMessage: (message:Message) => void;
}

export const SocketContxt = createContext<SocketContextType>({} as SocketContextType)



interface Props {
  children:React.ReactNode
}


const SocketProvider = ({ children }:Props) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if(!connected) {
      connect();
    }

    socket?.on('message', (message) => {
      messages.push(message);
      setMessages([...messages]);
    })

    if(connected) return () => {
      socket?.disconnect();
      setConnected(false);
    }
  }, [connected])

  const connect = async () => {
    await fetch('/api/socket');
    setSocket(SocketIO());
    setConnected(true);
  }

  async function sendMessage(message:Message) {
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  return (
    <SocketContxt.Provider value={{ 
      sendMessage,
      messages
     }}>
      {children}
    </SocketContxt.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContxt);
};

export default SocketProvider;

