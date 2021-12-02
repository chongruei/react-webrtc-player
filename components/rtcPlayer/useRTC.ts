/**
 * @description No further action is required. just import it.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import adapter from 'webrtc-adapter';

import { useEffect, useRef, useState } from 'react';
import { SrsRtcPlayerAsync } from './srs.sdk';

type SDK = {
  play(url: string): Promise<void>;
  close(): void;
  ontrack(event: RTCTrackEvent): void;
  __internal: any;
  pc: RTCPeerConnection;
  stream: MediaStream;
};

export const useRTC = (url: string) => {
  const sdk = useRef<SDK | null>(null);

  const loadSdk = async (): Promise<void> => {
    try {
      await sdk.current.play(url);
    } catch (err) {
      sdk.current.close();
      console.error(`sdk play error : ${err}`);
    }
  };

  useEffect(() => {
    sdk.current = SrsRtcPlayerAsync();

    return () => {
      if (sdk?.current) {
        sdk.current.close();
      }
    };
  }, []);

  return { loadSdk, sdk: sdk.current };
};
