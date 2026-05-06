import { useState } from 'react'

function Configuracoes() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoplay, setAutoplay] = useState(false)

  const sections = [
    {
      title: 'Transmissão e Download',
      description: 'Configure streaming de vídeo e downloads para assistir offline.',
      details: 'Ajuste qualidade de transmissão, permissões de download e uso de dados móveis.'
    },
    {
      title: 'Transmissão',
      description: 'Gerencie serviços de streaming, encode e preferências de performance.',
      details: 'Habilite aceleração de hardware, limite de taxa de bits e resolução padrão.'
    },
    {
      title: 'Autoplay',
      description: 'Controle a reprodução automática entre vídeos e sugestões relacionadas.',
      details: 'Escolha se o próximo vídeo inicia automaticamente após o término da reprodução.'
    },
    {
      title: 'Dispositivos registrados',
      description: 'Veja e gerencie todos os dispositivos conectados à sua conta.',
      details: 'Remova dispositivos desativados ou autorize novos acessos com facilidade.'
    },
    {
      title: 'Notificações',
      description: 'Defina quais alertas você deseja receber do aplicativo.',
      details: 'Ative emails, push e lembretes para novos episódios e mensagens importantes.'
    },
    {
      title: 'Vídeos ocultos',
      description: 'Gerencie a lista de vídeos que você ocultou da sua biblioteca.',
      details: 'Reveja, restaure ou exclua vídeos ocultos para manter seu feed limpo.'
    },
    {
      title: 'Assinaturas',
      description: 'Controle seus planos, renovações e benefícios de assinante.',
      details: 'Atualize seu plano, veja histórico de pagamentos e ofertas ativas.'
    },
    {
      title: 'Idiomas',
      description: 'Ajuste o idioma da interface e das legendas dos vídeos.',
      details: 'Defina o idioma principal do aplicativo e preferências de legenda.'
    },
    {
      title: 'Ajuda e Feedback',
      description: 'Acesse suporte e envie sugestões para melhorar o aplicativo.',
      details: 'Envie comentários, reporte problemas ou consulte a documentação de ajuda.'
    },
    {
      title: 'Termos de Uso',
      description: 'Leia as políticas e regras de uso do serviço.',
      details: 'Atualize-se sobre privacidade, direitos autorais e responsabilidades do usuário.'
    },
    {
      title: 'Demais configurações de usuário',
      description: 'Personalize definições gerais da sua conta e experiência de uso.',
      details: 'Gerencie preferências de acessibilidade, conta e opções avançadas.'
    }
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container) p-8 shadow-md shadow-(--md-sys-color-shadow/10)">
        <header className="mb-6 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Configurações</h1>
          <p className="text-sm text-(--md-sys-color-on-surface-variant)">
            Ajuste suas preferências e controle como o serviço funciona para você.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-(--md-sys-color-on-surface)">Notificações</h2>
                <p className="text-sm text-(--md-sys-color-on-surface-variant)">Receba alertas sobre novos lançamentos e recomendações.</p>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-full bg-(--md-sys-color-surface-container-high) p-2">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications((prev) => !prev)}
                  className="h-5 w-5 rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface)"
                />
                <span className="text-sm text-(--md-sys-color-on-surface)">{notifications ? 'Ativo' : 'Desativado'}</span>
              </label>
            </div>
          </article>

          <article className="rounded-3xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-(--md-sys-color-on-surface)">Tema escuro</h2>
                <p className="text-sm text-(--md-sys-color-on-surface-variant)">Ative o modo escuro para a interface.</p>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-full bg-(--md-sys-color-surface-container-high) p-2">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                  className="h-5 w-5 rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface)"
                />
                <span className="text-sm text-(--md-sys-color-on-surface)">{darkMode ? 'Ativo' : 'Desativado'}</span>
              </label>
            </div>
          </article>

          <article className="rounded-3xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-(--md-sys-color-on-surface)">Reprodução automática</h2>
                <p className="text-sm text-(--md-sys-color-on-surface-variant)">Continue automaticamente para o próximo vídeo ao terminar.</p>
              </div>
              <label className="flex cursor-pointer items-center gap-3 rounded-full bg-(--md-sys-color-surface-container-high) p-2">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={() => setAutoplay((prev) => !prev)}
                  className="h-5 w-5 rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface)"
                />
                <span className="text-sm text-(--md-sys-color-on-surface)">{autoplay ? 'Ativo' : 'Desativado'}</span>
              </label>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="relative min-w-0">
            <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
              <div className="relative h-44 overflow-hidden bg-(--md-sys-color-surface-container)">
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="rounded-full bg-(--md-sys-color-secondary-container) px-3 py-1 text-xs font-medium text-(--md-sys-color-on-surface)">Filme</span>
                  <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)">
                    <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="truncate text-lg font-semibold text-(--md-sys-color-on-surface)">{section.title}</p>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <p className="text-sm leading-6 text-(--md-sys-color-on-surface-variant)">{section.description}</p>
                </div>
                <p className="text-sm leading-6 text-(--md-sys-color-on-surface)">{section.details}</p>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Configuracoes
