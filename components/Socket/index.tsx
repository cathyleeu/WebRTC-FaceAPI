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

const iceServers:RTCConfiguration = {
  'iceServers': [
      { 'urls': 'stun:mtcnnRstun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
  ]
}

const SocketProvider = ({ children }:Props) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [caller, setCaller] = useState();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if(!connected) {
      connect();
    }

    socket?.on('message', (message) => {
      messages.push(message);
      setMessages([...messages]);
    })
  
    socket?.on('ready', async function () {
      if (caller) {
        
        // setPeerConnection();
        const callerPeer = new RTCPeerConnection(iceServers);
        callerPeer.onicecandidate = onIceCandidate;
        callerPeer.onconnectionstatechange = onConnectionStateChange;
        callerPeer.onnegotiationneeded = onNegotiationNeeded;

        // TODO: get stream and add tracck
        // localStream.getTracks();
        // callerPeer.addTrack
        // callerPeer.addStream(localStream);
        setPeerConnection(callerPeer)
      }
    });

    socket?.on('offer', async function (event) {
      const offer = await peerConnection!.createOffer();
      handleSetLocalDescription(offer)
    });
    
    socket?.on('answer', async function (event) {
      const answer = await peerConnection!.createAnswer();
      peerConnection?.setLocalDescription(answer);
    })

    if(connected) return () => {
      socket?.disconnect();
      setConnected(false);
    }
  }, [connected])
  
  

  

  function onIceCandidate(event:RTCPeerConnectionIceEvent) {
    if (event.candidate) {
      console.log('sending ice candidate');
      socket?.emit('candidate', {
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
      })
    }
  }

  function onConnectionStateChange(event:Event) {
    console.log(event);
  }

  function onNegotiationNeeded() {
    // onNegotiationNeeded
  }

  function handleSetLocalDescription(offer:RTCSessionDescriptionInit) {
    peerConnection?.setRemoteDescription(offer);
  }
  // FIXME: 
  function setLocalAndOffer(sessionDescription:RTCLocalSessionDescriptionInit) {
    socket?.emit('offer', {
        type: 'offer',
        sdp: sessionDescription,
        // room: roomNumber
    });
  }

  function setLocalAndAnswer(sessionDescription:RTCLocalSessionDescriptionInit) {
    socket?.emit('answer', {
        type: 'answer',
        sdp: sessionDescription,
        // room: roomNumber
    });
  }
  function stopPeerConnection() {
    if(peerConnection) {
      peerConnection?.close();
      
        
      peerConnection.onicecandidate = null
      
      // peerConnection.gotDescription = null
      // peerConnection.gotRemoteTrack = null
    }
    setPeerConnection(null);
    
  }

  function addTrack() {
    // TODO
  }
  function replaceTrack() {
    // TODO
    // const localTracks = localStream.getTracks()
    
    // audioSender
    // videoSender
  }

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

