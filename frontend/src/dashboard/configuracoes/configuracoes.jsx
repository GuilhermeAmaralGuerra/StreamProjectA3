import { useEffect, useState } from 'react'

const sections = [
  'Transmissão e Download',
  'Transmissão',
  'Autoplay',
  'Dispositivos registrados',
  'Notificações',
  'Vídeos ocultos',
  'Assinaturas',
  'Idiomas',
  'Ajuda e Feedback',
  'Termos de Uso',
  'Demais configurações de usuário'
]

function Configuracoes() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoplay, setAutoplay] = useState(false)

  useEffect(() => {
    window.setMaterialTheme?.('green', darkMode ? 'dark' : 'light')
  }, [darkMode])

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

      <section className="grid auto-rows-[96px] gap-5 md:grid-cols-2">
        {sections.map((title) => (
          <div key={title} className="relative min-w-0">
            <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
              <div className="h-8"></div>

              <div className="relative flex flex-1 items-center gap-2.5 justify-between py-3 px-4">
                <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{title}</p>

                <button
                  type="button"
                  aria-label={`Abrir ${title}`}
                  className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                </button>
              </div>
            </article>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Configuracoes
