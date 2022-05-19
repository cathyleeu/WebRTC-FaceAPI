import type { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from "../../types/socket";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";


export default async function SocketHandler(
  req: NextApiRequest, 
  res: NextApiResponseServerIO
) {
  if(res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const httpServer:NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer);
    res.socket.server.io = io;
  }
  res.end();
};