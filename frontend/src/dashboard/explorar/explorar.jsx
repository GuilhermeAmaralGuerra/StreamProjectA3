function Explorar() {
  const categories = ['Séries', 'Filmes', 'Documentários', 'Animações', 'Esportes', 'Música']

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex flex-col gap-3">
        <div className="flex h-11 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) px-6">
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Buscar conteúdo" type="text" />
          <span className="material-symbols-rounded text-[18px]! text-(--md-sys-color-on-surface-variant)">search</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="rounded-full border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) px-4 py-2 text-sm text-(--md-sys-color-on-surface) transition hover:bg-(--md-sys-color-surface-container)">
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {['Séries em alta', 'Novos lançamentos', 'Recomendados para você', 'Tendências locais'].map((title) => (
          <article key={title} className="rounded-[30px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container) p-5 shadow-sm shadow-(--md-sys-color-shadow/5)">
            <h2 className="text-xl font-semibold text-(--md-sys-color-on-surface)">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-(--md-sys-color-on-surface-variant)">
              Veja uma seleção personalizada de títulos para essa categoria. Explore novas opções e encontre algo para maratonar.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Explorar
