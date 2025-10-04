import './Document.css'

export default function Document() {
  return (
    <div className="document">
      <aside>
        <div className="avatar"></div>
        <section className="contact">
          <h3>Contact</h3>
          <ul>
            <li>123-555-1234</li>
            <li>me@email.com</li>
            <li>123 Address St. City, State</li>
            <li>www.theodinproject.com</li></ul>
        </section>
        <section className="skills">
          <h3>Skills</h3>
          <ul>
            <li>Juggling</li>
            <li>Ventriloquism</li>
            <li>Magic Tricks</li>
          </ul>
        </section>
      </aside>
      <main>
        <header>
          <h1 className="client-name">John Doe</h1>
          <h2 className="occupation-title">Occupation</h2>
        </header>
        <section className="profile">
          <h3 >Profile</h3>
          <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus saepe vitae, beatae dolorum, perferendis quae unde minus consectetur cumque aliquid quaerat molestias! Minus, similique odio vel magni tenetur quam fugiat.</p>
        </section>
        <section className="experience">
          <h3>Experience</h3>
        </section>
        <section className="education">
          <h3>Education</h3>
        </section>
        <section className="References">
          <h3>References</h3>
        </section>
      </main>
    </div>
  )
}