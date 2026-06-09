import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api.js'
import { getUsuarioLogado } from '../../services/auth.js'

function Home() {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()
  const [conteudos, setConteudos] = useState([])
  const [busca, setBusca] = useState('')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(true)

  const destaque = useMemo(() => conteudos.find((item) => item.destaque) || conteudos[0], [conteudos])
  const sugestoes = useMemo(() => conteudos.filter((item) => item.id !== destaque?.id).slice(0, 7), [conteudos, destaque])

  const carregarConteudos = async (termo = '') => {
    setErro('')
    setCarregando(true)

    try {
      const query = termo.trim() ? `?busca=${encodeURIComponent(termo.trim())}` : ''
      const data = await apiRequest(`/conteudos${query}`)
      setConteudos(data)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarConteudos()
  }, [])

  const handleBusca = (e) => {
    e.preventDefault()
    carregarConteudos(busca)
  }

  const salvarItem = async (conteudoId, tipo) => {
    if (!usuario?.id) {
      setErro('Faca login para salvar itens na sua conta.')
      return
    }

    setErro('')
    setMensagem('')

    try {
      const rota = tipo === 'favoritos' ? 'favoritos' : 'ver-mais-tarde'
      await apiRequest(`/usuarios/${usuario.id}/${rota}`, {
        method: 'POST',
        body: JSON.stringify({ conteudoId })
      })
      setMensagem(tipo === 'favoritos' ? 'Adicionado aos favoritos.' : 'Adicionado em ver mais tarde.')
    } catch (error) {
      setErro(error.message)
    }
  }

  const assistirConteudo = (conteudoId) => {
    navigate(`/assistir/${conteudoId}`)
  }

  const renderCard = (conteudo) => (
    <div key={conteudo.id} className="relative min-w-0">
      <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
        <div className="h-43"></div>

        <div className="relative flex flex-1 items-center gap-2.5 justify-between py-4 px-4">
          <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{conteudo.titulo}</p>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              aria-label={`Assistir ${conteudo.titulo}`}
              onClick={() => assistirConteudo(conteudo.id)}
              className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
            >
              <span className="material-symbols-rounded fill text-[17px]!">play_arrow</span>
            </button>

            <button
              type="button"
              aria-label={`Favoritar ${conteudo.titulo}`}
              onClick={() => salvarItem(conteudo.id, 'favoritos')}
              className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-secondary-container) text-(--md-sys-color-on-surface)"
            >
              <span className="material-symbols-rounded fill text-[17px]!">favorite</span>
            </button>

            <button
              type="button"
              aria-label={`Salvar ${conteudo.titulo} para ver mais tarde`}
              onClick={() => salvarItem(conteudo.id, 'ver-mais-tarde')}
              className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
            >
              <span className="material-symbols-rounded fill text-[17px]!">schedule</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  )

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center gap-4">
        <form onSubmit={handleBusca} className="flex h-11 flex-1 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) py-4 px-6">
          <input
            className="w-full bg-transparent text-sm"
            placeholder="Pesquise"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit" aria-label="Pesquisar" className="flex items-center justify-center text-(--md-sys-color-on-surface-variant)">
            <span className="material-symbols-rounded text-[18px]!">search</span>
          </button>
        </form>

        <button
          type="button"
          className="flex h-11 w-11 items-center border-3 border-(--md-sys-color-surface-container) justify-center rounded-full bg-(--md-sys-color-outline-variant) text-sm font-semibold text-(--md-sys-color-on-surface)"
        >
          {(usuario?.nome || 'P').charAt(0).toUpperCase()}
        </button>
      </header>

      {(erro || mensagem) && (
        <p className={`text-sm ${erro ? 'text-red-300' : 'text-green-300'}`}>
          {erro || mensagem}
        </p>
      )}

      {carregando && <p className="text-sm text-(--md-sys-color-on-surface-variant)">Carregando conteudos...</p>}

      {!carregando && !destaque && (
        <p className="text-sm text-(--md-sys-color-on-surface-variant)">Nenhum conteudo encontrado.</p>
      )}

      {!carregando && destaque && (
        <div className="flex flex-col gap-8.5">
          <article className="flex flex-col overflow-hidden rounded-t-[30px]">
            <div className="flex flex-1 items-stretch justify-between">
              <div className="flex w-[40%] flex-col gap-4.5 justify-end p-10">
                <div className="flex flex-col gap-2.5">
                  <h1 className="text-[20px] leading-none text-(--md-sys-color-on-surface)">{destaque.titulo}</h1>
                  <p className="text-sm leading-[1.9] text-(--md-sys-color-on-surface-variant)">
                    {destaque.descricao}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => assistirConteudo(destaque.id)}
                    className="flex px-4 py-2.5 cursor-pointer items-center gap-2 rounded-full bg-(--md-sys-color-primary) text-[14px] font-medium text-(--md-sys-color-on-primary)"
                  >
                    <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
                    Assistir agora
                  </button>

                  <button
                    type="button"
                    aria-label={`Favoritar ${destaque.titulo}`}
                    onClick={() => salvarItem(destaque.id, 'favoritos')}
                    className="flex p-2.5 cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) text-(--md-sys-color-on-surface-variant)"
                  >
                    <span className="material-symbols-rounded fill text-[20px]!">favorite</span>
                  </button>

                  <button
                    type="button"
                    aria-label={`Salvar ${destaque.titulo} para ver mais tarde`}
                    onClick={() => salvarItem(destaque.id, 'ver-mais-tarde')}
                    className="flex p-2.5 cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) text-(--md-sys-color-on-surface-variant)"
                  >
                    <span className="material-symbols-rounded fill text-[20px]!">schedule</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-end justify-between p-6">
                <span className="flex h-10 items-center gap-1.25 rounded-full bg-(--md-sys-color-secondary-container) px-4 text-sm font-medium text-(--md-sys-color-on-surface)">
                  <span className="material-symbols-rounded fill text-[20px]!">local_fire_department</span>
                  Em alta
                </span>

                <button
                  type="button"
                  className="flex p-1 cursor-pointer items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) text-(--md-sys-color-on-surface-variant)"
                >
                  <span className="material-symbols-rounded fill text-[30px]!">stop</span>
                </button>
              </div>
            </div>

            <div className="flex h-1.25 gap-1 items-stretch bg-(--md-sys-color-surface-container)">
              <span className="h-full rounded-full w-[38%] bg-(--md-sys-color-primary)"></span>
              <span className="h-full rounded-full flex-1 bg-(--md-sys-color-secondary-container)"></span>
            </div>
          </article>

          <section className="flex flex-col gap-5">
            <h2 className="text-[18px] font-medium leading-none text-(--md-sys-color-on-surface)">Voce pode gostar:</h2>

            <div className="h-57.5 grow-0 self-stretch grid grid-cols-7 grid-rows-1 gap-x-4.5 gap-y-4.5 p-0">
              {sugestoes.map(renderCard)}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Home
