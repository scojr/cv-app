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
  if (setSectionData) {
    setSectionData(element);
  }
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
        onHeadingChange={(e) => setHeading(e.target.value)}
        onTextChange={(e) => setText(e.target.value)}
        onArrayChange={(e) => setArray(e.target.value)}>
      </Sidebar>
    </div>
  )
}

export default App
