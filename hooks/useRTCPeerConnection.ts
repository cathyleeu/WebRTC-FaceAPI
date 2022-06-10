import { useEffect} from 'react';
import { Socket } from 'socket.io-client';


export const iceServers:RTCConfiguration = {
  'iceServers': [
      { 'urls': 'stun:mtcnnRstun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
  ]
}

export async function getRTCPeerConnection(uuid:string, currentStream:MediaStream, isCaller:boolean):Promise<RTCPeerConnection> {
  const peer = new RTCPeerConnection(iceServers);

  peer.onicecandidate = event => onIceCandidate(event, uuid);
  
  peer.oniceconnectionstatechange = event => checkPeerConnectionState(event, uuid)

  peer.ontrack // got remote stream
  currentStream.getTracks().forEach((track:MediaStreamTrack) => {
    peer.addTrack(track)
  })
  
  
  if(isCaller) {
    try {
      const description = await peer.createOffer();  
      createdDescription(description, uuid)
    } catch (error) {
      errorHandler(error)
    }
  }


  function onIceCandidate(event:RTCPeerConnectionIceEvent, uuid:string) {
    if (event.candidate) {
      console.log('sending ice candidate');
      // socket?.emit('candidate', {
      //   type: 'candidate',
      //   uuid,
      //   label: event.candidate.sdpMLineIndex,
      //   id: event.candidate.sdpMid,
      //   candidate: event.candidate.candidate,
      // })
    }
  }

  async function createdDescription(description:RTCSessionDescriptionInit, uuid:string) {
    console.log(`got description, peer ${uuid}`);
    try {
      await peer.setLocalDescription(description)
      // socket.emit('offer', (event) => {
        //   do something for offer event
        //  
      // })  
    } catch (error) {
      errorHandler(error)
    }
  }

  
  function checkPeerConnectionState(event:Event, uuid:string) {
    let state:RTCIceConnectionState = peer.iceConnectionState;
    if (
      state === "failed" || 
      state === "closed" || 
      state === "disconnected"
    ) {
      //  remove peer 
      //  delete peerConnections[peerUuid];
    }
  }

  function errorHandler(error:Error) {
    console.error(error);
  }

  // TODO add ice candidate
  // socket.on('candidate', (event:any) => {
    // peer.addIceCandidate(new RTCIceCandidate(event.ice))
    
    // peerConnections[peerUuid].pc.addIceCandidate().catch(errorHandler);
  // })
  

  return peer 
}


const useRTCPeerConnection = () => {
  // const [caller, setCaller] = useState();
  // const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  useEffect(() => {
    
    // socket?.on('ready', async function () {
    //   if (caller) {
        
    //     // setPeerConnection();
    //     const callerPeer = new RTCPeerConnection(iceServers);
    //     callerPeer.onicecandidate = onIceCandidate;
    //     callerPeer.onconnectionstatechange = onConnectionStateChange;
    //     callerPeer.onnegotiationneeded = onNegotiationNeeded;

    //     // TODO: get stream and add tracck
    //     // localStream.getTracks();
    //     // callerPeer.addTrack
    //     // callerPeer.addStream(localStream);
    //     setPeerConnection(callerPeer)
    //   }
    // });

    // socket?.on('offer', async function (event) {
    //   const offer = await peerConnection!.createOffer();
    //   handleSetLocalDescription(offer)
    // });
    
    // socket?.on('answer', async function (event) {
    //   const answer = await peerConnection!.createAnswer();
    //   peerConnection?.setLocalDescription(answer);
    // })
  }, []);


  

  

  // function onConnectionStateChange(event:Event) {
  //   console.log(event);
  // }

  // function onNegotiationNeeded() {
  //   // onNegotiationNeeded
  // }

  // function handleSetLocalDescription(offer:RTCSessionDescriptionInit) {
  //   peerConnection?.setRemoteDescription(offer);
  // }
  // // FIXME: 
  
  // function setLocalAndOffer(sessionDescription:RTCSessionDescription) {
  //   socket?.emit('offer', {
  //       type: 'offer',
  //       sdp: sessionDescription,
  //       // room: roomNumber
  //   });
  // }

  // function setLocalAndAnswer(sessionDescription:RTCSessionDescription) {
  //   socket?.emit('answer', {
  //       type: 'answer',
  //       sdp: sessionDescription,
  //       // room: roomNumber
  //   });
  // }
  // function stopPeerConnection() {
  //   if(peerConnection) {
  //     peerConnection?.close();
      
        
  //     peerConnection.onicecandidate = null
      
  //     // peerConnection.gotDescription = null
  //     // peerConnection.gotRemoteTrack = null
  //   }
  //   setPeerConnection(null);
    
  // }

  function addTrack() {
    // TODO
  }
  function replaceTrack() {
    // TODO
    // const localTracks = localStream.getTracks()
    
    // audioSender
    // videoSender
  }

  return {

  }
}

export default useRTCPeerConnection;