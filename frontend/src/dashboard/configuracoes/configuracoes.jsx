import { useEffect, useState } from 'react'

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

function Configuracoes() {
  const [themeMode, setThemeMode] = useState('dark')
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [hideWatched, setHideWatched] = useState(false)

  useEffect(() => {
    const applyTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const nextMode = themeMode === 'system' ? (prefersDark ? 'dark' : 'light') : themeMode

      window.setMaterialTheme?.('green', nextMode)
    }

    applyTheme()

    if (themeMode !== 'system') return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', applyTheme)

    return () => media.removeEventListener('change', applyTheme)
  }, [themeMode])

  return (
    <section className="flex h-full min-h-0 flex-col gap-7 px-5 py-3.5">
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
        <section className="grid grid-cols-[minmax(0,1fr)_116px] items-center gap-x-8 gap-y-4">
          <h1 className="col-span-2 text-lg font-medium leading-none text-(--md-sys-color-secondary)">
            Apar&ecirc;ncia:
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">Tema</h2>
            <p className="text-sm leading-none text-(--md-sys-color-on-surface-variant)">
              Selecione claro, escuro ou autom&aacute;tico.
            </p>
          </div>

          <select
            value={themeMode}
            onChange={(event) => setThemeMode(event.target.value)}
            className="h-11 w-full rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface) px-3 text-sm text-(--md-sys-color-on-surface)"
          >
            <option value="dark">Escuro</option>
            <option value="light">Claro</option>
            <option value="system">Autom&aacute;tico</option>
          </select>

          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">Cor do tema</h2>
            <p className="text-sm leading-none text-(--md-sys-color-on-surface-variant)">
              Escolha a cor principal da interface do site.
            </p>
          </div>

          <button
            type="button"
            aria-label="Cor do tema verde"
            className="flex h-11 w-full items-center justify-between rounded border border-(--md-sys-color-outline) bg-(--md-sys-color-surface) px-3 text-sm text-(--md-sys-color-on-surface)"
          >
            Verde
            <span className="h-4 w-4 rounded-full bg-(--md-sys-color-primary)" />
          </button>
        </section>

        <section className="grid grid-cols-[minmax(0,1fr)_116px] items-center gap-x-8 gap-y-5">
          <h1 className="col-span-2 text-lg font-medium leading-none text-(--md-sys-color-secondary)">
            Prefer&ecirc;ncias:
          </h1>

          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">
              Mostrar apenas conte&uacute;do dispon&iacute;vel
            </h2>
            <p className="text-sm leading-none text-(--md-sys-color-on-surface-variant)">
              Oculta t&iacute;tulos para aluguel, compra ou dispon&iacute;veis apenas em outros servi&ccedil;os.
            </p>
          </div>

          <div className="flex justify-end">
            <Toggle
              checked={onlyAvailable}
              label="Mostrar apenas conteudo disponivel"
              onChange={() => setOnlyAvailable((current) => !current)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-base font-medium leading-none text-(--md-sys-color-on-surface)">Esconder j&aacute; assistidos</h2>
            <p className="text-sm leading-none text-(--md-sys-color-on-surface-variant)">
              Remover da navega&ccedil;&atilde;o t&iacute;tulos conclu&iacute;dos.
            </p>
          </div>

          <div className="flex justify-end">
            <Toggle
              checked={hideWatched}
              label="Esconder ja assistidos"
              onChange={() => setHideWatched((current) => !current)}
            />
          </div>
        </section>
      </div>
    </section>
  )
}

export default Configuracoes
