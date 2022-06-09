import { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream;
}
const Player = ({stream}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current!.srcObject = stream;
    videoRef.current?.play();
  }, [stream])

  return (
    <div>
      <video 
        width={640}
        height={360}
        ref={videoRef}
        playsInline
      />
    </div>
  )
}

export default Player;