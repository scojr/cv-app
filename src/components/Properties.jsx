import { useState } from 'react'
import '../styles/Properties.css'

export default function PropertiesPanel({ data, onChange }) {
  const [width, setWidth] = useState('600px');
  const [category, setCategory] = useState(0);

  const addEntry = (cat) => {
    onChange(cat, 'add entry');
  }

  const categories = [<General data={data.user} onChange={onChange}></General>, <Employment data={data.experience} onChange={onChange} addEntry={addEntry}></Employment>, <Education data={data.education} onChange={onChange} addEntry={addEntry}></Education>]

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

function General({ name = "General", data, onChange }) {

  const onTextChange = (type, e) => {
    const value = e.target.value;
    onChange('user', type, value);
  }

  return (
    <>
      <Panel name={name} >
        <div className="entry">
          <div className="entry-content">
            <fieldset>
              <label htmlFor="name-input">Name</label>
              <input type="text" id="name-input" value={data.name} onChange={(e) => onTextChange("name", e)} />
            </fieldset>

            <fieldset>
              <label htmlFor="name-input">Title</label>
              <input type="text" id="title-input" value={data.title} onChange={(e) => onTextChange("title", e)} />
            </fieldset>
            <fieldset>
              <label htmlFor="profile">Profile</label>
              <textarea name="" id="profile" value={data.about} onChange={(e) => onTextChange("about", e)} ></textarea>
            </fieldset>
          </div>
        </div>
      </Panel>
      <Panel name={"Contact"} >
        <div className="entry">
          <div className="entry-content">
            <fieldset>
              <label htmlFor="phone-input">Phone</label>
              <input type="text" id="phone-input" value={data.phone} onChange={(e) => onTextChange("phone", e)} />
            </fieldset>
            <fieldset>
              <label htmlFor="email-input">Email</label>
              <input type="text" id="email-input" value={data.email} onChange={(e) => onTextChange("email", e)} />
            </fieldset>
            <fieldset>
              <label htmlFor="website-input">Website</label>
              <input type="text" id="website-input" value={data.website} onChange={(e) => onTextChange("website", e)} />
            </fieldset>
          </div>
        </div>
      </Panel>
    </>
  )
}

function Employment({ data, name = "Experience", onChange, addEntry }) {

  const entriesNew = () => {
    const entriesArray = [];
    for (let i = 0; i < data.length; i++) {
      const index = i;
      const entry = data[index];
      entriesArray.push(<Entry key={entry.id} id={entry.id.slice(0, 8)} index={index} parent={entry} data={entry} name={("Company")} type={"experience"} isDescription={true} onChange={onChange}></Entry>)
    };
    return (entriesArray);
  };
  const entries = entriesNew();
  return (
    <Panel name={name}>
      {entries}
      <div className="add-entry button-container">
        <button className="add-entry" onClick={() => { addEntry('experience') }}>New Entry</button>
      </div>
    </Panel>
  )
}

function Education({ data, name = "Education", onChange, addEntry }) {
  const entriesNew = () => {
    const entriesArray = [];
    for (let i = 0; i < data.length; i++) {
      const index = i;
      const entry = data[index];
      entriesArray.push(<Entry key={entry.id} id={entry.id} index={index} parent={entry} data={entry} name={("School")} type={"education"} onChange={onChange}></Entry>)
    };
    return (entriesArray);
  };
  const entries = entriesNew();
  return (
    <Panel name={name}>
      {entries}
      <div className="add-entry button-container">
        <button className="add-entry" onClick={() => { addEntry('education') }}>New Entry</button>
      </div>
    </Panel>
  )
}

function Entry({ id, data, name, type, index, isDescription = false, onChange }) {
  const entryInfo = { type, index };
  const [visibility, setVisibility] = useState(true);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const toggleVisibility = () => setVisibility(!visibility);

  const handleDeletePrompt = (deleteConfirmed) => {
    setIsConfirmDelete(false);
    if (!deleteConfirmed) return;
    onChange(entryInfo, 'deletion', index);
  }

  const deletePrompt = isConfirmDelete ? <DeleteConfirm handleDeletePrompt={handleDeletePrompt}></DeleteConfirm> : null

  const onTextChange = (type, name, e) => {
    const value = e.target.value;
    onChange(entryInfo, name, value);
  }

  const description = (
    <fieldset>
      <label htmlFor={"job-description" + id}>Description</label>
      <textarea name="" id={"job-description" + id} value={data.description} onChange={(e) => onTextChange(type, "description", e)} ></textarea>
    </fieldset>
  )

  const head = {
    header: <>
      <button className={visibility ? "collapse show" : "collapse"} onClick={toggleVisibility}></button>
      <button className="settings" onClick={() => setIsConfirmDelete(!isConfirmDelete)}></button>
    </>,
    content: <>
      <label htmlFor={"company" + id}>{name}</label>
      <input type="text" id={"company" + id} value={data.place} onChange={(e) => onTextChange(type, "place", e)} />
    </>,
  }
  if (!visibility) return (
    <div className={isConfirmDelete ? "entry delete" : "entry"}>
      {deletePrompt}
      <div className="entry-header">
        {head.header}
      </div>
      <div className="entry-content">
        <fieldset>
          {head.content}
        </fieldset>
      </div>
    </div>
  );
  return (
    <>
      <div className={isConfirmDelete ? "entry delete" : "entry"}>
        {deletePrompt}
        <div className="entry-header">
          {head.header}
        </div>
        <div className="entry-content">
          <fieldset>
            {head.content}
          </fieldset>
          <fieldset>
            <label htmlFor={"job-title" + id}>Title</label>
            <input type="text" id={"job-title" + id} value={data.title} onChange={(e) => onTextChange(type, "title", e)} />
          </fieldset>
          <div className="row">
            <fieldset>
              <label htmlFor={"date-start" + id}>From</label>
              <input type="text" id={"date-start" + id} value={data.from} onChange={(e) => onTextChange(type, "from", e)} />
            </fieldset>
            <fieldset>
              <label htmlFor={"date-end" + id}>To</label>
              <input type="text" id={"date-end" + id} value={data.to} onChange={(e) => onTextChange(type, "to", e)} />
            </fieldset>
          </div>
          {isDescription ? description : null}
        </div>
      </div>
    </>
  )
}

function DeleteConfirm({ handleDeletePrompt }) {
  return (
    <div className="confirm-delete">
      <h2>Delete this entry?</h2>
      <div className="buttons">
        <button className="cancel" onClick={() => handleDeletePrompt(false)}>Cancel</button>
        <button className="delete" onClick={() => handleDeletePrompt(true)}>Delete</button>
      </div>
    </div>
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