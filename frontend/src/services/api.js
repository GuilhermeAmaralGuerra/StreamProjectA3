const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function apiRequest(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
  } catch {
    throw new Error('Nao foi possivel conectar com a API. Confira se o backend esta rodando.')
  }

  let data = null

  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.erro || 'Nao foi possivel completar a operacao')
  }

  return data
}
