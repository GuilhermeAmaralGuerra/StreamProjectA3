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

      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((item) => (
          <article key={item} className="rounded-[30px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-5 shadow-sm shadow-(--md-sys-color-shadow/5)">
            <h2 className="text-lg font-semibold text-(--md-sys-color-on-surface)">{item}</h2>
            <p className="mt-2 text-sm text-(--md-sys-color-on-surface-variant)">Conteúdo guardado para você voltar a assistir depois.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Favoritos
