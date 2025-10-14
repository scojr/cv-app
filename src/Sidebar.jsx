import { useState } from 'react'
import { getListFromId } from './list-handler';
import './Sidebar.css'

let onHeaderChange;
function setOnHeaderChange(value) {
  onHeaderChange = value;
}
let onTextChange;
function setOnTextChange(value) {
  onTextChange = value;
}

let onListChange;
function setOnListChange(value) {
  onListChange = value;
}

export default function Sidebar({
  elementData,
  onHeadingChange,
  onTextChange,
  onListChange
}) {
  setOnHeaderChange(onHeadingChange);
  setOnTextChange(onTextChange);
  setOnListChange(onListChange);
  const [sidesSwapped, setSidesSwapped] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('500px');
  const swapClass = sidesSwapped ? ' swap' : '';
  const handleDivider = (e, isSwapped) => {
    document.onmousemove = drag;
    document.onmouseup = endDrag;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';
    function drag(e) {
      if (isSwapped) {
        setSidebarWidth(e.pageX + 'px');
      } else {
        setSidebarWidth((window.innerWidth - e.pageX) + 'px');
      }
    }
    function endDrag() {
      document.body.style.userSelect = 'unset';
      document.body.style.cursor = 'unset';
      document.onmousedown = null;
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }

  if (elementData.heading === null) return (
    <div style={{ '--custom-width': sidebarWidth }} className={'sidebar-container' + swapClass}>
      <div onMouseDown={(e) => handleDivider(e, sidesSwapped)} className={'divider' + swapClass}></div>
      <div className={'sidebar'}>
        <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
        <PanelEmpty></PanelEmpty>
      </div>
    </div>
  )

  return (
    <div style={{ '--custom-width': sidebarWidth }} className={'sidebar-container' + swapClass}>
      <div onMouseDown={(e) => handleDivider(e, sidesSwapped)} className={'divider' + swapClass} ></div>
      <div className={'sidebar'}>
        <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button></header>
        <Panel data={elementData}></Panel>
      </div >
    </div>
  )
}

function Panel({ data }) {
  const header = data.heading;
  const text = data.text;
  const listId = data.listId;

  const list = listId ? <SectionList listId={listId}></SectionList> : null;

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
      {list}
      <div className="separator"></div>
    </div>
  )
}

function SectionList({ listId }) {
  const listObject = getListFromId(listId);
  const list = listObject.array.map((item, index) => <li key={listObject.ids[index]}><ListInput initialValue={item} index={index} listId={listId} entryId={listObject.ids[index]}></ListInput></li>)
  return (
    <fieldset id='list' className="list-input-container">
      <ul>{list}</ul>
      <button className="insert" ></button>
    </fieldset>
  )
}

function ListInput({ initialValue, index, listId }) {
  const [value, setValue] = useState(initialValue);
  const myList = getListFromId(listId);
  function onChange(newValue) {
    setValue(newValue);
    myList.editValue(index, newValue);
    onListChange(myList);
  }
  return (
    <>
      <button className='list-options'></button>
      <textarea type="text" value={value} name="" id="" onChange={(e) => onChange(e.target.value)} />
    </>
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