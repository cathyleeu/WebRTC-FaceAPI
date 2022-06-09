import type { NextPage } from 'next';
import React from 'react';
import MediaProvider from '@components/Player/MediaContext'
import Conference from '@components/Conference';
import Player from '@components/Player';
import Chat from '@components/Chat';

const Room: NextPage = () => {  
  return (
    <MediaProvider>
      <div className="grid grid-cols-[2fr,1fr] w-screen">
        <Conference />
        <Chat />
      </div>
    </MediaProvider>
  )
}

export default Room;
