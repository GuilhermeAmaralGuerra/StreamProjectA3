function Favoritos() {
  const favorites = ['Breaking Bad', 'The Office', 'Chernobil', 'Fullmetal Alchemist']

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Favoritos</h1>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">Acessar rapidamente os títulos que você curtiu.</p>
        </div>
        <span className="rounded-full bg-(--md-sys-color-secondary-container) px-4 py-2 text-sm font-medium text-(--md-sys-color-on-surface)">{favorites.length} itens</span>
      </header>

      <div className="grid auto-rows-[96px] gap-4 md:grid-cols-2">
        {favorites.map((item) => (
          <div key={item} className="relative min-w-0">
            <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
              <div className="h-8"></div>

              <div className="relative flex flex-1 items-center gap-2.5 justify-between py-3 px-4">
                <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{item}</p>

                <button
                  type="button"
                  aria-label={`Assistir ${item}`}
                  className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favoritos
