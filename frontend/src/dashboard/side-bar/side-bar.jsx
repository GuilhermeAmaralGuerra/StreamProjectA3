import { Link, useLocation } from 'react-router-dom'
import { getBannerBackground, getBannerById } from '../../data/banners.js'

function SideBar() {
  const location = useLocation()
  const continueBanner = getBannerById('ruptura')

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/titulo/')
    }

    return location.pathname === path
  }

  const desktopItems = [
    { path: '/dashboard', label: 'Home', icon: 'home' },
    { path: '/dashboard/explorar', label: 'Explorar', icon: 'explore' },
    { path: '/dashboard/favoritos', label: 'Favoritos', icon: 'favorite' },
    { path: '/dashboard/ver-mais-tarde', label: 'Ver mais tarde', icon: 'schedule' },
    { path: '/dashboard/configuracoes', label: 'Configurações', icon: 'settings' },
    { path: '/dashboard/suporte', label: 'Suporte', icon: 'support_agent' },
  ]

  const mobileItems = [
    { path: '/dashboard', label: 'Home', icon: 'home' },
    { path: '/dashboard/explorar', label: 'Explorar', icon: 'explore' },
    { path: '/dashboard/favoritos', label: 'Favoritos', icon: 'favorite' },
    { path: '/dashboard/configuracoes', label: 'Configurações', icon: 'settings' },
  ]

  const desktopNavItemClass = (path) =>
    `flex h-12 items-center gap-3 rounded-2xl px-4 transition-colors ${
      isActive(path)
        ? 'bg-(--md-sys-color-secondary-container) text-(--md-sys-color-secondary)'
        : 'text-(--md-sys-color-secondary) hover:bg-(--md-sys-color-surface-container-high)'
    }`

  const desktopIconClass = (path) =>
    `material-symbols-rounded text-[22px]! ${
      isActive(path) ? 'fill text-(--md-sys-color-on-secondary-container)' : 'text-(--md-sys-color-on-surface-variant)'
    }`

  return (
    <>
      <aside className="hidden h-full w-[300px] flex-col justify-between rounded-[30px] bg-(--md-sys-color-surface-container) px-5 py-8 text-(--md-sys-color-on-surface-variant) lg:flex">
        <nav className="flex flex-col gap-2.5">
          {desktopItems.map((item) => (
            <Link key={item.path} to={item.path} className={desktopNavItemClass(item.path)}>
              <span className={desktopIconClass(item.path)}>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}

          <Link
            to="/login"
            className="mt-1 flex h-12 items-center gap-3 rounded-2xl px-4 text-red-400 transition-colors hover:bg-red-500/10"
          >
            <span className="material-symbols-rounded text-[22px]!">logout</span>
            <span className="text-sm font-medium">Sair</span>
          </Link>
        </nav>

        <section className="flex flex-col gap-5">
          <h2 className="text-sm font-medium text-(--md-sys-color-on-surface)">Continue assistindo:</h2>

          <article className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="h-14.5 w-12.5 rounded-xl bg-(--md-sys-color-outline-variant)"
                style={getBannerBackground(continueBanner)}
              ></div>

              <div className="flex flex-col gap-1">
                <p className="truncate text-sm text-(--md-sys-color-on-surface)">Ruptura</p>
                <p className="text-xs text-(--md-sys-color-on-surface-variant)">Episódio 2</p>
              </div>
            </div>

            <Link
              to="/player/ruptura"
              className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-1.25 text-(--md-sys-color-on-surface-variant)"
            >
              <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
            </Link>
          </article>
        </section>
      </aside>

      <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1rem)] max-w-[720px] -translate-x-1/2 items-center justify-between rounded-[20px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container)/95 px-2 py-2 shadow-[0_14px_25px_rgba(0,0,0,0.28)] backdrop-blur lg:hidden">
        {mobileItems.map((item) => {
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors ${
                active
                  ? 'bg-(--md-sys-color-secondary-container) text-(--md-sys-color-on-secondary-container)'
                  : 'text-(--md-sys-color-on-surface-variant)'
              }`}
            >
              <span className={`material-symbols-rounded text-[22px]! ${active ? 'fill' : ''}`}>{item.icon}</span>
              <span className="truncate text-[12px]">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default SideBar
