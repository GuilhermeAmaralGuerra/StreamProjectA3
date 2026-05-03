import './signup.css'
import { Link } from 'react-router-dom'
import {  useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
}

  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <h1 className="logo">AssinaVideo</h1>
          <h2>Crie sua conta</h2>

          <form onSubmit={handleLogin}>
            <div className="signup-inputs">
              <input type="text" placeholder="Nome de usuário" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Senha" />
              <input type="password" placeholder="Confirmar senha" />
            </div>

            <button type="submit">Cadastrar</button>
          </form>

          <div className="signup-text">
            Já tem uma conta?
            <br />
            <Link to="/login"><span className="login-link">Clique aqui e faça login</span></Link>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2026 AssinaVideo</p>
      </footer>
    </>
  )
}

export default Signup