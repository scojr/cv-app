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

  console.log(element);
  return (
    <div id='root'>
      <Document
        onEditClick={(e, b) => {
          setSectionData = b;
          setHeading(e.heading);
          setText(e.text);
          setArray(e.array);
        }}></Document>
      <Sidebar
        elementData={element}
        onHeadingChange={(e) => {
          setHeading(e.target.value);
          setSectionData(element);
        }}
        onTextChange={(e) => {
          setText(e.target.value)
          setSectionData(element);
        }}
        onArrayChange={(e) => {
          setArray(e.target.value)
          setSectionData(element);
        }}>
      </Sidebar>
    </div>
  )
}

export default App
