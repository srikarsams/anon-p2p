import Peer from 'peerjs';
import { useEffect } from 'react';

import { usePeerState } from '../state/peerState';

function usePeerConnection(notificationRef: React.RefObject<HTMLAudioElement>) {
  const setPeer = usePeerState((state) => state.setPeer);
  const peer = usePeerState((state) => state.peer);
  const setId = usePeerState((state) => state.setId);
  const setRemotePeerId = usePeerState((state) => state.setRemotePeerId);
  const setIsConnected = usePeerState((state) => state.setIsConnected);
  const setConnection = usePeerState((state) => state.setConnection);
  const connection = usePeerState((state) => state.connection);
  const setMessages = usePeerState((state) => state.setMessages);
  const setOnCall = usePeerState((state) => state.setOnCall);

  useEffect(() => {
    if (Object.keys(peer).length === 0) {
      setPeer(new Peer());
    } else {
      peer.on('open', (id) => {
        setId(id);
      });

      peer.on('connection', function (conn) {
        setConnection(conn);
        setRemotePeerId(conn.peer);
        setIsConnected(true);
      });
    }
  }, [peer]);

  useEffect(() => {
    if (Object.keys(connection).length > 0) {
      connection.on('open', () => {
        setIsConnected(true);

        connection.on('data', function (message) {
          setMessages({
            body: message as string,
            type: 'received',
          });
          notificationRef?.current?.play();
        });

        connection.on('close', function () {
          setIsConnected(false);
          setOnCall(false);
        });
      });
    }

    return () => {
      if (Object.keys(connection).length > 0) {
        connection.close();
      }
    };
  }, [connection]);
}

export { usePeerConnection };
