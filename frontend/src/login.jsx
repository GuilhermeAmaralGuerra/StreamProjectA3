import './login.css'

function Login() {
  return (
    <>
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>

      <footer>
        <p>&copy; 2024 StreamProjectA3. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Login