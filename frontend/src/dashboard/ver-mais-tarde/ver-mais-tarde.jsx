import { Link } from 'react-router-dom'
import { catalog } from '../../data/catalog.js'
import { getBannerBackground, getBannerByTitle } from '../../data/banners.js'

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

      <div className="flex flex-wrap gap-4">
        {later.map((title) => (
          <Link
            key={title}
            to={getPlayUrl(title)}
            aria-label={`Assistir ${title}`}
            className="w-[calc(50%-0.5rem)] min-w-0 sm:w-[170px] lg:w-[185px]"
          >
            <article className="flex min-w-0 flex-col overflow-hidden rounded-[20px]">
              <div
                className="relative h-[clamp(130px,28vw,190px)] bg-(--md-sys-color-surface-container-high) sm:h-45"
                style={getBannerBackground(getBannerByTitle(title))}
              >
                <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2.5">
                  <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{title}</p>

                  <span className="flex items-center justify-center rounded-full bg-(--md-sys-color-primary) p-1.25 text-(--md-sys-color-on-primary)">
                    <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default VerMaisTarde
