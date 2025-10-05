import { useState } from 'react'
import './Sidebar.css'

export default function Sidebar() {
  const [sidesSwapped, setSidesSwapped] = useState(false);
  const swapClass = sidesSwapped ? ' swap' : '';

  return (
    <div className={'sidebar' + swapClass}>
      <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
    </div >
  )
}

function Panel({ type }) {
  return (
    <div className="panel">
      <h1>{type}</h1>
    </div>
  )
}