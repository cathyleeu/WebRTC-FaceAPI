



export function onSoundMeter(level: number): number {
  // map level onto the rising quadrant shape of a circle to exaggerate the sound meter gradient
  let shiftLevel = level - 1;
  return Math.round(100 * Math.sqrt( 1 - (shiftLevel * shiftLevel) ));
}


export function getConstraints({audioId, cameraId}: {audioId?: string, cameraId?:string}): MediaStreamConstraints {
  if(audioId == undefined || cameraId == undefined) {
    return ({
      audio: true, video: true
    })
  }
  return ({
    audio: {
      deviceId: audioId
    },
    video: {
      deviceId: cameraId,
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 360, ideal: 1080 },
      aspectRatio: 1.777777778,
    }
  })
};

// taken from https://jameshfisher.com/2021/01/18/measuring-audio-volume-in-javascript/
export function getSoundMeter(stream: MediaStream) {
  if(window.AudioContext) {
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    let meterValue;
    const onFrame = () => {
        analyserNode.getFloatTimeDomainData(pcmData);
        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }

        // volume Meter value 
        meterValue = Math.sqrt(sumSquares / pcmData.length);
        window.requestAnimationFrame(onFrame);
    };
    return meterValue
  }
}
