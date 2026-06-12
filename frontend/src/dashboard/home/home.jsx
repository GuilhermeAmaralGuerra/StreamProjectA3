import { Link } from 'react-router-dom'
import { catalog } from '../../data/catalog.js'
import { getBannerBackground, getBannerById } from '../../data/banners.js'

function Home() {
  const featured = catalog[0]
  const suggestions = catalog.slice(1)
  const featuredBanner = getBannerById(featured.id)

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-4 py-4 md:px-5 md:py-3.5">
      <header className="flex items-center gap-4">
        <div className="flex h-11 flex-1 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) px-6 py-4">
          <input
            className="w-full bg-transparent text-sm text-(--md-sys-color-on-surface) placeholder:text-(--md-sys-color-on-surface-variant)"
            placeholder="Pesquise"
            type="text"
          />
          <span className="material-symbols-rounded text-[18px]! text-(--md-sys-color-on-surface-variant)">search</span>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-(--md-sys-color-surface-container) bg-(--md-sys-color-outline-variant) text-sm font-semibold text-(--md-sys-color-on-surface)"
        >
          P
        </button>
      </header>

      <div className="flex flex-col gap-6 md:gap-8.5">
        <article className="relative flex flex-col overflow-hidden rounded-[26px] bg-(--md-sys-color-surface-container) md:rounded-b-[30px] md:rounded-t-[30px]">
          <div className="absolute inset-0" style={getBannerBackground(featuredBanner)}></div>
          <div className="absolute inset-0 bg-(--md-sys-color-surface-container)/86"></div>

          <div className="relative flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
            <div className="flex w-full flex-col justify-end gap-4.5 p-5 lg:w-[58%] lg:p-10">
              <div className="flex flex-col gap-2.5">
                <h1 className="text-[20px] leading-none text-(--md-sys-color-on-surface)">{featured.title}</h1>
                <p className="text-sm leading-[1.7] text-(--md-sys-color-on-surface-variant)">{featured.description}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to={`/player/${featured.id}`}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-(--md-sys-color-primary) px-4 py-2.5 text-[14px] font-medium text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
                  Assistir agora
                </Link>

                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-2.5 text-(--md-sys-color-on-surface-variant)"
                >
                  <span className="material-symbols-rounded fill text-[20px]!">schedule</span>
                </button>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-4 p-5 lg:flex-1 lg:flex-col lg:items-end lg:justify-between lg:p-6">
              <span className="flex h-10 items-center gap-1.25 rounded-full bg-(--md-sys-color-secondary-container) px-4 text-sm font-medium text-(--md-sys-color-on-surface)">
                <span className="material-symbols-rounded fill text-[20px]!">local_fire_department</span>
                {featured.tag}
              </span>

              <Link
                to={`/dashboard/titulo/${featured.id}`}
                className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-1 text-(--md-sys-color-on-surface-variant)"
              >
                <span className="material-symbols-rounded fill text-[30px]!">chevron_right</span>
              </Link>
            </div>
          </div>

          <div className="relative flex h-1.25 items-stretch gap-1 bg-(--md-sys-color-surface-container-high)">
            <span
              className="h-full rounded-full bg-(--md-sys-color-primary)"
              style={{ width: `${featured.progress}%` }}
            />
            <span className="h-full flex-1 rounded-full bg-(--md-sys-color-secondary-container)" />
          </div>
        </article>

        <section className="flex flex-col gap-5">
          <h2 className="text-[18px] font-medium leading-none text-(--md-sys-color-on-surface)">Voce pode gostar:</h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {suggestions.map((item) => (
              <Link key={item.id} to={`/dashboard/titulo/${item.id}`} className="min-w-0">
                <article className="flex min-w-0 flex-col overflow-hidden rounded-[20px]">
                  <div
                    className="relative flex h-[clamp(120px,22vw,190px)] items-start justify-end bg-(--md-sys-color-surface-container-high) p-3 lg:h-45"
                    style={getBannerBackground(getBannerById(item.id))}
                  >
                    <span className="rounded-full bg-(--md-sys-color-surface-container) px-2.5 py-1 text-[11px] font-medium text-(--md-sys-color-on-surface-variant)">
                      {item.type}
                    </span>

                    <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between gap-2.5">
                      <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{item.title}</p>

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
      </div>
    </section>
  )
}

export default Home
