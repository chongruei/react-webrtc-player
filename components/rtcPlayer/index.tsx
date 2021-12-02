import { FC, useEffect, useRef, useState } from 'react';
import { useRTC } from './useRTC';

interface IProps {
  url: string;
}

export const RTCPlayer: FC<IProps> = ({ url }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { loadSdk, sdk } = useRTC(url);

  const handlePlay = async () => {
    const video = videoRef.current;

    if (video) {
      try {
        video.srcObject = sdk.stream;
        await loadSdk();
        video.load();
        await video.play();
      } catch (err) {
        console.error(err);
        video.muted = true;
        await video.play();
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <div>
      <video ref={videoRef} playsInline controls muted={false} />
      <br />
      <button type="button" onClick={handlePlay}>
        play
      </button>
    </div>
  );
};
