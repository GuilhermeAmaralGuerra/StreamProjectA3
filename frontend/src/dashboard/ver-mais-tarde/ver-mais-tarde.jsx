import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api.js'
import { getUsuarioLogado } from '../../services/auth.js'

function VerMaisTarde() {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()
  const [lista, setLista] = useState([])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  const carregarLista = async () => {
    if (!usuario?.id) {
      setErro('Faca login para ver sua lista.')
      setCarregando(false)
      return
    }

    setErro('')
    setCarregando(true)

    try {
      const data = await apiRequest(`/usuarios/${usuario.id}/ver-mais-tarde`)
      setLista(data)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarLista()
  }, [])

  const removerItem = async (conteudoId) => {
    if (!usuario?.id) return

    setErro('')

    try {
      const data = await apiRequest(`/usuarios/${usuario.id}/ver-mais-tarde/${conteudoId}`, {
        method: 'DELETE'
      })
      setLista(data)
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
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Ver mais tarde</h1>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">Titulos salvos para assistir depois, quando quiser.</p>
        </div>
        <span className="rounded-full bg-(--md-sys-color-outline-variant) px-4 py-2 text-sm text-(--md-sys-color-on-surface)">
          {lista.length} itens
        </span>
      </header>

      {erro && <p className="text-sm text-red-300">{erro}</p>}
      {carregando && <p className="text-sm text-(--md-sys-color-on-surface-variant)">Carregando lista...</p>}

      {!carregando && lista.length === 0 && !erro && (
        <p className="text-sm text-(--md-sys-color-on-surface-variant)">Voce ainda nao salvou nada para ver mais tarde.</p>
      )}

      <div className="grid auto-rows-[116px] gap-4 md:grid-cols-2">
        {lista.map((item) => (
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
                    aria-label={`Remover ${item.titulo} de ver mais tarde`}
                    onClick={() => removerItem(item.id)}
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

export default VerMaisTarde
