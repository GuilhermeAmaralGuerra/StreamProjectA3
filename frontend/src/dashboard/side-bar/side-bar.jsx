function SideBar() {
  return (
    <aside className="flex h-full w-[320px] flex-col justify-between rounded-t-[30px] bg-(--md-sys-color-surface-container) px-5 py-10 text-(--md-sys-color-on-surface-variant)">
      <nav className="flex flex-col gap-2.5">
        <a
          href="#"
          className="flex h-12 items-center gap-3 rounded-2xl bg-(--md-sys-color-secondary-container) px-4 text-(--md-sys-color-secondary)"
        >
          <span className="material-symbols-rounded fill text-[22px]! text-(--md-sys-color-on-secondary-container)">home</span>
          <span className="text-sm font-medium">Home</span>
        </a>

        <a
          href="#"
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-(--md-sys-color-secondary) transition-colors hover:bg-(--md-sys-color-surface-container-high)"
        >
          <span className="material-symbols-rounded text-[22px]! text-(--md-sys-color-on-surface-variant)">explore</span>
          <span className="text-sm font-medium">Explorar</span>
        </a>

        <a
          href="#"
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-(--md-sys-color-secondary) transition-colors hover:bg-(--md-sys-color-surface-container-high)"
        >
          <span className="material-symbols-rounded text-[22px]! text-(--md-sys-color-on-surface-variant)">favorite</span>
          <span className="text-sm font-medium">Favoritos</span>
        </a>

        <a
          href="#"
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-(--md-sys-color-secondary) transition-colors hover:bg-(--md-sys-color-surface-container-high)"
        >
          <span className="material-symbols-rounded text-[22px]! text-(--md-sys-color-on-surface-variant)">schedule</span>
          <span className="text-sm font-medium">Ver mais tarde</span>
        </a>

        <div className="mx-0 h-px bg-(--md-sys-color-outline-variant)"></div>

        <a
          href="#"
          className="flex h-12 items-center gap-3 rounded-2xl px-4 text-(--md-sys-color-secondary) transition-colors hover:bg-(--md-sys-color-surface-container-high)"
        >
          <span className="material-symbols-rounded text-[22px]! text-(--md-sys-color-on-surface-variant)">settings</span>
          <span className="text-sm font-medium">Configurações</span>
        </a>
      </nav>

      <section className="flex flex-col gap-5">
        <h2 className="text-sm font-medium text-(--md-sys-color-on-surface)">Continue assistindo:</h2>

        <article className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="h-14.5 w-12.5 rounded-xl bg-(--md-sys-color-outline-variant)"></div>

            <div className="flex flex-col gap-2">
              <p className="truncate text-sm text-(--md-sys-color-on-surface)">Ruptura</p>
              <p className="text-xs text-(--md-sys-color-on-surface-variant)">Episodio 2</p>
            </div>
          </div>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-1.25 text-(--md-sys-color-on-surface-variant)"
          >
            <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
          </button>
        </article>
      </section>
    </aside>
  )
}

export default SideBar
