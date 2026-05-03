import { Link, useLocation } from 'react-router-dom'

function SideBar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItemClass = (path) =>
    `flex h-12 items-center gap-3 rounded-2xl px-4 transition-colors ${
      isActive(path)
        ? 'bg-(--md-sys-color-secondary-container) text-(--md-sys-color-secondary)'
        : 'text-(--md-sys-color-secondary) hover:bg-(--md-sys-color-surface-container-high)'
    }`

  const iconClass = (path) =>
    `material-symbols-rounded text-[22px]! ${
      isActive(path)
        ? 'fill text-(--md-sys-color-on-secondary-container)'
        : 'text-(--md-sys-color-on-surface-variant)'
    }`

  return (
    <aside className="flex h-full w-[320px] flex-col justify-between rounded-t-[30px] bg-(--md-sys-color-surface-container) px-5 py-10 text-(--md-sys-color-on-surface-variant)">
      <nav className="flex flex-col gap-2.5">
        {/* HOME */}
        <Link to="/dashboard" className={navItemClass('/dashboard')}>
          <span className={iconClass('/dashboard')}>home</span>
          <span className="text-sm font-medium">Home</span>
        </Link>

        {/* EXPLORAR */}
        <Link to="/explorar" className={navItemClass('/explorar')}>
          <span className={iconClass('/explorar')}>explore</span>
          <span className="text-sm font-medium">Explorar</span>
        </Link>

        {/* FAVORITOS */}
        <Link to="/favoritos" className={navItemClass('/favoritos')}>
          <span className={iconClass('/favoritos')}>favorite</span>
          <span className="text-sm font-medium">Favoritos</span>
        </Link>

        {/* VER MAIS TARDE */}
        <Link to="/ver-mais-tarde" className={navItemClass('/ver-mais-tarde')}>
          <span className={iconClass('/ver-mais-tarde')}>schedule</span>
          <span className="text-sm font-medium">Ver mais tarde</span>
        </Link>

        <div className="mx-0 h-px bg-(--md-sys-color-outline-variant)"></div>

        {/* CONFIGURAÇÕES */}
        <Link to="/configuracoes" className={navItemClass('/configuracoes')}>
          <span className={iconClass('/configuracoes')}>settings</span>
          <span className="text-sm font-medium">Configurações</span>
        </Link>

        {/* LOGOUT */}
        <Link to="/login" className="flex h-12 items-center gap-3 rounded-2xl px-4 text-red-400 transition-colors hover:bg-red-500/10">
          <span className="material-symbols-rounded text-[22px]!">logout</span>
          <span className="text-sm font-medium">Sair</span>
        </Link>
      </nav>

      <section className="flex flex-col gap-5">
        <h2 className="text-sm font-medium text-(--md-sys-color-on-surface)">
          Continue assistindo:
        </h2>

        <article className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-14.5 w-12.5 rounded-xl bg-(--md-sys-color-outline-variant)"></div>

            <div className="flex flex-col gap-2">
              <p className="truncate text-sm text-(--md-sys-color-on-surface)">
                Ruptura
              </p>
              <p className="text-xs text-(--md-sys-color-on-surface-variant)">
                Episódio 2
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-1.25 text-(--md-sys-color-on-surface-variant)"
          >
            <span className="material-symbols-rounded fill text-[20px]!">
              play_arrow
            </span>
          </button>
        </article>
      </section>
    </aside>
  )
}

export default SideBar