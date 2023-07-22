import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
    <header className='w-screen h-20 bg-cyan-700 px-6 flex items-center justify-between'>
        <h1 className='text-zinc-100 text-2xl font-semibold font-sans'>Maleva News</h1>
        <nav>
            <Link href={"/noticia"} className='text-zinc-100 text-sm md:text-lg'>Notícias Recentes</Link>
        </nav>
    </header>
  )
}