import { useState } from 'react'
import '../styles/Properties.css'

export default function PropertiesPanel() {
  const [width, setWidth] = useState('600px');

  return (
    <>
      <div style={{ '--custom-width': width }} className={'sidebar-container'}>
        <div onMouseDown={(e) => dragHandler(e, false, setWidth)} className={'divider'} ></div>
        <div className={'sidebar'}>
          <Header></Header>
          <GeneralEntry name={"General"}></GeneralEntry>
          <ListEntry name={"Education"}></ListEntry>
          <ListEntry name={"Experience"}></ListEntry>
        </div >
      </div>
    </>
  )
}

function Header() {
  return (
    <div className="properties-header">
      <h1>Properties</h1>
      <button className="edit-properties"></button>
      <button className="edit-style"></button>
      <button className="edit-settings"></button>
    </div>
  )
}

function Panel({ children, name }) {
  return (
    <div className="panel">
      <header>
        <h2>{name}</h2>
        <button className="collapse"></button>
      </header>
      {children}
    </div>
  )
}

function GeneralEntry({ name }) {
  return (
    <Panel name={name} >
      <fieldset>
        <label htmlFor="name-input">Name</label>
        <input type="text" id="name-input" />
        <label htmlFor="email-input">Email</label>
        <input type="text" id="email-input" />
        <label htmlFor="phone-input">Phone</label>
        <input type="text" id="phone-input" />
      </fieldset>
    </Panel>
  )
}

function ListEntry({ name }) {
  return (
    <Panel name={name} >
      <fieldset>
      </fieldset>
    </Panel>
  )
}

function dragHandler(e, isSwapped, setter) {
  document.onmousemove = drag;
  document.onmouseup = endDrag;
  document.body.style.userSelect = 'none';
  document.body.style.cursor = 'ew-resize';
  function drag(e) {
    if (isSwapped) {
      setter(e.pageX + 'px');
    } else {
      setter((window.innerWidth - e.pageX) + 'px');
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