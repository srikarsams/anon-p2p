import { useState } from 'react';

import { usePeerState } from '../state/peerState';
import { Button } from './Button';
import { Message } from './Message';

export function Chat() {
  const messages = usePeerState((state) => state.messages);
  const setMessages = usePeerState((state) => state.setMessages);
  const connection = usePeerState((state) => state.connection);
  const isConnected = usePeerState((state) => state.isConnected);
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 p-2 overflow-y-auto flex flex-col-reverse gap-3 min-h-0">
        {messages.map((message) => {
          return (
            <Message
              className={
                message.type === 'received' ? 'self-start' : 'self-end'
              }
            >
              {message.body}
            </Message>
          );
        })}
      </div>
      <div className="h-[60px] p-2 flex items-center">
        <textarea
          className="h-full w-full border border-gray-500 p-1 disabled:cursor-not-allowed"
          placeholder="Message here"
          disabled={!isConnected}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <Button
          className="h-full bg-slate-600 rounded-none text-white px-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          isDisabled={text.length === 0}
          onClick={() => {
            connection.send(text);
            setText('');
            setMessages({
              body: text,
              type: 'sent',
            });
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
