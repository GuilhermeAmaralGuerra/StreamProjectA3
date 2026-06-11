import { Link, useParams } from 'react-router-dom'
import { catalog } from '../../data/catalog.js'

function Titulo() {
  const { titleId } = useParams()
  const title = catalog.find((item) => item.id === titleId)

  if (!title) {
    return (
      <section className="flex h-full flex-col items-start justify-center gap-4 px-5 py-3.5">
        <h1 className="text-2xl font-semibold text-(--md-sys-color-on-surface)">Titulo nao encontrado</h1>
        <p className="max-w-xl text-sm leading-6 text-(--md-sys-color-on-surface-variant)">
          O conteudo solicitado nao esta disponivel no catalogo.
        </p>
        <Link
          to="/dashboard"
          className="rounded-full bg-(--md-sys-color-primary) px-5 py-2.5 text-sm font-medium text-(--md-sys-color-on-primary)"
        >
          Voltar para Home
        </Link>
      </section>
    )
  }

  const related = catalog.filter((item) => item.id !== title.id).slice(0, 3)

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 overflow-y-auto px-5 py-3.5">
      <header className="grid min-h-[280px] grid-cols-[minmax(0,1fr)_320px] gap-6 overflow-hidden rounded-t-[30px] bg-(--md-sys-color-surface-container)">
        <div className="flex flex-col justify-end gap-5 p-8">
          <Link
            to="/dashboard"
            className="flex w-fit items-center gap-2 text-sm font-medium text-(--md-sys-color-on-surface-variant)"
          >
            <span className="material-symbols-rounded text-[20px]!">arrow_back</span>
            Voltar
          </Link>

          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-(--md-sys-color-secondary-container) px-4 py-2 text-sm font-medium text-(--md-sys-color-on-surface)">
              {title.tag}
            </span>
            <h1 className="text-4xl font-semibold leading-none text-(--md-sys-color-on-surface)">{title.title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-(--md-sys-color-on-surface-variant)">
              {title.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-(--md-sys-color-on-surface-variant)">
            {[title.type, title.category, title.rating, title.year, title.seasons, title.duration].map((detail) => (
              <span key={detail} className="rounded-full bg-(--md-sys-color-outline-variant) px-3 py-1">
                {detail}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to={`/player/${title.id}`}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-(--md-sys-color-primary) px-5 py-2.5 text-sm font-medium text-(--md-sys-color-on-primary)"
            >
              <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
              Assistir agora
            </Link>

            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-(--md-sys-color-outline-variant) px-4 py-2.5 text-sm font-medium text-(--md-sys-color-on-surface-variant)"
            >
              <span className="material-symbols-rounded fill text-[20px]!">favorite</span>
              Favoritar
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-(--md-sys-color-outline-variant) p-6">
          <div className="flex justify-end">
            <span className="material-symbols-rounded fill text-[34px]! text-(--md-sys-color-primary)">movie</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-(--md-sys-color-on-surface)">Progresso</p>
            <div className="h-2 overflow-hidden rounded-full bg-(--md-sys-color-surface-container)">
              <span
                className="block h-full rounded-full bg-(--md-sys-color-primary)"
                style={{ width: `${title.progress}%` }}
              />
            </div>
            <p className="text-xs text-(--md-sys-color-on-surface-variant)">
              {title.progress > 0 ? `${title.progress}% assistido` : 'Ainda nao iniciado'}
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {related.map((item) => (
          <Link
            key={item.id}
            to={`/dashboard/titulo/${item.id}`}
            className="flex min-h-[140px] flex-col justify-between rounded-[20px] bg-(--md-sys-color-surface-container) p-5 transition hover:bg-(--md-sys-color-outline-variant)"
          >
            <span className="text-xs font-medium text-(--md-sys-color-on-surface-variant)">{item.category}</span>
            <div className="flex items-center justify-between gap-4">
              <h2 className="truncate text-base font-semibold text-(--md-sys-color-on-surface)">{item.title}</h2>
              <span className="material-symbols-rounded text-[22px]! text-(--md-sys-color-primary)">chevron_right</span>
            </div>
          </Link>
        ))}
      </section>
    </section>
  )
}

export default Titulo
