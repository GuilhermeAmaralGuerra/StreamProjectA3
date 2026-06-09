import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api.js'
import { getUsuarioLogado } from '../../services/auth.js'

function Favoritos() {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()
  const [favoritos, setFavoritos] = useState([])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  const carregarFavoritos = async () => {
    if (!usuario?.id) {
      setErro('Faca login para ver seus favoritos.')
      setCarregando(false)
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const data = await apiRequest(`/usuarios/${usuario.id}/favoritos`)
      setFavoritos(data)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarFavoritos()
  }, [])

  const removerFavorito = async (conteudoId) => {
    if (!usuario?.id) return

    setErro('')

    try {
      const data = await apiRequest(`/usuarios/${usuario.id}/favoritos/${conteudoId}`, {
        method: 'DELETE'
      })
      setFavoritos(data)
    } catch (error) {
      setErro(error.message)
    }
  }

  const assistirConteudo = (conteudoId) => {
    navigate(`/assistir/${conteudoId}`)
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Favoritos</h1>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">Acessar rapidamente os titulos que voce curtiu.</p>
        </div>
        <span className="rounded-full bg-(--md-sys-color-secondary-container) px-4 py-2 text-sm font-medium text-(--md-sys-color-on-surface)">{favoritos.length} itens</span>
      </header>

      {erro && <p className="text-sm text-red-300">{erro}</p>}
      {carregando && <p className="text-sm text-(--md-sys-color-on-surface-variant)">Carregando favoritos...</p>}

      {!carregando && favoritos.length === 0 && !erro && (
        <p className="text-sm text-(--md-sys-color-on-surface-variant)">Voce ainda nao favoritou nenhum conteudo.</p>
      )}

      <div className="grid auto-rows-[116px] gap-4 md:grid-cols-2">
        {favoritos.map((item) => (
          <div key={item.id} className="relative min-w-0">
            <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
              <div className="h-8"></div>

              <div className="relative flex flex-1 items-center gap-2.5 justify-between py-3 px-4">
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{item.titulo}</p>
                  <p className="truncate text-xs text-(--md-sys-color-on-surface-variant)">{item.categoria}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Assistir ${item.titulo}`}
                    onClick={() => assistirConteudo(item.id)}
                    className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                  >
                    <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                  </button>

                  <button
                    type="button"
                    aria-label={`Remover ${item.titulo} dos favoritos`}
                    onClick={() => removerFavorito(item.id)}
                    className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-surface-container) text-(--md-sys-color-on-surface-variant)"
                  >
                    <span className="material-symbols-rounded fill text-[18px]!">delete</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Favoritos
