import './login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h1 className="logo">Assina Video</h1>
          <h2>Login</h2>

          <form>
            <div className='login-inputs'>
              <input type="text" placeholder="Usuário" />
              <input type="password" placeholder="Senha" />
            </div>

            <button type="submit">Entrar</button>
          </form>

          <p className="signup-text">
            Não tem conta?
            <br />
            <Link to="/signup"><span className="signup-link">Clique aqui e assine agora</span></Link>
          </p>
        </div>
      </div>

      <footer>
        <p>&copy; 2026 AssinaVideo</p>
      </footer>
    </>
  )
}

export default Login