import { nanoid } from 'nanoid';
import Peer from 'peerjs';
import { useEffect } from 'react';

import { usePeerState } from '../state/peerState';

import { REMOTE_PEER_QUERY_PARAM } from '../utils/constants';

function usePeerConnection(notificationRef: React.RefObject<HTMLAudioElement>) {
  const setPeer = usePeerState((state) => state.setPeer);
  const peer = usePeerState((state) => state.peer);
  const id = usePeerState((state) => state.id);
  const setId = usePeerState((state) => state.setId);
  const setRemotePeerId = usePeerState((state) => state.setRemotePeerId);
  const setIsConnected = usePeerState((state) => state.setIsConnected);
  const setConnection = usePeerState((state) => state.setConnection);
  const connection = usePeerState((state) => state.connection);
  const setMessages = usePeerState((state) => state.setMessages);
  const setOnCall = usePeerState((state) => state.setOnCall);

  /* 
    - Generates new Peer.
    - Adds open and connection listeners
    - Also once the peer is generated, it checks for
      remote peer query param existence. If yes, initiates
      a connection with remote peer automatically. Then resets
      the URL back to normal by removing rpid param.
  */
  useEffect(() => {
    if (Object.keys(peer).length === 0) {
      setPeer(new Peer());
    } else if (!id) {
      peer.on('open', (id) => {
        setId(id);

        // Looks for rpid and then establishes connection.
        const searchParams = new URLSearchParams(location.search);
        const rpid = searchParams.get(REMOTE_PEER_QUERY_PARAM);
        if (rpid) {
          const remoteConnection = peer.connect(rpid);
          setConnection(remoteConnection);
          setRemotePeerId(rpid);
        }
      });

      peer.on('connection', function (conn) {
        setConnection(conn);
        setRemotePeerId(conn.peer);
        setIsConnected(true);
      });
    }
  }, [peer, id]);

  /* 
    - Once the connection gets generated (either own or by others),
      adds data and close listeners for receiving messages
    - Closes the connection on tab close
  */
  useEffect(() => {
    if (Object.keys(connection).length > 0) {
      connection.on('open', () => {
        setIsConnected(true);

        window.addEventListener('beforeunload', () => {
          connection.close();
        });

        connection.on('data', function (message) {
          setMessages({
            body: message as string,
            type: 'received',
            id: nanoid(),
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
