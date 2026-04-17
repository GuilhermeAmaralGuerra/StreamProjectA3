import { Link } from 'react-router-dom'

function Home() {
  return (
    <main style={{ padding: '24px' }}>
      <h1>Home</h1>
      <p>React Router configurado com sucesso.</p>
      <Link to="/login">Ir para Login</Link>
    </main>
  )
}

export default Home
