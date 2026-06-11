import { Link } from 'react-router-dom'
import { catalog } from '../../data/catalog.js'

function VerMaisTarde() {
  const later = ['Cosmos', 'Better Call Saul', 'The Boys', 'Fullmetal Alchemist']

  const getPlayUrl = (title) => {
    const item = catalog.find((c) => c.title.toLowerCase() === title.toLowerCase())
    return `/player/${item ? item.id : 'ruptura'}`
  }

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

      <div className="grid auto-rows-[96px] gap-4 md:grid-cols-2">
        {later.map((title) => (
          <div key={title} className="relative min-w-0">
            <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
              <div className="h-8"></div>

              <div className="relative flex flex-1 items-center gap-2.5 justify-between py-3 px-4">
                <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{title}</p>

                <Link
                  to={getPlayUrl(title)}
                  aria-label={`Assistir ${title}`}
                  className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VerMaisTarde
