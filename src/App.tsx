import { useRef } from 'react';

import { SideBar } from './components/SideBar';
import { Loader } from './components/Loader';
import { Main } from './components/Main';

import { usePeerConnection } from './hooks/usePeerConnection';
import { usePeerState } from './state/peerState';

import tone from '../src/assets/tone.mp3';

function App() {
  const notificationRef = useRef<HTMLAudioElement>(null);
  usePeerConnection(notificationRef);
  const peerId = usePeerState((state) => state.id);

  return (
    <div className="flex flex-row py-3 px-5 md:py-12 md:h-screen md:items-center">
      <audio className="hidden" ref={notificationRef}>
        <source src={tone} type="audio/mpeg" />
      </audio>
      <div className="flex flex-col gap-3 md:h-3/4 md:max-h-[700px] md:flex-row md:max-w-screen-md md:w-full mx-auto">
        <SideBar />
        <Main />
      </div>
      {peerId === '' ? <Loader>Generating ID...</Loader> : null}
    </div>
  );
}

export default App;
