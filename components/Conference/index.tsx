import {useEffect, useState } from 'react';
import Player from '@components/Player';
import { createUUID } from '@utils/index';
import {useSocket} from '@components/Socket';
import { useMedia } from '../Player/MediaContext'
import {iceServers, getRTCPeerConnection} from '@hooks/useRTCPeerConnection'

interface Peers {
  [peerUuid:string]: {
    username: string;
    uuid: string;
    pc: RTCPeerConnection;
  }
}

const Conference = () => {
  const { socket, connected } = useSocket();
  const {currentStream} = useMedia();
  const [localUUID, setLocalUUID] = useState('');
  const [peers, setPeers] = useState<Peers>({})
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

  async function setUpPeer(peerUuid:string, username:string, isCaller = false) {
    const pc = await getRTCPeerConnection(peerUuid, currentStream!, isCaller);

    peers[peerUuid] = { username, uuid: peerUuid, pc }
    setPeers(peers)
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