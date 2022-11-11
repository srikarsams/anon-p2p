import Peer, { DataConnection, MediaConnection } from 'peerjs';
import create from 'zustand';

type Message = {
  body: string;
  type: 'sent' | 'received';
  id: string;
};

type PeerState = {
  id: string;
  setId: (id: string) => void;
  peer: Peer;
  setPeer: (peer: Peer) => void;
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  connection: DataConnection;
  setConnection: (connection: DataConnection) => void;
  remotePeerId: string;
  setRemotePeerId: (remotePeerId: string) => void;
  messages: Message[];
  setMessages: (message: Message) => void;
  callConnection: MediaConnection;
  setCallConnection: (callConnection: MediaConnection) => void;
  onCall: boolean;
  setOnCall: (onCall: boolean) => void;
};

const usePeerState = create<PeerState>((set) => ({
  id: '',
  setId: (id) => set({ id }),
  peer: {} as Peer,
  setPeer: (peer) => set({ peer }),
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
  connection: {} as DataConnection,
  setConnection: (connection) => set({ connection }),
  remotePeerId: '',
  setRemotePeerId: (remotePeerId) => set({ remotePeerId }),
  messages: [],
  setMessages: (message) =>
    set((state) => ({
      messages: [message, ...state.messages],
    })),
  callConnection: {} as MediaConnection,
  setCallConnection: (callConnection) => set({ callConnection }),
  onCall: false,
  setOnCall: (onCall) => set({ onCall }),
}));

export { usePeerState };
