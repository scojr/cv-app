import { useState } from 'react'
import './Sidebar.css'

export default function Sidebar() {
  const [sidesSwapped, setSidesSwapped] = useState(false);
  const swapClass = sidesSwapped ? ' swap' : '';

  return (
    <div className={'sidebar' + swapClass}>
      <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
      <Panel data={'Name'}></Panel>
    </div >
  )
}

function Panel({ data }) {
  return (
    <div className="panel">
      <h1>Element Properties</h1>
      <div className="text-input-container">
        <div className="separator"></div>
        <label htmlFor="heading">Heading</label>
        <input type="text" id='heading' value={'John'} />
        <div className="separator"></div>
        <label htmlFor="text-content">Text Content</label>
        <textarea id="text-content" value={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe vitae, beatae dolorum, perferendis quae unde minus consectetur cumque aliquid quaerat molestias! Minus, similique odio vel magni tenetur quam fugiat.'}></textarea>
        <div className="separator"></div>
      </div>
      <div className="list-input-container">

      </div>
    </div>
  )
}

function PanelEmpty() {
  return (
    <div className="panel empty">
      <div className="box">
        No Element Selected
      </div>
    </div>
  )
}