import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useInput } from 'hooks';

const Home: NextPage = () => {  
  const roomId = useInput('');
  return (
    <>
      <input 
        type="text" 
        name="roomId"
        className="border"
        placeholder="enter room name"
        {...roomId.attrs} 
      />
      <Link href="/room">Enter</Link>
    </>
  )
}

export default Home
