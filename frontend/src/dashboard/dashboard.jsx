import { Outlet } from 'react-router-dom'
import SideBar from './side-bar/side-bar.jsx'
import SuporteFlutuante from './suporte/suporte-flutuante.jsx'

function Dashboard() {
  return (
    <main className="h-full bg-(--md-sys-color-surface) px-25 pt-10 text-(--md-sys-color-on-surface)">
      <div className="flex h-full flex-row gap-2.5">
        <SideBar />
        <section className="flex-1">
          <Outlet />
        </section>
        <SuporteFlutuante />
      </div>
    </main>
  )
}

export default Dashboard
