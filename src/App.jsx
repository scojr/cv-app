import { useState } from 'react'
import './App.css'
import Document from './Document'
import Sidebar from './Sidebar'

let setSectionData;

function App() {
  const [heading, setHeading] = useState(null);
  const [text, setText] = useState(null);
  const [array, setArray] = useState(null);
  const element = { heading, text, array }
  console.log(element, setSectionData);
  if (setSectionData) setSectionData(element);

  return (
    <div id='root'>
      <Document
        onEditClick={(data, func) => {
          setSectionData = func;
          setHeading(data.heading);
          setText(data.text);
          setArray(data.array);
        }}></Document>
      <Sidebar
        elementData={element}
        onHeadingChange={(e) => {
          setHeading(e.target.value);
        }}
        onTextChange={(e) => {
          setText(e.target.value);
        }}
        onArrayChange={(e) => {
          setArray(e.target.value);
        }}>
      </Sidebar>
    </div>
  )
}

export default App
