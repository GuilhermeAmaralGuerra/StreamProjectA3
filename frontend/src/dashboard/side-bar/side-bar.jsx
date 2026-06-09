import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api.js'
import { getUsuarioLogado } from '../../services/auth.js'

function SideBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()
  const [historico, setHistorico] = useState([])
  const [carregandoHistorico, setCarregandoHistorico] = useState(false)

  useEffect(() => {
    let ativo = true

    async function carregarHistorico() {
      if (!usuario?.id) return

      setCarregandoHistorico(true)

      try {
        const data = await apiRequest(`/usuarios/${usuario.id}/historico`)
        if (ativo) setHistorico(data)
      } catch {
        if (ativo) setHistorico([])
      } finally {
        if (ativo) setCarregandoHistorico(false)
      }
    }

    carregarHistorico()

    return () => {
      ativo = false
    }
  }, [usuario?.id])

  const ultimoAssistido = historico[0]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado')
  }

  const navItemClass = (path) =>
    `flex h-12 items-center gap-3 rounded-2xl px-4 transition-colors ${isActive(path)
      ? 'bg-(--md-sys-color-secondary-container) text-(--md-sys-color-secondary)'
      : 'text-(--md-sys-color-secondary) hover:bg-(--md-sys-color-surface-container-high)'
    }`

  const iconClass = (path) =>
    `material-symbols-rounded text-[22px]! ${isActive(path) ? 'fill text-(--md-sys-color-on-secondary-container)' : 'text-(--md-sys-color-on-surface-variant)'
    }`

  return (
    <aside className="flex h-full w-[320px] flex-col justify-between rounded-t-[30px] bg-(--md-sys-color-surface-container) px-5 py-10 text-(--md-sys-color-on-surface-variant)">
      <nav className="flex flex-col gap-2.5">
        {usuario && (
          <section className="mb-5 rounded-3xl bg-(--md-sys-color-surface) p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-sm font-semibold text-(--md-sys-color-on-primary)">
                {usuario.nome.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-(--md-sys-color-on-surface)">{usuario.nome}</p>
                <p className="truncate text-xs text-(--md-sys-color-on-surface-variant)">{usuario.email}</p>
              </div>
            </div>
          </section>
        )}

        <Link to="/dashboard" className={navItemClass('/dashboard')}>
          <span className={iconClass('/dashboard')}>home</span>
          <span className="text-sm font-medium">Home</span>
        </Link>

        <Link to="/dashboard/explorar" className={navItemClass('/dashboard/explorar')}>
          <span className={iconClass('/dashboard/explorar')}>explore</span>
          <span className="text-sm font-medium">Explorar</span>
        </Link>

        <Link to="/dashboard/favoritos" className={navItemClass('/dashboard/favoritos')}>
          <span className={iconClass('/dashboard/favoritos')}>favorite</span>
          <span className="text-sm font-medium">Favoritos</span>
        </Link>

        <Link to="/dashboard/ver-mais-tarde" className={navItemClass('/dashboard/ver-mais-tarde')}>
          <span className={iconClass('/dashboard/ver-mais-tarde')}>schedule</span>
          <span className="text-sm font-medium">Ver mais tarde</span>
        </Link>

        <div className="mx-0 h-px bg-(--md-sys-color-outline-variant)"></div>

        <Link to="/dashboard/configuracoes" className={navItemClass('/dashboard/configuracoes')}>
          <span className={iconClass('/dashboard/configuracoes')}>settings</span>
          <span className="text-sm font-medium">Configuracoes</span>
        </Link>

        <Link to="/login" onClick={handleLogout} className="flex h-12 items-center gap-3 rounded-2xl px-4 text-red-400 transition-colors hover:bg-red-500/10">
          <span className="material-symbols-rounded text-[22px]!">logout</span>
          <span className="text-sm font-medium">Sair</span>
        </Link>
      </nav>

      <section className="flex flex-col gap-5">
        <h2 className="text-sm font-medium text-(--md-sys-color-on-surface)">
          Continue assistindo:
        </h2>

        {carregandoHistorico && (
          <p className="text-xs text-(--md-sys-color-on-surface-variant)">Carregando historico...</p>
        )}

        {!carregandoHistorico && !ultimoAssistido && (
          <p className="text-xs leading-5 text-(--md-sys-color-on-surface-variant)">
            Clique em assistir para iniciar seu historico.
          </p>
        )}

        {!carregandoHistorico && ultimoAssistido && (
          <article className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-14.5 w-12.5 shrink-0 rounded-xl bg-(--md-sys-color-outline-variant)"></div>

              <div className="flex min-w-0 flex-col gap-2">
                <p className="truncate text-sm text-(--md-sys-color-on-surface)">
                  {ultimoAssistido.titulo}
                </p>
                <p className="text-xs text-(--md-sys-color-on-surface-variant)">
                  {ultimoAssistido.progresso}% assistido
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/assistir/${ultimoAssistido.id}`)}
              className="flex cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) p-1.25 text-(--md-sys-color-on-surface-variant)"
            >
              <span className="material-symbols-rounded fill text-[20px]!">
                play_arrow
              </span>
            </button>
          </article>
        )}
      </section>
    </aside>
  )
}

export default SideBar
