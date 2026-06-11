require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const catalog = [
  {
    id: 1,
    title: 'Ruptura',
    type: 'Serie',
    category: 'Suspense',
    featured: true,
    progress: 38
  },
  {
    id: 2,
    title: 'The Boys',
    type: 'Serie',
    category: 'Acao',
    featured: false,
    progress: 0
  },
  {
    id: 3,
    title: 'Cosmos',
    type: 'Documentario',
    category: 'Ciencia',
    featured: false,
    progress: 0
  },
  {
    id: 4,
    title: 'Fullmetal Alchemist',
    type: 'Anime',
    category: 'Animacao',
    featured: false,
    progress: 0
  }
]

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: 'Servidor online'
  })
})

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    service: 'AssinaVideo API'
  })
})

app.get('/api/catalog', (req, res) => {
  res.json(catalog)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
