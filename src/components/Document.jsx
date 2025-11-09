import '../styles/Document.css'

const user = {
  name: 'John Doe',
  occupation: 'Web Developer',
}

export default function Document({ color, fontSize }) {
  const fontSizeValue = `${fontSize}px`

  return (
    <div className="document" style={{ "--font-size": fontSizeValue }}>
      <aside style={{ "--aside-color": color }}>
        <div className="avatar"></div>
      </aside>
      <main>
        <header>
          <h1 className="client-name">{user.name}</h1>
          <h2 className="occupation-title">{user.occupation}</h2>
        </header>
      </main>
    </div>
  )
}