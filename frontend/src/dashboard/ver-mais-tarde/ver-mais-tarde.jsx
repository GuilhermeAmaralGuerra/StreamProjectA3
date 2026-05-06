function VerMaisTarde() {
  const later = ['Cosmos', 'Better Call Saul', 'The Boys', 'Fullmetal Alchemist']

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Ver mais tarde</h1>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">Títulos salvos para assistir depois, quando quiser.</p>
        </div>
        <button type="button" className="rounded-full bg-(--md-sys-color-outline-variant) px-4 py-2 text-sm text-(--md-sys-color-on-surface)">
          Gerenciar lista
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {later.map((title) => (
          <article key={title} className="rounded-[30px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-5 shadow-sm shadow-(--md-sys-color-shadow/5)">
            <h2 className="text-lg font-semibold text-(--md-sys-color-on-surface)">{title}</h2>
            <p className="mt-2 text-sm text-(--md-sys-color-on-surface-variant)">Colocado na lista para assistir em outro momento.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default VerMaisTarde
