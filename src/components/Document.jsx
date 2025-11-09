import '../styles/Document.css'

export default function Document({ color, data }) {


  const experience = data.experience.map((item, index) => <Entry key={index} data={item}></Entry>);
  const education = data.education.map((item, index) => <Entry key={index} data={item}></Entry>);

  return (
    <div className="document" >
      <aside style={{ "--aside-color": color }}>
        <div className="avatar"></div>
        <Contact data={data.user}></Contact>
      </aside>
      <main>
        <header>
          <h1 className="client-name">{data.user.name}</h1>
          <h2 className="occupation-title">{data.user.title}</h2>
        </header>
        <section>
          <h2>Profile</h2>
          <p>{data.user.about}</p>
        </section>
        <section>
          <h2>Experience</h2>
          {experience}
        </section>
        <section>
          <h2>Education</h2>
          {education}
        </section>
      </main>
    </div>
  )
}

function Entry(item) {
  const data = item.data;
  return (
    <div className="entry">
      <div className="row">
        <h3>{data.place}</h3>
        <h5>{data.from + "-" + data.to}</h5>
      </div>
      <div className="box">
        <h4>{data.title}</h4>
        <p>{data.description}</p></div>
    </div>
  )
}

function Contact(user) {
  const data = user.data;
  return (
    <div className="contact">
      <h2>Contact</h2>
      <ul>
        <li>{data.phone}</li>
        <li>{data.email}</li>
        <li>{data.website}</li>
      </ul>
    </div>
  )
}