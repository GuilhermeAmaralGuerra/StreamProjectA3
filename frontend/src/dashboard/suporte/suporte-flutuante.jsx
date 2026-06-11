import { Link } from 'react-router-dom'

function SuporteFlutuante() {
  return (
    <Link
      to="/dashboard/suporte"
      aria-label="Abrir suporte"
      className="fixed bottom-8 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) shadow-lg shadow-black/20 transition hover:scale-105"
      title="Suporte"
    >
      <span className="material-symbols-rounded fill text-[28px]!">support_agent</span>
    </Link>
  )
}

export default SuporteFlutuante
