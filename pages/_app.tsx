import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Head from 'next/head';

import SocketProvider from '../components/Socket'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WebRTC-FaceApi</title>
      </Head>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </> 
  )
}

export default MyApp
