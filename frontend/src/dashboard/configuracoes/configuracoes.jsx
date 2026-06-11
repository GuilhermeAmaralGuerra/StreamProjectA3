import { useEffect, useState } from 'react'

const themeColors = [
  { id: 'green', label: 'Verde', value: '#9ad4a1', description: 'Padrao do AssinaVideo' },
  { id: 'blue', label: 'Azul', value: '#adc6ff', description: 'Visual mais tecnologico' },
  { id: 'purple', label: 'Roxo', value: '#d7baff', description: 'Destaque mais expressivo' },
  { id: 'orange', label: 'Laranja', value: '#ffb95f', description: 'Interface mais quente' },
]

function Toggle({ checked, label, onChange }) {
  return (
    <button
      type="button"
      aria-checked={checked}
      aria-label={label}
      role="switch"
      onClick={onChange}
      className={`relative h-7 w-12 rounded-full border transition-colors ${checked
        ? 'border-(--md-sys-color-primary) bg-(--md-sys-color-primary)'
        : 'border-(--md-sys-color-outline) bg-(--md-sys-color-outline-variant)'
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all ${checked
          ? 'right-1 bg-(--md-sys-color-on-primary)'
          : 'left-1 bg-(--md-sys-color-outline)'
        }`}
      />
    </button>
  )
}

function SettingRow({ title, description, children }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(140px,220px)] items-center gap-x-8 gap-y-3">
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">{title}</h2>
        <p className="text-sm leading-5 text-(--md-sys-color-on-surface-variant)">{description}</p>
      </div>
      <div className="flex justify-end">{children}</div>
    </div>
  )
}

function Configuracoes() {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('assinavideo.theme.mode') || 'dark')
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('assinavideo.theme.color') || 'green')
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [hideWatched, setHideWatched] = useState(false)
  const [autoPlayNext, setAutoPlayNext] = useState(true)
  const [previewOnHover, setPreviewOnHover] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [parentalControl, setParentalControl] = useState(false)
  const [quality, setQuality] = useState('auto')
  const [subtitleLanguage, setSubtitleLanguage] = useState('pt-BR')

  useEffect(() => {
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const nextMode = themeMode === 'system' ? (prefersDark ? 'dark' : 'light') : themeMode

      localStorage.setItem('assinavideo.theme.mode', themeMode)
      localStorage.setItem('assinavideo.theme.color', themeColor)
      window.setMaterialTheme?.(themeColor, nextMode)
    }

    applyTheme()

    if (themeMode !== 'system') return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', applyTheme)

    return () => media.removeEventListener('change', applyTheme)
  }, [themeMode, themeColor])

  return (
    <section className="flex h-full min-h-0 flex-col gap-7 overflow-y-auto px-5 py-3.5">
      <header className="flex items-center gap-4">
        <label className="flex h-11 flex-1 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) px-6">
          <input
            className="w-full bg-transparent text-sm text-(--md-sys-color-on-surface) placeholder:text-(--md-sys-color-on-surface-variant)"
            placeholder="Pesquisar"
            type="text"
          />
          <span className="material-symbols-rounded text-[18px]! text-(--md-sys-color-on-surface-variant)">search</span>
        </label>

        <button
          type="button"
          aria-label="Perfil"
          className="flex h-11 w-11 items-center justify-center rounded-full border-3 border-(--md-sys-color-surface-container) bg-(--md-sys-color-outline-variant) text-sm font-semibold text-(--md-sys-color-on-surface)"
        >
          P
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-7 pr-1">
        <section className="flex flex-col gap-5 rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
          <h1 className="text-lg font-medium leading-none text-(--md-sys-color-secondary)">Aparencia</h1>

          <SettingRow title="Tema" description="Selecione claro, escuro ou automatico pelo sistema.">
            <select
              value={themeMode}
              onChange={(event) => setThemeMode(event.target.value)}
              className="h-11 w-full rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface) px-3 text-sm text-(--md-sys-color-on-surface)"
            >
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
              <option value="system">Automatico</option>
            </select>
          </SettingRow>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">Cor do tema</h2>
              <p className="text-sm leading-5 text-(--md-sys-color-on-surface-variant)">
                O verde continua sendo o padrao, mas a escolha do usuario fica salva no navegador.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {themeColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  aria-pressed={themeColor === color.id}
                  onClick={() => setThemeColor(color.id)}
                  className={`flex min-h-[92px] flex-col justify-between rounded-[16px] border p-3 text-left transition ${themeColor === color.id
                    ? 'border-(--md-sys-color-primary) bg-(--md-sys-color-outline-variant)'
                    : 'border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface)'
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-(--md-sys-color-on-surface)">{color.label}</span>
                    <span className="h-5 w-5 rounded-full border border-white/50" style={{ backgroundColor: color.value }} />
                  </span>
                  <span className="text-xs leading-4 text-(--md-sys-color-on-surface-variant)">{color.description}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
          <h1 className="text-lg font-medium leading-none text-(--md-sys-color-secondary)">Reproducao</h1>

          <SettingRow title="Qualidade padrao" description="Define a qualidade inicial dos videos.">
            <select
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
              className="h-11 w-full rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface) px-3 text-sm text-(--md-sys-color-on-surface)"
            >
              <option value="auto">Automatica</option>
              <option value="1080p">Full HD</option>
              <option value="720p">HD</option>
              <option value="480p">Economia de dados</option>
            </select>
          </SettingRow>

          <SettingRow title="Idioma da legenda" description="Escolha o idioma preferido para legendas.">
            <select
              value={subtitleLanguage}
              onChange={(event) => setSubtitleLanguage(event.target.value)}
              className="h-11 w-full rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface) px-3 text-sm text-(--md-sys-color-on-surface)"
            >
              <option value="pt-BR">Portugues</option>
              <option value="en-US">Ingles</option>
              <option value="es">Espanhol</option>
              <option value="off">Desativada</option>
            </select>
          </SettingRow>

          <SettingRow title="Proximo episodio automatico" description="Inicia o episodio seguinte ao terminar o atual.">
            <Toggle checked={autoPlayNext} label="Proximo episodio automatico" onChange={() => setAutoPlayNext((current) => !current)} />
          </SettingRow>

          <SettingRow title="Previa ao navegar" description="Mostra pequenas previas enquanto explora o catalogo.">
            <Toggle checked={previewOnHover} label="Previa ao navegar" onChange={() => setPreviewOnHover((current) => !current)} />
          </SettingRow>
        </section>

        <section className="flex flex-col gap-5 rounded-[20px] bg-(--md-sys-color-surface-container) p-5">
          <h1 className="text-lg font-medium leading-none text-(--md-sys-color-secondary)">Preferencias</h1>

          <SettingRow title="Mostrar apenas conteudo disponivel" description="Oculta titulos para aluguel, compra ou disponiveis apenas em outros servicos.">
            <Toggle checked={onlyAvailable} label="Mostrar apenas conteudo disponivel" onChange={() => setOnlyAvailable((current) => !current)} />
          </SettingRow>

          <SettingRow title="Esconder ja assistidos" description="Remove da navegacao titulos que ja foram concluidos.">
            <Toggle checked={hideWatched} label="Esconder ja assistidos" onChange={() => setHideWatched((current) => !current)} />
          </SettingRow>

          <SettingRow title="Notificacoes" description="Receba avisos de lancamentos, novidades e recomendacoes.">
            <Toggle checked={notifications} label="Notificacoes" onChange={() => setNotifications((current) => !current)} />
          </SettingRow>

          <SettingRow title="Controle parental" description="Exige PIN para acessar conteudo indicado para maiores.">
            <Toggle checked={parentalControl} label="Controle parental" onChange={() => setParentalControl((current) => !current)} />
          </SettingRow>
        </section>
      </div>
    </section>
  )
}

export default Configuracoes
