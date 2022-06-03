import { createContext, useState, useEffect, useContext } from "react";

import SocketIO, { Socket } from 'socket.io-client';


interface SocketContextType {
  socket: Socket | undefined;
}

export const SocketContxt = createContext<SocketContextType>({} as SocketContextType)



interface Props {
  children:React.ReactNode
}


const HeaderProvider = ({ children }:Props) => {
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    }
  }, [])

  const connect = async () => {
    await fetch('/api/socket');
    setSocket(SocketIO());
    return null;
  }

  const disconnect = () => {
    console.log('disconnect');
    // socket?.disconnect();
    socket?.emit('disconneted');
  }

  return (
    <SocketContxt.Provider value={{ 
      socket
     }}>
      {children}
    </SocketContxt.Provider>
  );
};

export const useSocketContxt = () => {
  return useContext(SocketContxt);
};

export default HeaderProvider;

