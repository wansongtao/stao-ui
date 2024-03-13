import './tracking-min.js';
import './face-min.js';

export interface ITrackCallback {
  tracker: tracking.ObjectTracker;
  rect?: tracking.TrackRect;
  faceCount: number;
  isCenter?: boolean;
}

const trackingFace = (
  video: HTMLVideoElement,
  callback: (data: ITrackCallback) => void
) => {
  const tracker = new window.tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  window.tracking.track(video, tracker, {
    camera: true
  });

  tracker.addListener('track', function (event) {
    const { data } = event;
    const faceCount = data.length;
    
    if (!faceCount || faceCount > 1) {
      callback({ tracker, faceCount });
    }

    if (faceCount === 1) {
      const rect = data[0];

      if (
        rect.x > video.clientWidth * 0.3 &&
        rect.x < video.clientWidth * 0.7
      ) {
        // 判断人脸是否在正中间
        callback({ faceCount, tracker, rect, isCenter: true });
        return;
      }

      callback({ faceCount, tracker, rect });
    }
  });
};

export default trackingFace;
