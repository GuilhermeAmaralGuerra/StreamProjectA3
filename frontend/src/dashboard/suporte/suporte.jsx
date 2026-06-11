function Suporte() {
  const topics = [
    {
      icon: 'lock_reset',
      title: 'Acesso a conta',
      description: 'Ajuda para login, senha, cadastro e dados do perfil.',
    },
    {
      icon: 'subscriptions',
      title: 'Assinatura',
      description: 'Informacoes sobre planos, pagamento e renovacao.',
    },
    {
      icon: 'smart_display',
      title: 'Reproducao',
      description: 'Solucoes para travamentos, audio, legenda e qualidade.',
    },
  ]

  return (
    <section className="flex h-full min-h-0 flex-col gap-7 overflow-y-auto px-5 py-3.5">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-(--md-sys-color-on-surface)">Suporte</h1>
          <p className="max-w-2xl text-sm leading-6 text-(--md-sys-color-on-surface-variant)">
            Encontre ajuda rapida para problemas comuns ou envie uma mensagem para a equipe do AssinaVideo.
          </p>
        </div>
        <span className="material-symbols-rounded fill rounded-full bg-(--md-sys-color-secondary-container) p-3 text-[28px]! text-(--md-sys-color-primary)">
          support_agent
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {topics.map((topic) => (
          <article key={topic.title} className="flex min-h-[170px] flex-col justify-between rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
            <span className="material-symbols-rounded text-[28px]! text-(--md-sys-color-primary)">{topic.icon}</span>
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold text-(--md-sys-color-on-surface)">{topic.title}</h2>
              <p className="text-sm leading-6 text-(--md-sys-color-on-surface-variant)">{topic.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-[minmax(0,1fr)_320px]">
        <form className="flex flex-col gap-4 rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
          <h2 className="text-lg font-semibold text-(--md-sys-color-on-surface)">Enviar mensagem</h2>
          <input
            className="h-11 rounded border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) px-4 text-sm text-(--md-sys-color-on-surface)"
            placeholder="Seu email"
            type="email"
          />
          <select className="h-11 rounded border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) px-4 text-sm text-(--md-sys-color-on-surface)">
            <option>Problema de acesso</option>
            <option>Problema na reproducao</option>
            <option>Duvida sobre assinatura</option>
            <option>Outro assunto</option>
          </select>
          <textarea
            className="min-h-32 resize-none rounded border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface) p-4 text-sm text-(--md-sys-color-on-surface)"
            placeholder="Descreva o problema"
          />
          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-full bg-(--md-sys-color-primary) px-5 py-2.5 text-sm font-medium text-(--md-sys-color-on-primary)"
          >
            <span className="material-symbols-rounded text-[20px]!">send</span>
            Enviar
          </button>
        </form>

        <aside className="flex flex-col gap-4 rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
          <h2 className="text-lg font-semibold text-(--md-sys-color-on-surface)">Atendimento rapido</h2>
          <p className="text-sm leading-6 text-(--md-sys-color-on-surface-variant)">
            Para uma apresentacao academica, este formulario pode simular abertura de chamados. Depois, ele pode ser ligado ao backend.
          </p>
          <div className="flex flex-col gap-2 text-sm text-(--md-sys-color-on-surface-variant)">
            <span>Tempo medio: 5 minutos</span>
            <span>Status: online</span>
            <span>Canal: chat ou email</span>
          </div>
        </aside>
      </section>
    </section>
  )
}

export default Suporte
