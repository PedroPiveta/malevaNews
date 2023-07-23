'use client'

import Header from '@/app/components/Header'
import React from 'react'

type Props = {
    params: {id: string},
}

export default function page({params}: Props) {
  return (
    <>
        <Header />
        <h2>Noticia {params.id}</h2>
    </>
  )
}