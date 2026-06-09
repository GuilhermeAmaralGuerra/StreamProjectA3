import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../services/api.js'
import { getUsuarioLogado } from '../services/auth.js'

function Player() {
  const navigate = useNavigate()
  const { conteudoId } = useParams()
  const usuario = getUsuarioLogado()
  const [conteudo, setConteudo] = useState(null)

  useEffect(() => {
    async function carregarConteudo() {
      try {
        const data = await apiRequest(`/conteudos/${conteudoId}`)
        setConteudo(data)

        if (usuario?.id) {
          await apiRequest(`/usuarios/${usuario.id}/historico`, {
            method: 'POST',
            body: JSON.stringify({
              conteudoId,
              progresso: 8
            })
          })
        }
      } catch {
        setConteudo(null)
      }
    }

    carregarConteudo()
  }, [conteudoId, usuario?.id])

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <img
        src="/player-screen.png"
        alt="Tela de reproducao do filme"
        className="h-screen w-screen object-contain"
      />

      <div className="absolute left-6 top-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
          aria-label="Voltar para o dashboard"
        >
          <span className="material-symbols-rounded text-[24px]!">arrow_back</span>
        </button>

        {conteudo && (
          <div className="rounded-full bg-black/55 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            {conteudo.titulo}
          </div>
        )}
      </div>
    </main>
  )
}

export default Player
