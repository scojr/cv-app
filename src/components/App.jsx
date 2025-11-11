import '../styles/App.css'
import Document from './Document'
import PropertiesPanel from './Properties'
import { useState } from 'react'
import { user, experience, education, Entry } from '../scripts/placeholder-data'


function App() {
  const [userData, setUserData] = useState(user);
  const [experienceData, setExperienceData] = useState(experience);
  const [educationData, setEducationData] = useState(education);
  const data = { user: userData, experience: experienceData, education: educationData };

  function onChange(cat, type, newData) {
    if (cat === "user") {
      setUserData({
        ...userData,
        [type]: newData
      })
    }
    if (cat.type === "experience") {
      const index = cat.index;
      const newArray = experienceData.slice();
      newArray[index][type] = newData;
      setExperienceData(newArray);
    }
    if (cat.type === "education") {
      const index = cat.index;
      const newArray = educationData.slice();
      newArray[index][type] = newData;
      setEducationData(newArray);
    }
    if (type === "deletion") {
      let array = experienceData;
      let setData = setExperienceData;
      if (cat.type === "education") {
        array = educationData;
        setData = setEducationData;
      }
      const newArray = array.toSpliced(cat.index, 1);
      setData(newArray);
    }
    if (type === "add entry") {
      let array = experienceData;
      let setData = setExperienceData;
      if (cat === "education") {
        array = educationData;
        setData = setEducationData;
      }
      const newArray = array.slice();
      newArray.push(new Entry);
      setData(newArray);
    }
  }

  return (
    <div id='root'>
      <Document data={data}></Document>
      <PropertiesPanel data={data} onChange={onChange} >
      </PropertiesPanel>
    </div>
  )
}

export default App
