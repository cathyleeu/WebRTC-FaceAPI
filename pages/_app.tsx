import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@components/Layout'
import SocketProvider from '@components/Socket'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WebRTC-FaceApi</title>
      </Head>
      <SocketProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SocketProvider>
    </> 
  )
}

export default MyApp
