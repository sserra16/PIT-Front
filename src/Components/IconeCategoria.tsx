import { BiFootball } from 'react-icons/bi'
import { TbConfetti } from 'react-icons/tb'
import { BsMusicNoteList } from 'react-icons/bs'

type Props = {
  id: string
}

export default function IconeCategoria({ id }: Props) {
  return (
    <div className={`rounded-full p-2 ${id == '1' ? "bg-green-400" : id == '2' ? "bg-pink-300" : "bg-blue-400"}`}>
      {id == '1' ? <BiFootball className="opacity-50 text-black" /> : id == '2' ? <TbConfetti className="opacity-50 text-black" /> : <BsMusicNoteList className="opacity-50 text-black" />}
    </div>
  )
}
