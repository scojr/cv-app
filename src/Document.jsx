import { useState } from 'react';
import { getListFromId } from './list-handler';

import './Document.css'

const user = {
  name: 'John Doe',
  occupation: 'Web Developer',
  profile: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe vitae, beatae dolorum, perferendis quae unde minus consectetur cumque aliquid quaerat molestias! Minus, similique odio vel magni tenetur quam fugiat.'
}

let onEditClick;

function setOnEditClick(value) {
  onEditClick = value;
}

export default function Document({ onEditClick }) {
  setOnEditClick(onEditClick);
  return (
    <div className="document">
      <aside>
        <div className="avatar"></div>
        <Section heading='Contact' listId={'1158d3cf-f0bd-4eb6-9931-4906af93dbd9'}></Section>
        <Section heading="Skills" listId={'92eccd36-6647-4426-84dd-643f63e66378'} ></Section>
      </aside>
      <main>
        <header>
          <h1 className="client-name">{user.name}</h1>
          <h2 className="occupation-title">{user.occupation}</h2>
        </header>
        <Section heading='Profile' text={user.profile}></Section>
        <Section heading='Experience'></Section>
        <Section heading='Education'></Section>
        <Section heading='References'></Section>
      </main>
    </div>
  )
}

function Section({ heading = '', text = '', listId = '', }) {
  const [sectionData, setSectionData] = useState({ heading, text, listId });
  const [isControls, setIsControls] = useState(false);
  const [listObject, setListObject] = useState(getListFromId(listId));
  const textContent = sectionData.text ? <p>{sectionData.text}</p> : null;

  if (listObject !== getListFromId(sectionData.listId)) setListObject(listId);


  let controls = isControls ? <SectionButtons sectionData={sectionData} setSectionData={setSectionData} setListObject={setListObject}></SectionButtons> : null;

  let list = null;
  if (sectionData.listId) {
    list = <ListSection listObject={listObject}></ListSection>
  }

  return (
    <section
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

function SectionButtons({ sectionData, setSectionData, listObject, setListObject }) {
  return (
    <div className="edit-buttons">
      <button className="edit" onClick={() => onEditClick(sectionData, setSectionData, listObject, setListObject)}></button>
      <button className="delete" onClick={() => console.log()}></button>
    </div >
  )
}

function ListSection({ listObject }) {
  const arrayList = listObject.array.map((item, index) => <li key={listObject.ids[index]}>{item}</li>)
  return (
    <ul>{arrayList}</ul>
  )
}