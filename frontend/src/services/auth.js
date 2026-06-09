export function getUsuarioLogado() {
  const storedUser = localStorage.getItem('usuarioLogado')

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('usuarioLogado')
    return null
  }
}
