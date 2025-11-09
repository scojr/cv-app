import { useState } from 'react'
import '../styles/Properties.css'

const categories = [<GeneralEntry></GeneralEntry>, <EmploymentEntry></EmploymentEntry>, <EducationEntry></EducationEntry>]

export default function PropertiesPanel() {
  const [width, setWidth] = useState('600px');
  const [category, setCategory] = useState(0);
  return (
    <>
      <div style={{ '--custom-width': width }} className={'sidebar-container'}>
        <div onMouseDown={(e) => dragHandler(e, false, setWidth)} className={'divider'} ></div>
        <div className={'sidebar'}>
          <Header category={category} setCategory={setCategory}></Header>
          {categories[category]}
        </div >
      </div>
    </>
  )
}

function Header({ category, setCategory }) {

  const buttons = [
    { id: 0, name: "edit-general" },
    { id: 1, name: "edit-experience" },
    { id: 2, name: "edit-education" },
    { id: 3, name: "edit-style" },
  ]

  const getActiveClass = (num) => {
    if (num === category) return "active";
    else return "";
  };

  const onClick = (num) => {
    setCategory(num)
    if (num === category) return "active";
    else return "";
  }

  const buttonEls = buttons.map(button => <button key={button.id} className={button.name + " " + getActiveClass(button.id)} onClick={() => onClick(button.id)}></button>);

  return (
    <div className="properties-header">
      <div className="header-buttons">
        {buttonEls}
      </div>
    </div>
  )
}

function Panel({ children, name }) {
  return (
    <div className="panel">
      <header>
        <h2>{name}</h2>
      </header>
      {children}
    </div>
  )
}

function GeneralEntry({ name = "General" }) {
  return (
    <Panel name={name} >
      <fieldset>
        <label htmlFor="name-input">Name</label>
        <input type="text" id="name-input" />
        <label htmlFor="email-input">Email</label>
        <input type="text" id="email-input" />
        <label htmlFor="phone-input">Phone</label>
        <input type="text" id="phone-input" />
        <label htmlFor="profile">Profile</label>
        <textarea name="" id="profile"></textarea>
      </fieldset>
    </Panel>
  )
}

function EmploymentEntry({ name = "Experience" }) {
  const [visibility, setVisibility] = useState(true);
  const toggleVisibility = () => setVisibility(!visibility);

  if (!visibility) return (
    <Panel name={name}>
      <div className="entry">
        <div className="entry-header">
          <button className="collapse show" onClick={toggleVisibility}></button>
        </div>
        <div className="entry-content">
          <fieldset>
            <label htmlFor="company">Company</label>
            <input type="text" id="company" />
          </fieldset>
        </div>
      </div>
    </Panel>
  )
  return (
    <Panel name={name}>
      <div className="entry">
        <div className="entry-header">
          <button className="collapse hide" onClick={toggleVisibility}></button>
        </div>
        <div className="entry-content">
          <fieldset>
            <label htmlFor="company">Company</label>
            <input type="text" id="company" />
            <label htmlFor="job-title">Title</label>
            <input type="text" id="job-title" />
          </fieldset>
          <div className="row">
            <fieldset>
              <label htmlFor="date-start">From</label>
              <input type="number" id="date-start" />
            </fieldset>
            <fieldset>
              <label htmlFor="date-end">To</label>
              <input type="text" id="date-end" />
            </fieldset>
          </div>
          <fieldset>
            <label htmlFor="job-description">Description</label>
            <textarea name="" id="job-description"></textarea>
          </fieldset>
        </div>
      </div>
    </Panel>
  )
}

function EducationEntry({ name = "Education" }) {
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