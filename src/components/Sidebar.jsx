import { useState, useRef, useEffect } from 'react'
import { getListFromId } from '../scripts/list-handler';
import '../styles/Sidebar.css'

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
  onColorChange,
  onFontChange,
  onFontSizeChange,
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

  let panelData = (data) => {
    if (!data.heading) return <PanelEmpty></PanelEmpty>;
    else return <Panel data={data}></Panel>;
  }

  return (
    <>
      <div style={{ '--custom-width': sidebarWidth }} className={'sidebar-container' + swapClass}>
        <div onMouseDown={(e) => handleDivider(e, sidesSwapped)} className={'divider' + swapClass} ></div>
        <div className={'sidebar'}>
          <header><button onClick={() => setSidesSwapped(!sidesSwapped)}></button>
            <StyleBar onColorChange={onColorChange} onFontChange={onFontChange} onFontSizeChange={onFontSizeChange}></StyleBar></header>
          {panelData(elementData)}
        </div >
      </div>
    </>
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
  const [stateToggle, setStateToggle] = useState(false)
  const listObject = getListFromId(listId);
  const list = listObject.array.map((item, index) => <li key={listObject.ids[index]}><ListInput initialValue={item} index={index} listId={listId} entryId={listObject.ids[index]} onDeleteClick={deleteListItem}></ListInput></li>)

  function addToList() {
    listObject.push('')
    console.log(listObject);
    onListChange(listObject);
    setStateToggle(!stateToggle);
  }

  function deleteListItem(listItemId) {
    listObject.delete(listItemId)
    onListChange(listObject);
    setStateToggle(!stateToggle);
  }

  return (
    <fieldset id='list' className="list-input-container">
      <ul>{list}</ul>
      <button className="insert" onClick={addToList} ></button>
    </fieldset>
  )
}

function ListInput({ initialValue, index, listId, entryId, onDeleteClick }) {
  const [value, setValue] = useState(initialValue);
  const myList = getListFromId(listId);

  function onChange(newValue) {
    setValue(newValue);
    myList.editValue(index, newValue);
    onListChange(myList);
  }

  return (
    <>
      <textarea type="text" value={value} name="" id="" onChange={(e) => onChange(e.target.value)} />

      <button className='list-options' onClick={() => onDeleteClick(entryId)}></button>
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

function StyleBar({
  onColorChange = { onColorChange },
  onFontChange = { onFontChange },
  onFontSizeChange = { onFontSizeChange }, }) {
  const [displayedInput, setDisplayedInput] = useState(null)
  const [color, setColor] = useState('#5f8fbb');
  const componentRef = useRef(null);
  const classes = displayedInput ? 'open' : 'closed';
  const clickHandler = (component) => {
    if (component) setDisplayedInput(component);
    else setDisplayedInput(null);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (componentRef.current && !componentRef.current.contains(e.target)) {
        clickHandler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })
  return (
    <div ref={componentRef} className={"style " + classes}>
      <label style={{ "--label-color": color }} className="color" autoFocus htmlFor="color">Color</label>
      <input type="color" name="color" id="color" value={color} onChange={(e) => {
        onColorChange(e.target.value);
        setColor(e.target.value)
      }} onClick={() => clickHandler()} />
      <button className="font-size" onClick={() => clickHandler(<StyleFontSize onFontSizeChange={onFontSizeChange} ></StyleFontSize>)}></button>
      {displayedInput}
    </div>
  )
}
function StyleFontSize({ onFontSizeChange = { onFontSizeChange } }) {
  const [fontSize, setFontSize] = useState(20);
  return (
    <div className="style-input">
      <label className="font-size" htmlFor="font-size">Font Size</label>
      <input type="range" name="font-size" id="font-size" min="12" max="32" defaultValue="20" onChange={(e) => {
        setFontSize(e.target.value);
        onFontSizeChange(e.target.value);
      }} />
      <span>{fontSize}<span className="unit-label">px</span></span>
    </div>
  )
}
