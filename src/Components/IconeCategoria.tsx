import React from 'react'
import { BiFootball } from 'react-icons/bi'
import { PiConfettiBold } from 'react-icons/pi'
import { BsMusicNoteList } from 'react-icons/bs'

type Props = {
  id: string
}

export default function IconeCategoria({ id }: Props) {
  return (
    <div className={`rounded-full p-2 ${id == '1' ? "bg-green-400" : id === '2' ? "bg-pink-300" : "bg-blue-400"}`}>
      {id == '1' ? <BiFootball className="opacity-50" /> : id == '2' ? <PiConfettiBold className="opacity-50" /> : <BsMusicNoteList className="opacity-50" />}
    </div>
  )
}
