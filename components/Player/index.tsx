import { useState, useEffect, useRef } from 'react';
import { getConstraints } from '../../utils/player'


interface MediaSettingType {
  videoinput: MediaDeviceInfo[],
  audioinput: MediaDeviceInfo[],
  audiooutput: MediaDeviceInfo[],
  mic?: boolean;
  cam?: boolean;
}
const Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStream, setCurrentStream] = useState<MediaStream>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  const [mediaSetting, setMediaSetting] = useState<MediaSettingType>({
    videoinput: [],
    audioinput: [],
    audiooutput: [],
    mic: true,
    cam: true
  }) 

  const checkPermission = (): Promise<boolean> => {
    /* check if browser currently has permission */
    return new Promise(async (resolve, reject) => {
      if (navigator.permissions) {
        // @ts-ignore : camera | microphone is not in query enum ts should be updated
        const cam = await navigator.permissions.query({ name: 'camera' })
        // @ts-ignore
        const mic = await navigator.permissions.query({ name: 'microphone' })
        resolve(cam.state === 'granted' && mic.state === 'granted')
      } else {
        resolve(false)
      }
    })
  }

  const requestPermission = async(): Promise<void> => {
    /*  turns default webcam on, then turns it off in order for
    mediaDevices.enumerateDevices() to work correctly on incognito windows */

    try {
      const stream:MediaStream = await navigator.mediaDevices.getUserMedia(getConstraints({}))
      stopMediaStream(stream);
      getDeviceInfo();
    } catch (error) {
      console.error(error)
    }
  }

  const updateMediaStream = async (cameraId:string, audioId:string) => {
    const stream = await navigator.mediaDevices.getUserMedia(getConstraints({audioId, cameraId}));
    videoRef.current!.srcObject = stream;
    videoRef.current?.play();
    setCurrentStream(stream);
  }

  function stopMediaStream(media: MediaStream): void {
    media?.getTracks().forEach((track:MediaStreamTrack) => track.stop())
  }
  
  const getDeviceInfo = async ():Promise<void> => {
    try {
      let temp:MediaSettingType = { videoinput: [] , audioinput: [], audiooutput: [] } 
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach((device:MediaDeviceInfo) => { 
        temp[device.kind].push(device)
      })
      setMediaSetting({...mediaSetting, ...temp});
      updateMediaStream(
        temp.videoinput[0].deviceId,
        temp.audioinput[0].deviceId
      );

    } catch (error) {
      console.error(error)
    }
  }
  

  useEffect(() => {
    (async() => {
      const hasPermission:boolean = await checkPermission();
      if(hasPermission) {
        getDeviceInfo();
      } else {
        requestPermission();
      }
    })();
    return () => {
      if(currentStream) {
        stopMediaStream(currentStream);
      } 
    }
  }, [])

  // const setSoundMeter = (stream: MediaStream) => {
  //   if(window.AudioContext) {
  //     let audioContext = new AudioContext();
  //     let soundMeter = new SoundMeter(audioContext);
  //     let that = this;
  //     soundMeter.connectToSource(stream, function(e) {
  //       if (e) { console.log(e); return;}
  //       media.soundMeterInterval = setInterval(() => {
  //       let soundVal = media.audioEnabled ? soundMeter.instant.toFixed(2) : 0;
  //         onSoundMeter(soundVal);
  //       }, 200);
  //     });
  //   }
  // }

  // function onSoundMeter(level): void {
  //   // map level onto the rising quadrant shape of a circle to exaggerate the sound meter gradient
  //   let shiftLevel = level - 1;
  //   media.levelCirc = Math.round(100 * Math.sqrt( 1 - (shiftLevel * shiftLevel) ));
  // }

  function makeConnection() {
    const rtcPeerConnection = new RTCPeerConnection();
    currentStream
      ?.getTracks()
      .forEach((track) => rtcPeerConnection.addTrack(track, currentStream));
    setPeerConnection(rtcPeerConnection);
  }
  const handleCall = () => {

  }
  const handleHangup = () => {
    // makeConnection()
  }
  const handleStop = () => {
    // videoRef.current.stop()
    // stopMediaStream(currentStream);
  }
  return (
    <div>
      <p>Test Player</p>
      <button onClick={handleCall}>Call</button>
      <button onClick={handleHangup}>HangUp</button>
      <div>
        <video 
          width={640}
          height={360}
          ref={videoRef}
          playsInline
        ></video>
      </div>
      
    </div>
  )
}

export default Player;