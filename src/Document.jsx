import { useState } from 'react';
import { newList, getListFromId } from './list-handler';
import { placeholderSections } from './placeholder-data';

import './Document.css'

const user = {
  name: 'John Doe',
  occupation: 'Web Developer',
  profile: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe vitae, beatae dolorum, perferendis quae unde minus consectetur cumque aliquid quaerat molestias! Minus, similique odio vel magni tenetur quam fugiat.'
}

const loremString = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'

let onEditClick;

function setOnEditClick(value) {
  onEditClick = value;
}

export default function Document({ onEditClick }) {
  const [sections, setSections] = useState([])
  const [nextId, setNextId] = useState(0);

  function addSection(isMain, data) {
    console.log(sections);
    const place = isMain ? 'main' : 'aside';
    setSections([...sections, { id: nextId, place, data }])
    setNextId(nextId => nextId + 1);
  }

  function deleteSection(id) {
    const indexToRemove = sections.findIndex((section) => section.id === id);
    const newSections = sections.slice(indexToRemove, 1);
    setSections(newSections);
  }

  if (sections.length === 0) addPlaceholders();

  function addPlaceholders() {
    let nextId = 0;
    let newSections = [];
    pushSection('main');
    pushSection('aside');

    function pushSection(place) {
      placeholderSections[place].forEach((section) => {
        const sectionList = section.list ? newList(section.list) : null;
        console.log(sectionList);
        newSections.push({ id: nextId, place: place, data: section, listId: sectionList.id })
        nextId += 1;
      })
    }

    console.log(nextId, newSections)
    setSections(newSections);
    setNextId(nextId);
  }

  const mainSections = sections.filter((section) => section.place === 'main');
  const asideSections = sections.filter((section) => section.place === 'aside');

  setOnEditClick(onEditClick);
  return (
    <div className="document">
      <aside>
        <div className="avatar"></div>      {asideSections.map((section) => (
          <Section heading={section.data.heading || 'New Section'} text={section.data.text || loremString} listId={section.listId} onDelete={deleteSection} key={section.id} id={section.id} />
        ))}
        <button className='add-entry-side' onClick={() => addSection(false)}></button>
      </aside>
      <main>
        <header>
          <h1 className="client-name">{user.name}</h1>
          <h2 className="occupation-title">{user.occupation}</h2>
        </header>
        {mainSections.map((section) => (
          <Section heading={section.data.heading || 'New Section'} text={section.data.text || loremString} listId={section.listId} onDelete={deleteSection} key={section.id} id={section.id} />
        ))}
        <button className='add-entry-body' onClick={() => addSection(true)}></button>
      </main>
    </div>
  )
}

function Section({ id, onDelete, heading = '', text = '', listId = '', }) {
  const [sectionData, setSectionData] = useState({ heading, text, listId });
  const [isControls, setIsControls] = useState(false);
  const [listObject, setListObject] = useState(getListFromId(listId));
  const textContent = sectionData.text ? <p>{sectionData.text}</p> : null;


  let controls = isControls ? <SectionButtons id={id} onDelete={onDelete} sectionData={sectionData} setSectionData={setSectionData} setListObject={setListObject} ></SectionButtons> : null;

  let list = null;
  if (sectionData.listId) {
    list = <ListSection listObject={listObject}></ListSection>
  }

  return (
    <section
      className={testIfStringEmpty(sectionData.heading) ? 'headless' : ''}
      onMouseEnter={() => setIsControls(true)}
      onMouseLeave={() => setIsControls(false)}>
      <h3>{sectionData.heading}</h3>
      <div className="separator"></div>
      {textContent}
      {list}
      {controls}
    </section>
  )
}

function SectionButtons({ sectionData, setSectionData, listObject, setListObject, onDelete, id }) {
  return (
    <div className="edit-buttons">
      <button className="edit" onClick={() => onEditClick(sectionData, setSectionData, listObject, setListObject)}></button>
      <button className="delete" onClick={() => onDelete(id)}></button>
    </div >
  )
}

function ListSection({ listObject }) {
  const arrayList = listObject.array.map((item, index) => <li key={listObject.ids[index]}>{item}</li>)
  return (
    <ul>{arrayList}</ul>
  )
}

function testIfStringEmpty(string) {
  if (string === "" || string === " ") return true;
  else return false;
}