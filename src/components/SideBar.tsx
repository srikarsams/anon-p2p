import { useRef } from 'react';

import { useAudioCall } from '../hooks/useAudioCall';
import { usePeerState } from '../state/peerState';

import { Button } from './Button';

import { APP_URL, REMOTE_PEER_QUERY_PARAM } from '../utils/constants';

export function SideBar() {
  const id = usePeerState((state) => state.id);
  const isConnected = usePeerState((state) => state.isConnected);
  const connection = usePeerState((state) => state.connection);
  const callConnection = usePeerState((state) => state.callConnection);
  const onCall = usePeerState((state) => state.onCall);

  const callRef = useRef<HTMLAudioElement>(null);
  const { triggerAudioCall } = useAudioCall(callRef);

  function copyId() {
    try {
      navigator.clipboard.writeText(
        `${APP_URL}?${REMOTE_PEER_QUERY_PARAM}=${id}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full p-2 border border-gray-800 rounded md:w-1/3 flex flex-col justify-between md:h-3/4">
      <audio className="hidden" ref={callRef}></audio>
      <div className="mb-8 md:mb-0">
        <div className="flex gap-2 justify-between items-center mb-8">
          <h1
            className="font-mono text-md font-semibold text-gray-700"
            title={id}
          >
            Hi {id.substring(0, 6)}...
          </h1>
          <Button className="bg-gray-500 text-white" onClick={copyId}>
            Copy URL
          </Button>
        </div>
      </div>

      <div>
        <Button
          className="bg-red-500 text-white w-full py-3 mb-3 disabled:bg-gray-500 disabled:cursor-not-allowed"
          isDisabled={!isConnected}
          onClick={() => {
            connection.close();
          }}
        >
          Disconnect
        </Button>
        <Button
          className="bg-green-800 text-white w-full py-3 disabled:bg-gray-500 disabled:cursor-not-allowed"
          isDisabled={!isConnected}
          onClick={() => {
            if (!onCall) {
              triggerAudioCall();
            } else {
              callConnection.close();
            }
          }}
        >
          {!onCall ? 'Audio Call' : 'Stop Call'}
        </Button>
      </div>
    </div>
  );
}
