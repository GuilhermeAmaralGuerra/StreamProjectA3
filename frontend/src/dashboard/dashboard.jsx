import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getUsuarioLogado } from '../services/auth.js'
import SideBar from './side-bar/side-bar.jsx'

function Dashboard() {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()

  useEffect(() => {
    if (!usuario) {
      navigate('/login')
    }
  }, [navigate, usuario])

  if (!usuario) return null

  return (
    <main className="h-full bg-(--md-sys-color-surface) px-25 pt-10 text-(--md-sys-color-on-surface)">
      <div className="flex h-full flex-row gap-2.5">
        <SideBar />
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
