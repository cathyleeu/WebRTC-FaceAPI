import type { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from "../../types/socket";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "https";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function SocketHandler(
  req: NextApiRequest, 
  res: NextApiResponseServerIO
) {

  if(!res.socket.server.io) {
    console.log('Socket is initializing');
    const server:NetServer = res.socket.server as any;
    const io = new ServerIO(server);
    res.socket.server.io = io;
  }
  console.log('Socket is already initialized');
  res.end();
};