import {useEffect, useState } from 'react';
import Player from '@components/Player';
import { createUUID } from '@utils/index';
import {useSocket} from '@components/Socket';
import { useMedia } from '../Player/MediaContext'

// TODO : list peerConnections
// function setUpPeer(peerUuid, displayName, initCall = false) {
//   peerConnections[peerUuid] = { 'displayName': displayName, 'pc': new RTCPeerConnection(peerConnectionConfig) };
//   peerConnections[peerUuid].pc.onicecandidate = event => gotIceCandidate(event, peerUuid);
//   peerConnections[peerUuid].pc.ontrack = event => gotRemoteStream(event, peerUuid);
//   peerConnections[peerUuid].pc.oniceconnectionstatechange = event => checkPeerDisconnect(event, peerUuid);
//   peerConnections[peerUuid].pc.addStream(localStream);

//   if (initCall) {
//     peerConnections[peerUuid].pc.createOffer().then(description => createdDescription(description, peerUuid)).catch(errorHandler);
//   }
// }

const Conference = () => {
  const { socket, connected } = useSocket();
  const {currentStream} = useMedia();
  const [localUUID, setLocalUUID] = useState('');
  useEffect(() => {

  }, [])
  function init() {
    setLocalUUID(createUUID);

  }
  function createPeerConnection () {

  }

  function makeConnection() {
    const rtcPeerConnection = new RTCPeerConnection();
    currentStream
      ?.getTracks()
      .forEach((track) => rtcPeerConnection.addTrack(track, currentStream));
   
  }
  const handleCall = () => {

  }
  const handleHangup = () => {
    // makeConnection()
    // stopMediaStream(currentStream!)
  }
  const handleStop = () => {
    // videoRef.current.stop()
    // stopMediaStream(currentStream);
  }
  return (
    <div>
      <button onClick={handleCall}>Call</button>
      <button onClick={handleHangup}>HangUp</button>
      <div>
        <p>LocalVideo</p>
        <Player stream={currentStream!} />
      </div>
      
    </div>
  )
}

export default Conference;