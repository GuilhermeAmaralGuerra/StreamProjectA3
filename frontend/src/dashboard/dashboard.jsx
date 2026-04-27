import SideBar from './side-bar/side-bar.jsx'
import Home from './home/home.jsx'

function Dashboard() {
  return (
    <main className="h-full bg-(--md-sys-color-surface) px-25 pt-10 text-(--md-sys-color-on-surface)">
      <div className="flex h-full flex-row gap-2.5">
        <SideBar />
        <section className="flex-1">
          <Home />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
