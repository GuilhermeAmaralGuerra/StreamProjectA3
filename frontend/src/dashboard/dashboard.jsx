import { Outlet } from 'react-router-dom'
import SideBar from './side-bar/side-bar.jsx'
import SuporteFlutuante from './suporte/suporte-flutuante.jsx'

function Dashboard() {
  return (
    <main className="h-full bg-(--md-sys-color-surface) p-0 text-(--md-sys-color-on-surface) lg:px-[clamp(32px,6vw,100px)] lg:py-5">
      <div className="relative mx-auto flex h-screen w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-(--md-sys-color-surface) shadow-none md:h-[calc(100vh-2.5rem)] lg:flex-row lg:gap-2.5 xl:rounded-[32px] xl:border-0 xl:shadow-none">
        <SideBar />

        <section className="min-h-0 flex-1 overflow-y-auto pb-24 lg:pb-0">
          <Outlet />
        </section>

        <div className="hidden lg:block">
          <SuporteFlutuante />
        </div>
      </div>
    </main>
  )
}

export default Dashboard
