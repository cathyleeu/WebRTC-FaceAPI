import { createContext, useState, useEffect, useContext, Children } from "react";
import { getConstraints } from '@utils/player'


interface MediaSettingType {
  videoinput: MediaDeviceInfo[],
  audioinput: MediaDeviceInfo[],
  audiooutput: MediaDeviceInfo[],
  mic?: boolean;
  cam?: boolean;
}

// TODO reduce style
interface MediaContextType {
  currentStream: MediaStream | undefined;
  mediaSetting: MediaSettingType;
}

interface Props {
  children:React.ReactNode
}

export const MediaContext = createContext<MediaContextType>({} as MediaContextType);

const MediaProvider = ({ children }: Props) => {
  const [currentStream, setCurrentStream] = useState<MediaStream | undefined>();
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
    stopMediaStream(currentStream!)
    const stream = await navigator.mediaDevices.getUserMedia(getConstraints({audioId, cameraId}));
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
  
  return (
    <MediaContext.Provider value={{
      currentStream,
      mediaSetting
    }}>
      {children}
    </MediaContext.Provider>
  )
}

export const useMedia = () => {
  return useContext(MediaContext);
}

export default MediaProvider;