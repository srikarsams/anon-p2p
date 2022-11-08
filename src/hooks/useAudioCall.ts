import { useCallback, useEffect } from 'react';
import { usePeerState } from '../state/peerState';

const audioParams = { audio: { echoCancellation: true } };

function useAudioCall(callRef: React.RefObject<HTMLAudioElement>) {
  const peer = usePeerState((state) => state.peer);
  const remotePeerId = usePeerState((state) => state.remotePeerId);
  const setOnCall = usePeerState((state) => state.setOnCall);
  const setCallConnection = usePeerState((state) => state.setCallConnection);

  const triggerAudioCall = useCallback(() => {
    navigator.mediaDevices.getUserMedia(audioParams).then((stream) => {
      const call = peer.call(remotePeerId, stream);
      setCallConnection(call);

      call.on('stream', (stream) => {
        setOnCall(true);
        if (!callRef.current) return;

        callRef.current.srcObject = stream;
        callRef.current.play();
      });

      call.on('close', () => {
        setOnCall(false);
        if (!callRef.current) return;
        callRef.current.pause();
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
    });
  }, [peer, remotePeerId]);

  useEffect(() => {
    if (Object.keys(peer).length > 0) {
      peer.on('call', (callConnection) => {
        navigator.mediaDevices.getUserMedia(audioParams).then((stream) => {
          callConnection.answer(stream);

          setCallConnection(callConnection);

          callConnection.on('stream', (stream) => {
            setOnCall(true);
            if (!callRef.current) return;
            callRef.current.srcObject = stream;
            callRef.current.play();
          });

          callConnection.on('close', () => {
            setOnCall(false);
            if (!callRef.current) return;
            callRef.current.pause();
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          });
        });
      });
    }
  }, [peer.id]);

  return { triggerAudioCall };
}

export { useAudioCall };
