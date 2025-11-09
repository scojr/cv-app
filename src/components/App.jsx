import '../styles/App.css'
import Document from './Document'
import PropertiesPanel from './Properties'
import { useState } from 'react'
import { placeholderProfile } from '../scripts/placeholder-data'


function App() {
  const [userData, setUserData] = useState(placeholderProfile.user);
  const [experienceData, setExperienceData] = useState(placeholderProfile.experience);
  const [educationData, setEducationData] = useState(placeholderProfile.education);
  const data = { user: userData, experience: experienceData, education: educationData };
  return (
    <div id='root'>
      <Document data={data}></Document>
      <PropertiesPanel data={data} >
      </PropertiesPanel>
    </div>
  )
}

export default App
