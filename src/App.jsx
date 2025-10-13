import { useState } from 'react'
import './App.css'
import Document from './Document'
import Sidebar from './Sidebar'

let setSectionDataGlobal;

function App() {
  const [heading, setHeading] = useState(null);
  const [text, setText] = useState(null);
  const [listId, setListId] = useState(null);
  const element = { heading, text, listId }
  if (setSectionDataGlobal) setSectionDataGlobal(element);

  return (
    <div id='root'>
      <Document
        onEditClick={(sectionData, setSectionData) => {
          setSectionDataGlobal = setSectionData;
          setHeading(sectionData.heading);
          setText(sectionData.text);
          setListId(sectionData.listId);
        }}></Document>
      <Sidebar
        elementData={element}
        onHeadingChange={(e) => {
          setHeading(e.target.value);
        }}
        onTextChange={(e) => {
          setText(e.target.value);
        }}
        onListChange={() => {
          setListId(null);
          setListId(listId);
        }}>
      </Sidebar>
    </div>
  )
}

export default App
