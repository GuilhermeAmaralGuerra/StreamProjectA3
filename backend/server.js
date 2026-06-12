const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORTA = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const pastaDados = path.join(__dirname, 'data')
const caminhoBanco = path.join(pastaDados, 'db.json')

// Banco simples em JSON para o trabalho da faculdade.
const bancoInicial = {
  usuarios: [],
  favoritos: [],
  verMaisTarde: [],
  historico: [],
  conteudos: [
    { id: 'ruptura', titulo: 'Ruptura', tipo: 'Serie', categoria: 'Drama', destaque: true, descricao: 'Funcionarios tem suas memorias pessoais e profissionais separadas, ate Mark suspeitar dos segredos da empresa.' },
    { id: 'the-boys', titulo: 'The Boys', tipo: 'Serie', categoria: 'Acao', destaque: false, descricao: 'Um grupo tenta expor a verdade por tras de super-herois poderosos e irresponsaveis.' },
    { id: 'breaking-bad', titulo: 'Breaking Bad', tipo: 'Serie', categoria: 'Crime', destaque: false, descricao: 'Um professor de quimica muda completamente de vida apos descobrir uma doenca grave.' },
    { id: 'better-call-saul', titulo: 'Better Call Saul', tipo: 'Serie', categoria: 'Crime', destaque: false, descricao: 'A historia de origem do advogado Jimmy McGill antes de se tornar Saul Goodman.' },
    { id: 'the-office', titulo: 'The Office', tipo: 'Serie', categoria: 'Comedia', destaque: false, descricao: 'O cotidiano de funcionarios de um escritorio contado em estilo documentario.' },
    { id: 'cosmos', titulo: 'Cosmos', tipo: 'Documentario', categoria: 'Ciencia', destaque: false, descricao: 'Uma viagem por temas de astronomia, ciencia e historia do universo.' },
    { id: 'fullmetal-alchemist', titulo: 'Fullmetal Alchemist', tipo: 'Anime', categoria: 'Animacao', destaque: false, descricao: 'Dois irmaos alquimistas buscam recuperar aquilo que perderam em uma tentativa proibida.' },
    { id: 'chernobyl', titulo: 'Chernobyl', tipo: 'Minisserie', categoria: 'Drama', destaque: false, descricao: 'A dramatizacao do desastre nuclear e das pessoas envolvidas na resposta a crise.' }
  ]
}

function criarBancoSeNaoExistir() {
  if (!fs.existsSync(pastaDados)) {
    fs.mkdirSync(pastaDados)
  }

  if (!fs.existsSync(caminhoBanco)) {
    salvarBanco(bancoInicial)
  }
}

function lerBanco() {
  criarBancoSeNaoExistir()

  const texto = fs.readFileSync(caminhoBanco, 'utf-8')
  const banco = JSON.parse(texto)

  return {
    ...bancoInicial,
    ...banco,
    usuarios: banco.usuarios || [],
    favoritos: banco.favoritos || [],
    verMaisTarde: banco.verMaisTarde || [],
    historico: banco.historico || [],
    conteudos: banco.conteudos || bancoInicial.conteudos
  }
}

function salvarBanco(banco) {
  fs.writeFileSync(caminhoBanco, JSON.stringify(banco, null, 2))
}

function usuarioSemSenha(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    criadoEm: usuario.criadoEm
  }
}

function listarConteudosSalvos(banco, nomeLista, usuarioId) {
  const ids = banco[nomeLista]
    .filter((item) => item.usuarioId === usuarioId)
    .map((item) => item.conteudoId)

  return banco.conteudos.filter((conteudo) => ids.includes(conteudo.id))
}

function salvarConteudoNaLista(banco, nomeLista, usuarioId, conteudoId) {
  conteudoId = String(conteudoId || '').trim()

  const usuarioExiste = banco.usuarios.some((usuario) => usuario.id === usuarioId)
  const conteudoExiste = banco.conteudos.some((conteudo) => conteudo.id === conteudoId)

  if (!usuarioExiste) return { status: 404, erro: 'Usuario nao encontrado' }
  if (!conteudoExiste) return { status: 404, erro: 'Conteudo nao encontrado' }

  const jaExiste = banco[nomeLista].some((item) => {
    return item.usuarioId === usuarioId && item.conteudoId === conteudoId
  })

  if (!jaExiste) {
    banco[nomeLista].push({
      usuarioId,
      conteudoId,
      criadoEm: new Date().toISOString()
    })
  }

  return null
}

function removerConteudoDaLista(banco, nomeLista, usuarioId, conteudoId) {
  banco[nomeLista] = banco[nomeLista].filter((item) => {
    return !(item.usuarioId === usuarioId && item.conteudoId === conteudoId)
  })
}

function listarHistorico(banco, usuarioId) {
  return banco.historico
    .filter((item) => item.usuarioId === usuarioId)
    .sort((a, b) => new Date(b.atualizadoEm) - new Date(a.atualizadoEm))
    .map((item) => {
      const conteudo = banco.conteudos.find((filme) => filme.id === item.conteudoId)

      if (!conteudo) return null

      return {
        ...conteudo,
        progresso: item.progresso,
        assistidoEm: item.atualizadoEm
      }
    })
    .filter((item) => item !== null)
}

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API do AssinaVideo online',
    teste: '/api/health'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mensagem: 'API funcionando',
    data: new Date().toISOString()
  })
})

app.get('/api/conteudos', (req, res) => {
  const banco = lerBanco()
  const busca = String(req.query.busca || '').toLowerCase()
  const categoria = String(req.query.categoria || '').toLowerCase()

  let conteudos = banco.conteudos

  if (busca) {
    conteudos = conteudos.filter((conteudo) => {
      const titulo = conteudo.titulo.toLowerCase()
      const descricao = conteudo.descricao.toLowerCase()
      return titulo.includes(busca) || descricao.includes(busca)
    })
  }

  if (categoria) {
    conteudos = conteudos.filter((conteudo) => conteudo.categoria.toLowerCase() === categoria)
  }

  res.json(conteudos)
})

app.get('/api/conteudos/:id', (req, res) => {
  const banco = lerBanco()
  const conteudo = banco.conteudos.find((item) => item.id === req.params.id)

  if (!conteudo) {
    return res.status(404).json({ erro: 'Conteudo nao encontrado' })
  }

  res.json(conteudo)
})

app.post('/api/usuarios', (req, res) => {
  const banco = lerBanco()
  const nome = String(req.body.nome || req.body.usuario || '').trim()
  const email = String(req.body.email || '').trim().toLowerCase()
  const senha = String(req.body.senha || '')
  const confirmarSenha = String(req.body.confirmarSenha || req.body.confirmacaoSenha || '')

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios' })
  }

  if (senha.length < 6) {
    return res.status(400).json({ erro: 'A senha precisa ter pelo menos 6 caracteres' })
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({ erro: 'As senhas nao conferem' })
  }

  const emailJaExiste = banco.usuarios.some((usuario) => usuario.email === email)

  if (emailJaExiste) {
    return res.status(409).json({ erro: 'Ja existe um usuario com esse email' })
  }

  const novoUsuario = {
    id: String(Date.now()),
    nome,
    email,
    senha,
    criadoEm: new Date().toISOString()
  }

  banco.usuarios.push(novoUsuario)
  salvarBanco(banco)

  res.status(201).json({
    mensagem: 'Usuario cadastrado com sucesso',
    usuario: usuarioSemSenha(novoUsuario)
  })
})

app.post('/api/login', (req, res) => {
  const banco = lerBanco()
  const identificador = String(req.body.email || req.body.usuario || '').trim().toLowerCase()
  const senha = String(req.body.senha || '')

  const usuario = banco.usuarios.find((item) => {
    const mesmoEmail = item.email === identificador
    const mesmoNome = item.nome.toLowerCase() === identificador
    const mesmaSenha = item.senha === senha

    return (mesmoEmail || mesmoNome) && mesmaSenha
  })

  if (!identificador || !senha) {
    return res.status(400).json({ erro: 'Email/usuario e senha sao obrigatorios' })
  }

  if (!usuario) {
    return res.status(401).json({ erro: 'Login ou senha invalidos' })
  }

  res.json({
    mensagem: 'Login realizado com sucesso',
    usuario: usuarioSemSenha(usuario)
  })
})

app.get('/api/usuarios/:usuarioId/favoritos', (req, res) => {
  const banco = lerBanco()
  res.json(listarConteudosSalvos(banco, 'favoritos', req.params.usuarioId))
})

app.post('/api/usuarios/:usuarioId/favoritos', (req, res) => {
  const banco = lerBanco()
  const erro = salvarConteudoNaLista(banco, 'favoritos', req.params.usuarioId, req.body.conteudoId)

  if (erro) return res.status(erro.status).json({ erro: erro.erro })

  salvarBanco(banco)
  res.status(201).json(listarConteudosSalvos(banco, 'favoritos', req.params.usuarioId))
})

app.delete('/api/usuarios/:usuarioId/favoritos/:conteudoId', (req, res) => {
  const banco = lerBanco()

  removerConteudoDaLista(banco, 'favoritos', req.params.usuarioId, req.params.conteudoId)
  salvarBanco(banco)

  res.json(listarConteudosSalvos(banco, 'favoritos', req.params.usuarioId))
})

app.get('/api/usuarios/:usuarioId/ver-mais-tarde', (req, res) => {
  const banco = lerBanco()
  res.json(listarConteudosSalvos(banco, 'verMaisTarde', req.params.usuarioId))
})

app.post('/api/usuarios/:usuarioId/ver-mais-tarde', (req, res) => {
  const banco = lerBanco()
  const erro = salvarConteudoNaLista(banco, 'verMaisTarde', req.params.usuarioId, req.body.conteudoId)

  if (erro) return res.status(erro.status).json({ erro: erro.erro })

  salvarBanco(banco)
  res.status(201).json(listarConteudosSalvos(banco, 'verMaisTarde', req.params.usuarioId))
})

app.delete('/api/usuarios/:usuarioId/ver-mais-tarde/:conteudoId', (req, res) => {
  const banco = lerBanco()

  removerConteudoDaLista(banco, 'verMaisTarde', req.params.usuarioId, req.params.conteudoId)
  salvarBanco(banco)

  res.json(listarConteudosSalvos(banco, 'verMaisTarde', req.params.usuarioId))
})

app.get('/api/usuarios/:usuarioId/historico', (req, res) => {
  const banco = lerBanco()
  res.json(listarHistorico(banco, req.params.usuarioId))
})

app.post('/api/usuarios/:usuarioId/historico', (req, res) => {
  const banco = lerBanco()
  const usuarioId = req.params.usuarioId
  const conteudoId = String(req.body.conteudoId || '').trim()
  const progresso = Number(req.body.progresso || 8)

  const usuarioExiste = banco.usuarios.some((usuario) => usuario.id === usuarioId)
  const conteudoExiste = banco.conteudos.some((conteudo) => conteudo.id === conteudoId)

  if (!usuarioExiste) return res.status(404).json({ erro: 'Usuario nao encontrado' })
  if (!conteudoExiste) return res.status(404).json({ erro: 'Conteudo nao encontrado' })

  const agora = new Date().toISOString()
  const item = banco.historico.find((linha) => {
    return linha.usuarioId === usuarioId && linha.conteudoId === conteudoId
  })

  if (item) {
    item.progresso = progresso
    item.atualizadoEm = agora
  } else {
    banco.historico.push({ usuarioId, conteudoId, progresso, criadoEm: agora, atualizadoEm: agora })
  }

  salvarBanco(banco)
  res.status(201).json(listarHistorico(banco, usuarioId))
})

app.delete('/api/usuarios/:usuarioId/historico/:conteudoId', (req, res) => {
  const banco = lerBanco()

  banco.historico = banco.historico.filter((item) => {
    return !(item.usuarioId === req.params.usuarioId && item.conteudoId === req.params.conteudoId)
  })

  salvarBanco(banco)
  res.json(listarHistorico(banco, req.params.usuarioId))
})

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota nao encontrada' })
})

app.listen(PORTA, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`)
})
