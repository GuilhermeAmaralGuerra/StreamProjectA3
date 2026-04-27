function Home() {
  const suggestions = [
    'Chernobil',
    'The Boys',
    'Fullmetal Alchemist',
    'Cosmos',
    'Breaking Bad',
    'The Office',
    'Better Call Saul'
  ]

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 px-5 py-3.5">
      <header className="flex items-center gap-4">
        <div className="flex h-11 flex-1 items-center justify-between rounded-full bg-(--md-sys-color-surface-container) py-4 px-6">
          <input className="text-sm" placeholder="Pesquise" type="text" />
          <span className="material-symbols-rounded text-[18px]! text-(--md-sys-color-on-surface-variant)">search</span>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center border-3 border-(--md-sys-color-surface-container) justify-center rounded-full bg-(--md-sys-color-outline-variant) text-sm font-semibold text-(--md-sys-color-on-surface)"
        >
          P
        </button>
      </header>

      <div className="flex flex-col gap-8.5">
        <article className="flex flex-col overflow-hidden rounded-t-[30px]">
          <div className="flex flex-1 items-stretch justify-between">
            <div className="flex w-[40%] flex-col gap-4.5 justify-end p-10">
              <div className="flex flex-col gap-2.5">
                <h1 className="text-[20px] leading-none text-(--md-sys-color-on-surface)">Ruptura</h1>
                <p className="text-sm leading-[1.9] text-(--md-sys-color-on-surface-variant)">
                  Em Ruptura, funcionários têm suas memórias pessoais e profissionais separadas; Mark começa a
                  suspeitar da empresa ao ser alertado por um colega sobre segredos ocultos.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="flex px-4 py-2.5 cursor-pointer items-center gap-2 rounded-full bg-(--md-sys-color-primary) text-[14px] font-medium text-(--md-sys-color-on-primary)"
                >
                  <span className="material-symbols-rounded fill text-[20px]!">play_arrow</span>
                  Assistir agora
                </button>

                <button
                  type="button"
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
          <h2 className="text-[18px] font-medium leading-none text-(--md-sys-color-on-surface)">Você pode gostar:</h2>

          <div className="h-57.5 grow-0 self-stretch grid grid-cols-7 grid-rows-1 gap-x-4.5 gap-y-4.5 p-0">
            {suggestions.map((title) => (
              <div key={title} className="relative min-w-0">
                <article className="absolute inset-0 flex min-w-0 flex-col overflow-hidden rounded-[20px] bg-(--md-sys-color-outline-variant)">
                  <div className="h-45"></div>

                  <div className="relative flex flex-1 items-center gap-2.5 justify-between py-5 px-4">
                    <p className="truncate text-[14px] font-semibold text-(--md-sys-color-on-surface)">{title}</p>

                    <button
                      type="button"
                      className="flex p-1.25 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)"
                    >
                      <span className="material-symbols-rounded fill text-[18px]!">play_arrow</span>
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Home
