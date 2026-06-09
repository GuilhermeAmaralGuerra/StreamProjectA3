const express = require('express')
const cors = require('cors')
const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const app = express()
const PORT = process.env.PORT || 3000
const DATA_DIR = path.join(__dirname, 'data')
const DB_PATH = path.join(DATA_DIR, 'db.json')

app.use(cors())
app.use(express.json())

const initialDb = {
  usuarios: [],
  favoritos: [],
  verMaisTarde: [],
  historico: [],
  conteudos: [
    {
      id: 'ruptura',
      titulo: 'Ruptura',
      tipo: 'Serie',
      categoria: 'Drama',
      destaque: true,
      descricao: 'Funcionarios tem suas memorias pessoais e profissionais separadas, ate Mark suspeitar dos segredos da empresa.'
    },
    {
      id: 'the-boys',
      titulo: 'The Boys',
      tipo: 'Serie',
      categoria: 'Acao',
      destaque: false,
      descricao: 'Um grupo tenta expor a verdade por tras de super-herois poderosos e irresponsaveis.'
    },
    {
      id: 'breaking-bad',
      titulo: 'Breaking Bad',
      tipo: 'Serie',
      categoria: 'Crime',
      destaque: false,
      descricao: 'Um professor de quimica muda completamente de vida apos descobrir uma doenca grave.'
    },
    {
      id: 'better-call-saul',
      titulo: 'Better Call Saul',
      tipo: 'Serie',
      categoria: 'Crime',
      destaque: false,
      descricao: 'A historia de origem do advogado Jimmy McGill antes de se tornar Saul Goodman.'
    },
    {
      id: 'the-office',
      titulo: 'The Office',
      tipo: 'Serie',
      categoria: 'Comedia',
      destaque: false,
      descricao: 'O cotidiano de funcionarios de um escritorio contado em estilo documentario.'
    },
    {
      id: 'cosmos',
      titulo: 'Cosmos',
      tipo: 'Documentario',
      categoria: 'Ciencia',
      destaque: false,
      descricao: 'Uma viagem por temas de astronomia, ciencia e historia do universo.'
    },
    {
      id: 'fullmetal-alchemist',
      titulo: 'Fullmetal Alchemist',
      tipo: 'Anime',
      categoria: 'Animacao',
      destaque: false,
      descricao: 'Dois irmaos alquimistas buscam recuperar aquilo que perderam em uma tentativa proibida.'
    },
    {
      id: 'chernobyl',
      titulo: 'Chernobyl',
      tipo: 'Minisserie',
      categoria: 'Drama',
      destaque: false,
      descricao: 'A dramatizacao do desastre nuclear e das pessoas envolvidas na resposta a crise.'
    }
  ]
}

async function ensureDatabase() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(DB_PATH)
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify(initialDb, null, 2))
  }
}

async function readDb() {
  await ensureDatabase()
  const content = await fs.readFile(DB_PATH, 'utf-8')
  const db = JSON.parse(content.replace(/^\uFEFF/, ''))

  return {
    ...db,
    usuarios: Array.isArray(db.usuarios) ? db.usuarios : [],
    favoritos: Array.isArray(db.favoritos) ? db.favoritos : [],
    verMaisTarde: Array.isArray(db.verMaisTarde) ? db.verMaisTarde : [],
    historico: Array.isArray(db.historico) ? db.historico : [],
    conteudos: Array.isArray(db.conteudos) ? db.conteudos : initialDb.conteudos
  }
}

async function writeDb(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
}

function publicUser(user) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    criadoEm: user.criadoEm
  }
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

function passwordMatches(password, storedPassword) {
  const [salt, originalHash] = String(storedPassword || '').split(':')
  if (!salt || !originalHash) return false

  const testHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(testHash, 'hex'))
}

function getUserItems(db, collectionName, usuarioId) {
  const ids = db[collectionName]
    .filter((item) => item.usuarioId === usuarioId)
    .map((item) => item.conteudoId)

  return db.conteudos.filter((conteudo) => ids.includes(conteudo.id))
}

function getUserHistory(db, usuarioId) {
  return db.historico
    .filter((item) => item.usuarioId === usuarioId)
    .sort((a, b) => new Date(b.atualizadoEm) - new Date(a.atualizadoEm))
    .map((item) => {
      const conteudo = db.conteudos.find((content) => content.id === item.conteudoId)
      if (!conteudo) return null

      return {
        ...conteudo,
        progresso: item.progresso,
        assistidoEm: item.atualizadoEm
      }
    })
    .filter(Boolean)
}

function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

app.get('/', (req, res) => {
  res.json({
    status: 'Servidor online',
    rotas: {
      saude: '/api/health',
      cadastro: 'POST /api/usuarios',
      login: 'POST /api/login',
      conteudos: 'GET /api/conteudos',
      favoritos: 'GET/POST/DELETE /api/usuarios/:usuarioId/favoritos',
      verMaisTarde: 'GET/POST/DELETE /api/usuarios/:usuarioId/ver-mais-tarde',
      historico: 'GET/POST/DELETE /api/usuarios/:usuarioId/historico'
    }
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mensagem: 'API funcionando',
    data: new Date().toISOString()
  })
})

app.get('/api/conteudos', asyncHandler(async (req, res) => {
  const db = await readDb()
  const busca = String(req.query.busca || '').trim().toLowerCase()
  const categoria = String(req.query.categoria || '').trim().toLowerCase()

  let conteudos = db.conteudos

  if (busca) {
    conteudos = conteudos.filter((conteudo) =>
      conteudo.titulo.toLowerCase().includes(busca) ||
      conteudo.descricao.toLowerCase().includes(busca)
    )
  }

  if (categoria) {
    conteudos = conteudos.filter((conteudo) => conteudo.categoria.toLowerCase() === categoria)
  }

  res.json(conteudos)
}))

app.get('/api/conteudos/:id', asyncHandler(async (req, res) => {
  const db = await readDb()
  const conteudo = db.conteudos.find((item) => item.id === req.params.id)

  if (!conteudo) {
    return res.status(404).json({ erro: 'Conteudo nao encontrado' })
  }

  res.json(conteudo)
}))

app.post('/api/usuarios', asyncHandler(async (req, res) => {
  const nome = String(req.body.nome || req.body.usuario || '').trim()
  const email = normalizeEmail(req.body.email)
  const senha = String(req.body.senha || '')
  const confirmarSenha = String(req.body.confirmarSenha || req.body.confirmacaoSenha || senha)

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios' })
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'A senha precisa ter pelo menos 6 caracteres' })
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({ erro: 'As senhas nao conferem' })
  }

  const db = await readDb()
  const emailJaExiste = db.usuarios.some((user) => user.email === email)

  if (emailJaExiste) {
    return res.status(409).json({ erro: 'Ja existe um usuario com esse email' })
  }

  const user = {
    id: crypto.randomUUID(),
    nome,
    email,
    senhaHash: createPasswordHash(senha),
    criadoEm: new Date().toISOString()
  }

  db.usuarios.push(user)
  await writeDb(db)

  res.status(201).json({
    mensagem: 'Usuario cadastrado com sucesso',
    usuario: publicUser(user)
  })
}))

app.post('/api/login', asyncHandler(async (req, res) => {
  const identificador = normalizeEmail(req.body.email || req.body.usuario)
  const senha = String(req.body.senha || '')

  if (!identificador || !senha) {
    return res.status(400).json({ erro: 'Email/usuario e senha sao obrigatorios' })
  }

  const db = await readDb()
  const user = db.usuarios.find((usuario) =>
    usuario.email === identificador || usuario.nome.toLowerCase() === identificador
  )

  if (!user || !passwordMatches(senha, user.senhaHash)) {
    return res.status(401).json({ erro: 'Login ou senha invalidos' })
  }

  res.json({
    mensagem: 'Login realizado com sucesso',
    usuario: publicUser(user)
  })
}))

app.get('/api/usuarios/:usuarioId/favoritos', asyncHandler(async (req, res) => {
  const db = await readDb()
  res.json(getUserItems(db, 'favoritos', req.params.usuarioId))
}))

app.post('/api/usuarios/:usuarioId/favoritos', asyncHandler(async (req, res) => {
  const db = await readDb()
  const conteudoId = String(req.body.conteudoId || '').trim()
  const userExists = db.usuarios.some((user) => user.id === req.params.usuarioId)
  const contentExists = db.conteudos.some((conteudo) => conteudo.id === conteudoId)

  if (!userExists) return res.status(404).json({ erro: 'Usuario nao encontrado' })
  if (!contentExists) return res.status(404).json({ erro: 'Conteudo nao encontrado' })

  const alreadySaved = db.favoritos.some((item) =>
    item.usuarioId === req.params.usuarioId && item.conteudoId === conteudoId
  )

  if (!alreadySaved) {
    db.favoritos.push({
      usuarioId: req.params.usuarioId,
      conteudoId,
      criadoEm: new Date().toISOString()
    })
    await writeDb(db)
  }

  res.status(201).json(getUserItems(db, 'favoritos', req.params.usuarioId))
}))

app.delete('/api/usuarios/:usuarioId/favoritos/:conteudoId', asyncHandler(async (req, res) => {
  const db = await readDb()

  db.favoritos = db.favoritos.filter((item) =>
    !(item.usuarioId === req.params.usuarioId && item.conteudoId === req.params.conteudoId)
  )

  await writeDb(db)
  res.json(getUserItems(db, 'favoritos', req.params.usuarioId))
}))

app.get('/api/usuarios/:usuarioId/ver-mais-tarde', asyncHandler(async (req, res) => {
  const db = await readDb()
  res.json(getUserItems(db, 'verMaisTarde', req.params.usuarioId))
}))

app.post('/api/usuarios/:usuarioId/ver-mais-tarde', asyncHandler(async (req, res) => {
  const db = await readDb()
  const conteudoId = String(req.body.conteudoId || '').trim()
  const userExists = db.usuarios.some((user) => user.id === req.params.usuarioId)
  const contentExists = db.conteudos.some((conteudo) => conteudo.id === conteudoId)

  if (!userExists) return res.status(404).json({ erro: 'Usuario nao encontrado' })
  if (!contentExists) return res.status(404).json({ erro: 'Conteudo nao encontrado' })

  const alreadySaved = db.verMaisTarde.some((item) =>
    item.usuarioId === req.params.usuarioId && item.conteudoId === conteudoId
  )

  if (!alreadySaved) {
    db.verMaisTarde.push({
      usuarioId: req.params.usuarioId,
      conteudoId,
      criadoEm: new Date().toISOString()
    })
    await writeDb(db)
  }

  res.status(201).json(getUserItems(db, 'verMaisTarde', req.params.usuarioId))
}))

app.delete('/api/usuarios/:usuarioId/ver-mais-tarde/:conteudoId', asyncHandler(async (req, res) => {
  const db = await readDb()

  db.verMaisTarde = db.verMaisTarde.filter((item) =>
    !(item.usuarioId === req.params.usuarioId && item.conteudoId === req.params.conteudoId)
  )

  await writeDb(db)
  res.json(getUserItems(db, 'verMaisTarde', req.params.usuarioId))
}))

app.get('/api/usuarios/:usuarioId/historico', asyncHandler(async (req, res) => {
  const db = await readDb()
  res.json(getUserHistory(db, req.params.usuarioId))
}))

app.post('/api/usuarios/:usuarioId/historico', asyncHandler(async (req, res) => {
  const db = await readDb()
  const conteudoId = String(req.body.conteudoId || '').trim()
  const progresso = Number.isFinite(Number(req.body.progresso)) ? Number(req.body.progresso) : 8
  const userExists = db.usuarios.some((user) => user.id === req.params.usuarioId)
  const contentExists = db.conteudos.some((conteudo) => conteudo.id === conteudoId)

  if (!userExists) return res.status(404).json({ erro: 'Usuario nao encontrado' })
  if (!contentExists) return res.status(404).json({ erro: 'Conteudo nao encontrado' })

  const now = new Date().toISOString()
  const item = db.historico.find((historyItem) =>
    historyItem.usuarioId === req.params.usuarioId && historyItem.conteudoId === conteudoId
  )

  if (item) {
    item.progresso = progresso
    item.atualizadoEm = now
  } else {
    db.historico.push({
      usuarioId: req.params.usuarioId,
      conteudoId,
      progresso,
      criadoEm: now,
      atualizadoEm: now
    })
  }

  await writeDb(db)
  res.status(201).json(getUserHistory(db, req.params.usuarioId))
}))

app.delete('/api/usuarios/:usuarioId/historico/:conteudoId', asyncHandler(async (req, res) => {
  const db = await readDb()

  db.historico = db.historico.filter((item) =>
    !(item.usuarioId === req.params.usuarioId && item.conteudoId === req.params.conteudoId)
  )

  await writeDb(db)
  res.json(getUserHistory(db, req.params.usuarioId))
}))

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota nao encontrada' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ erro: 'Erro interno no servidor' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
