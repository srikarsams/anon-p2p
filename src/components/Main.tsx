import { Chat } from './Chat';
import { RemotePeerInfo } from './RemotePeerInfo';

export function Main() {
  return (
    <div className="flex flex-col border border-gray-800 rounded md:flex-1">
      <RemotePeerInfo />
      <Chat />
    </div>
  );
}
