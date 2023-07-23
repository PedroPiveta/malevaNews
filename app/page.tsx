'use client'

import Header from "./components/Header";
import { firebaseConfig } from '@/firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
console.log(app);


export default function Home() {
  return (
    <div>
        <Header />
    </div>
  )
}
