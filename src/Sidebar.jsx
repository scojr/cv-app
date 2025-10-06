import { useState } from 'react'
import './Sidebar.css'

let onHeaderChange;
function setOnHeaderChange(value) {
  onHeaderChange = value;
}
let onTextChange;
function setOnTextChange(value) {
  onTextChange = value;
}
let onArrayChange;
function setOnArrayChange(value) {
  onArrayChange = value;
}

export default function Sidebar({
  elementData,
  onHeadingChange,
  onTextChange,
  onArrayChange
}) {
  setOnHeaderChange(onHeadingChange);
  setOnTextChange(onTextChange);
  setOnArrayChange(onArrayChange);
  const [sidesSwapped, setSidesSwapped] = useState(false);
  const swapClass = sidesSwapped ? ' swap' : '';
  if (elementData.heading === null) return (
    <>
      <div className={'divider' + swapClass}></div>
      <div className={'sidebar' + swapClass}>
        <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
        <PanelEmpty></PanelEmpty>
      </div>
    </>
  )

  return (
    <>
      <div className={'divider' + swapClass}></div>
      <div className={'sidebar' + swapClass}>
        <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
        <Panel data={elementData}></Panel>
      </div >
    </>
  )
}

function Panel({ data }) {
  const header = data.heading;
  const text = data.text;
  const array = data.array;

  let list;
  if (array) {
    const arrayList = array.map((item) => <li key={item}><input type="text" value={item} /></li>)
    list = <ul>{arrayList}</ul>
  }

  return (
    <div className="panel">
      <h1>Element Properties</h1>
      <div className="text-input-container">
        <div className="separator"></div>
        <label htmlFor="heading">Heading</label>
        <input type="text" id='heading' value={header} onChange={(e) => onHeaderChange(e)} />
        <div className="separator"></div>
        <label htmlFor="text-content" >Text Content</label>
        <textarea id="text-content" value={text} onChange={(e) => onTextChange(e)}></textarea>
        <div className="separator"></div>
      </div>
      <legend htmlFor={'list'}>List</legend>
      <fieldset id='list' className="list-input-container">
        {list}
        <button className="insert"></button>
      </fieldset>
      <div className="separator"></div>
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