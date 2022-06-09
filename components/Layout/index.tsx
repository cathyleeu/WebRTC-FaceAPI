import { ReactNode } from "react";
import styles from 'styles/Home.module.css';

interface Props {
  children: ReactNode;
}

export default function Layout ({children}:Props) {
  return (
    <>
      <main className="w-screen">  
        {children}    
      </main>
      <footer></footer>
    </>
  )
}
