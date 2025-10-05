import { useState } from 'react';
import './Document.css'

const user = {
  name: 'John Doe',
  occupation: 'Web Developer',
  profile: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe vitae, beatae dolorum, perferendis quae unde minus consectetur cumque aliquid quaerat molestias! Minus, similique odio vel magni tenetur quam fugiat.'
}

export default function Document() {
  return (
    <div className="document">
      <aside>
        <div className="avatar"></div>
        <Section heading='Contact' array={['123-555-1234', 'me@email.com', '123 Address St. City, State', 'www.theodinproject.com']}></Section>
        <Section heading="Skills" array={[1, 2, 3]} ></Section>
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

function Section({ heading, text, array }) {
  const [sectionData, setSectionData] = useState({ heading, text, array });
  const [isControls, setIsControls] = useState(false);
  const textContent = sectionData.text ? <p>{sectionData.text}</p> : null;
  let controls = isControls ? <SectionButtons data={sectionData}></SectionButtons> : null;
  let list = null;
  if (sectionData.array) {
    const arrayList = sectionData.array.map((item) => <li key={item}>{item}</li>)
    list = <ul>{arrayList}</ul>
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

function SectionButtons({ data }) {
  const parentData = data;
  return (
    <div className="edit-buttons">
      <button className="edit" onClick={() => console.log(parentData)}></button>
      <button className="delete" onClick={() => console.log()}></button>
    </div >
  )
}