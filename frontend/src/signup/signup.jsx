import './signup.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api.js'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleCadastro = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const data = await apiRequest('/usuarios', {
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
      <div className="signup-page">
        <div className="signup-container">
          <h1 className="logo">AssinaVideo</h1>
          <h2>Crie sua conta</h2>

          <form onSubmit={handleCadastro}>
            <div className="signup-inputs">
              <input
                type="text"
                name="nome"
                placeholder="Nome de usuario"
                value={form.nome}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
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
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                required
              />
            </div>

            {erro && <p className="form-message error">{erro}</p>}

            <button type="submit" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="signup-text">
            Ja tem uma conta?
            <br />
            <Link to="/login"><span className="login-link">Clique aqui e faca login</span></Link>
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
