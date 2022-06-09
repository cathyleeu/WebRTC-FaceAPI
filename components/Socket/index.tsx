import { createContext, useState, useEffect, useContext } from "react";
import SocketIO, { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | undefined;
  connected: boolean;
}

export const SocketContext = createContext<SocketContextType>({} as SocketContextType)


interface Props {
  children:React.ReactNode
}

const SocketProvider = ({ children }:Props) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if(!socket) {
      connectSocket();
    }

    if(socket) return () => {
      socket?.disconnect();
      setConnected(false);
    }
  }, [connected])
  
  async function connectSocket() {
    await fetch('/api/socket');
    setSocket(SocketIO());
    setConnected(true);
    console.log('running socket connect');
  }

  return (
    <SocketContext.Provider value={{
      socket,
      connected
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketProvider;

