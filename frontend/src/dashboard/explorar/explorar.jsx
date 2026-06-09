import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api.js'
import { getUsuarioLogado } from '../../services/auth.js'

function Explorar() {
  const navigate = useNavigate()
  const usuario = getUsuarioLogado()
  const [conteudos, setConteudos] = useState([])
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState(['Todos'])
  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(true)

  const carregarConteudos = async ({ termo = busca, categoria = categoriaAtiva } = {}) => {
    setErro('')
    setMensagem('')
    setCarregando(true)

    try {
      const params = new URLSearchParams()
      if (termo.trim()) params.set('busca', termo.trim())
      if (categoria !== 'Todos') params.set('categoria', categoria)

      const query = params.toString() ? `?${params.toString()}` : ''
      const data = await apiRequest(`/conteudos${query}`)

      if (!termo.trim() && categoria === 'Todos') {
        const categorias = data.map((item) => item.categoria).filter(Boolean)
        setCategoriasDisponiveis(['Todos', ...new Set(categorias)])
      }

      setConteudos(data)
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarConteudos({ termo: '', categoria: 'Todos' })
  }, [])

  const handleBusca = (e) => {
    e.preventDefault()
    carregarConteudos()
  }

  const selecionarCategoria = (categoria) => {
    setCategoriaAtiva(categoria)
    carregarConteudos({ categoria })
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

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex flex-col gap-3">
        <form onSubmit={handleBusca} className="flex h-11 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) px-6">
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Buscar conteudo"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit" aria-label="Buscar conteudo" className="flex items-center justify-center text-(--md-sys-color-on-surface-variant)">
            <span className="material-symbols-rounded text-[18px]!">search</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {categoriasDisponiveis.map((category) => {
            const active = category === categoriaAtiva

            return (
              <button
                key={category}
                type="button"
                onClick={() => selecionarCategoria(category)}
                className={`rounded-full border border-(--md-sys-color-outline-variant) px-4 py-2 text-sm transition ${
                  active
                    ? 'bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)'
                    : 'bg-(--md-sys-color-surface) text-(--md-sys-color-on-surface) hover:bg-(--md-sys-color-surface-container)'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </header>

      {(erro || mensagem) && (
        <p className={`text-sm ${erro ? 'text-red-300' : 'text-green-300'}`}>
          {erro || mensagem}
        </p>
      )}

      {carregando && <p className="text-sm text-(--md-sys-color-on-surface-variant)">Carregando catalogo...</p>}

      {!carregando && conteudos.length === 0 && !erro && (
        <p className="text-sm text-(--md-sys-color-on-surface-variant)">Nenhum conteudo encontrado.</p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {conteudos.map((conteudo) => (
          <article key={conteudo.id} className="rounded-[30px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container) p-5 shadow-sm shadow-(--md-sys-color-shadow/5)">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="rounded-full bg-(--md-sys-color-secondary-container) px-3 py-1 text-xs font-medium text-(--md-sys-color-on-surface)">
                  {conteudo.categoria}
                </span>
                <h2 className="mt-4 truncate text-xl font-semibold text-(--md-sys-color-on-surface)">{conteudo.titulo}</h2>
                <p className="mt-1 text-xs text-(--md-sys-color-on-surface-variant)">{conteudo.tipo}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label={`Assistir ${conteudo.titulo}`}
                  onClick={() => assistirConteudo(conteudo.id)}
                  className="flex p-2 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                </button>

                <button
                  type="button"
                  aria-label={`Favoritar ${conteudo.titulo}`}
                  onClick={() => salvarItem(conteudo.id, 'favoritos')}
                  className="flex p-2 items-center justify-center rounded-full bg-(--md-sys-color-outline-variant) text-(--md-sys-color-on-surface-variant)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">favorite</span>
                </button>

                <button
                  type="button"
                  aria-label={`Salvar ${conteudo.titulo} para ver mais tarde`}
                  onClick={() => salvarItem(conteudo.id, 'ver-mais-tarde')}
                  className="flex p-2 items-center justify-center rounded-full bg-(--md-sys-color-secondary-container) text-(--md-sys-color-on-surface)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">schedule</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-(--md-sys-color-on-surface-variant)">
              {conteudo.descricao}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Explorar
