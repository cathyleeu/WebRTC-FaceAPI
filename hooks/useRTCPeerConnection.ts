import { useEffect} from 'react';


const iceServers:RTCConfiguration = {
  'iceServers': [
      { 'urls': 'stun:mtcnnRstun.services.mozilla.com' },
      { 'urls': 'stun:stun.l.google.com:19302' }
  ]
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


  

  // function onIceCandidate(event:RTCPeerConnectionIceEvent) {
  //   if (event.candidate) {
  //     console.log('sending ice candidate');
  //     socket?.emit('candidate', {
  //       type: 'candidate',
  //       label: event.candidate.sdpMLineIndex,
  //       id: event.candidate.sdpMid,
  //       candidate: event.candidate.candidate,
  //     })
  //   }
  // }

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