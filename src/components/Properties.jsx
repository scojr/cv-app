import { useState } from 'react'
import '../styles/Properties.css'

export default function PropertiesPanel({ data }) {

  const [width, setWidth] = useState('600px');
  const [category, setCategory] = useState(0);

  const categories = [<General data={data.user}></General>, <Employment data={data.experience}></Employment>, <Education data={data.education}></Education>]

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

function General({ name = "General", data }) {
  return (
    <>
      <Panel name={name} >
        <fieldset className="entry">
          <label htmlFor="name-input">Name</label>
          <input type="text" id="name-input" value={data.name} />
          <label htmlFor="name-input">Title</label>
          <input type="text" id="title-input" value={data.title} />
          <label htmlFor="profile">Profile</label>
          <textarea name="" id="profile" value={data.about}></textarea>
        </fieldset>
      </Panel>
      <Panel name={"Contact"} >
        <fieldset className="entry">
          <label htmlFor="phone-input">Phone</label>
          <input type="text" id="phone-input" value={data.phone} />
          <label htmlFor="email-input">Email</label>
          <input type="text" id="email-input" value={data.email} />
          <label htmlFor="phone-input">Website</label>
          <input type="text" id="website-input" value={data.website} />
        </fieldset>
      </Panel>
    </>
  )
}

function Employment({ data, name = "Experience" }) {
  const entries = data.map((item, index) => <Entry key={index} data={item} name={("Company")} isDescription={true}></Entry>)
  return (
    <Panel name={name}>
      {entries}
    </Panel>
  )
}

function Education({ data, name = "Education" }) {
  const entries = data.map((item, index) => <Entry key={index} data={item} name={("School")}></Entry>)
  return (
    <Panel name={name}>
      {entries}
    </Panel>
  )
}

function Entry({ data, name, isDescription }) {
  console.log(data)
  const [visibility, setVisibility] = useState(true);
  const toggleVisibility = () => setVisibility(!visibility);
  const description =
    <fieldset>
      <label htmlFor="job-description">Description</label>
      <textarea name="" id="job-description" value={data.description}></textarea>
    </fieldset>
  if (!visibility) return (
    <>
      <div className="entry">
        <div className="entry-header">
          <button className="collapse show" onClick={toggleVisibility}></button>
        </div>
        <div className="entry-content">
          <fieldset>
            <label htmlFor="company">{name}</label>
            <input type="text" id="company" value={data.place} />
          </fieldset>
        </div>
      </div>
    </>
  )
  return (
    <>
      <div className="entry">
        <div className="entry-header">
          <button className="collapse hide" onClick={toggleVisibility}></button>
        </div>
        <div className="entry-content">
          <fieldset>
            <label htmlFor="company">{name}</label>
            <input type="text" id="company" value={data.place} />
            <label htmlFor="job-title">Title</label>
            <input type="text" id="job-title" value={data.title} />
          </fieldset>
          <div className="row">
            <fieldset>
              <label htmlFor="date-start">From</label>
              <input type="text" id="date-start" value={data.from} />
            </fieldset>
            <fieldset>
              <label htmlFor="date-end">To</label>
              <input type="text" id="date-end" value={data.to} />
            </fieldset>
          </div>
          {isDescription ? description : null}
        </div>
      </div>
    </>
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