import { SideBar } from './components/SideBar';
import { Main } from './components/Main';

import { usePeerConnection } from './hooks/usePeerConnection';

import tone from '../src/assets/tone.mp3';
import { useRef } from 'react';

function App() {
  const notificationRef = useRef<HTMLAudioElement>(null);
  usePeerConnection(notificationRef);

  return (
    <div className="flex flex-col gap-3 py-3 px-5 md:py-12 md:max-w-screen-md md:flex-row mx-auto md:h-screen">
      <audio className="hidden" ref={notificationRef}>
        <source src={tone} type="audio/mpeg" />
      </audio>
      <SideBar />
      <Main />
    </div>
  );
}

export default App;
