import { useState } from 'react'
import '../styles/App.css'
import Document from './Document'
import Sidebar from './Sidebar'

let setSectionDataGlobal;

function App() {
  const [heading, setHeading] = useState(null);
  const [text, setText] = useState(null);
  const [listId, setListId] = useState(null);
  const [color, setColor] = useState('#5f8fbb');
  const [font, setFont] = useState(null);
  const [fontSize, setFontSize] = useState(20);
  const element = { heading, text, listId }
  if (setSectionDataGlobal) setSectionDataGlobal(element);

  const onColorChange = (value) => {
    setColor(value);
  }
  const onFontChange = (value) => {
    setFont(value);
  }
  const onFontSizeChange = (value) => {
    setFontSize(value);
    console.log(value);
  }

  return (
    <div id='root'>
      <Document
        color={color}
        font={font}
        fontSize={fontSize}
        onEditClick={(sectionData, setSectionData) => {
          setSectionDataGlobal = setSectionData;
          setHeading(sectionData.heading);
          setText(sectionData.text);
          setListId(sectionData.listId);
        }}></Document>
      <Sidebar
        onColorChange={onColorChange}
        onFontChange={onFontChange}
        onFontSizeChange={onFontSizeChange}
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
