import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Home.module.css';
import Player from '../components/Player';
import useInput from '../lib/useInput';
import { useSocket } from '../components/Socket'

const Home: NextPage = () => {  
  const message = useInput('');
  const { messages, sendMessage } = useSocket();
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    sendMessage({
      message: message.attrs.value,
      username: 'user'
    })
    message.setValue('');
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <>
          <Player />
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" value="user" readOnly/>
            <input type="text" name="message" {...message.attrs} className="border"/>
            <button>send</button>
          </form>
          <div>
            <p>MESSAGES</p>
            {messages?.map((m, i) => <p key={i}> {m.username} {m.message} </p>)}
          </div>
        </>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home
