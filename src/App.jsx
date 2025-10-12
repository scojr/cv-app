import { useState } from 'react'
import { getListFromId } from './list-handler';
import './App.css'
import Document from './Document'
import Sidebar from './Sidebar'

let setSectionData;
let setListObject;

function App() {
  const [heading, setHeading] = useState(null);
  const [text, setText] = useState(null);
  const [listId, setListId] = useState(null);
  const element = { heading, text, listId }
  if (setSectionData) setSectionData(element);
  if (setListObject) setListObject(listId);

  return (
    <div id='root'>
      <Document
        onEditClick={(data, func) => {
          setSectionData = func;
          setHeading(data.heading);
          setText(data.text);
          setListId(data.listId);
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
        }}>
      </Sidebar>
    </div>
  )
}

export default App
