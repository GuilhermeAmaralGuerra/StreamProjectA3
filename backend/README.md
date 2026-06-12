# API do AssinaVideo

Backend simples feito em Node.js com Express.

A API salva os dados em um arquivo JSON local:

```text
backend/data/db.json
```

Esse arquivo funciona como um banco de dados simples para o trabalho.

## Como rodar

```powershell
cd backend
npm install
npm start
```

Depois acesse:

```text
http://localhost:3000/api/health
```

Se aparecer `API funcionando`, o backend esta rodando.

## O que a API faz

- Cadastra usuarios
- Faz login
- Lista os conteudos do site
- Salva favoritos
- Salva itens em "ver mais tarde"
- Salva historico para o "continue assistindo"

## Rotas principais

```http
GET /api/health
GET /api/conteudos
GET /api/conteudos/:id
POST /api/usuarios
POST /api/login
GET /api/usuarios/:usuarioId/favoritos
POST /api/usuarios/:usuarioId/favoritos
DELETE /api/usuarios/:usuarioId/favoritos/:conteudoId
GET /api/usuarios/:usuarioId/ver-mais-tarde
POST /api/usuarios/:usuarioId/ver-mais-tarde
DELETE /api/usuarios/:usuarioId/ver-mais-tarde/:conteudoId
GET /api/usuarios/:usuarioId/historico
POST /api/usuarios/:usuarioId/historico
DELETE /api/usuarios/:usuarioId/historico/:conteudoId
```

## Exemplos de envio

Cadastro:

```json
{
  "nome": "Joao",
  "email": "joao@email.com",
  "senha": "123456",
  "confirmarSenha": "123456"
}
```

Login:

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

Salvar favorito, ver mais tarde ou historico:

```json
{
  "conteudoId": "ruptura"
}
```

No historico tambem pode ser enviado:

```json
{
  "conteudoId": "ruptura",
  "progresso": 8
}
```

## Observacao

Essa versao foi feita para fins didaticos. Por isso usa arquivo JSON local em vez de banco de dados real.
Em um sistema publicado de verdade, o ideal seria usar banco de dados e proteger melhor as senhas.
