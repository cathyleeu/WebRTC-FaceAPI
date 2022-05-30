



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