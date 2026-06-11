import { Link } from 'react-router-dom'
import { catalog } from '../../data/catalog.js'

function Home() {
  const featured = catalog[0]
  const suggestions = catalog.slice(1)

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center gap-4">
        <div className="flex h-11 flex-1 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) px-6 py-4">
          <input className="text-sm" placeholder="Pesquise" type="text" />
          <span className="material-symbols-rounded text-[18px]! text-(--md-sys-color-on-surface-variant)">search</span>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-(--md-sys-color-surface-container) bg-(--md-sys-color-outline-variant) text-sm font-semibold text-(--md-sys-color-on-surface)"
        >
          P
        </button>
      </header>

      <div className="flex flex-col gap-8.5">
        <article className="flex flex-col overflow-hidden rounded-t-[30px]">
          <div className="flex flex-1 items-stretch justify-between">
            <div className="flex w-[40%] flex-col justify-end gap-4.5 p-10">
              <div className="flex flex-col gap-2.5">
                <h1 className="text-[20px] leading-none text-(--md-sys-color-on-surface)">{featured.title}</h1>
                <p className="text-sm leading-[1.9] text-(--md-sys-color-on-surface-variant)">
                  {featured.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  to={`/dashboard/titulo/${featured.id}`}
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

            <div className="flex flex-1 flex-col items-end justify-between p-6">
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

          <div className="flex h-1.25 items-stretch gap-1 bg-(--md-sys-color-surface-container)">
            <span
              className="h-full rounded-full bg-(--md-sys-color-primary)"
              style={{ width: `${featured.progress}%` }}
            />
            <span className="h-full flex-1 rounded-full bg-(--md-sys-color-secondary-container)" />
          </div>
        </article>

        <section className="flex flex-col gap-5">
          <h2 className="text-[18px] font-medium leading-none text-(--md-sys-color-on-surface)">Voce pode gostar:</h2>

          <div className="grid h-57.5 grow-0 grid-cols-6 grid-rows-1 gap-x-4.5 gap-y-4.5 self-stretch p-0">
            {suggestions.map((item) => (
              <Link key={item.id} to={`/dashboard/titulo/${item.id}`} className="relative min-w-0">
                <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
                  <div className="flex h-45 items-start justify-end p-3">
                    <span className="rounded-full bg-(--md-sys-color-surface-container) px-2.5 py-1 text-[11px] font-medium text-(--md-sys-color-on-surface-variant)">
                      {item.type}
                    </span>
                  </div>

                  <div className="relative flex flex-1 items-center justify-between gap-2.5 px-4 py-5">
                    <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{item.title}</p>

                    <span className="flex items-center justify-center rounded-full bg-(--md-sys-color-primary) p-1.25 text-(--md-sys-color-on-primary)">
                      <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                    </span>
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
