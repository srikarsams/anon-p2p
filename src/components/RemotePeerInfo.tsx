import { usePeerState } from '../state/peerState';

export function RemotePeerInfo() {
  const remotePeerId = usePeerState((state) => state.remotePeerId);
  const isConnected = usePeerState((state) => state.isConnected);
  return (
    <div className="flex gap-2 justify-between items-center p-2 mb-2 border-b border-black">
      <p>
        Remote Peer:{' '}
        {remotePeerId.length > 0 ? (
          <span
            className="font-mono text-md font-semibold text-gray-700"
            title={remotePeerId}
          >
            {remotePeerId.substring(0, 6)}...
          </span>
        ) : null}
      </p>
      <div
        className={`${
          isConnected ? 'bg-green-600' : `bg-red-600`
        } aspect-square rounded-full w-4 h-4`}
      />
    </div>
  );
}
