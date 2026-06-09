import './login.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api.js'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    usuario: '',
    senha: ''
  })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const data = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario))
      navigate('/dashboard')
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <h1 className="logo">Assina Video</h1>
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <div className="login-inputs">
              <input
                type="text"
                name="usuario"
                placeholder="Email ou usuario"
                value={form.usuario}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            {erro && <p className="form-message error">{erro}</p>}

            <button type="submit" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="signup-text">
            Nao tem conta?
            <br />
            <Link to="/signup">
              <span className="signup-link">Clique aqui e assine agora</span>
            </Link>
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
