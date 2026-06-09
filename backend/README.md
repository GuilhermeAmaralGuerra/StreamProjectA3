# API do AssinaVideo

Backend em Node.js + Express para o projeto StreamProjectA3.

## Como rodar

```powershell
cd backend
npm install
npm start
```

O servidor fica disponivel em:

```text
http://localhost:3000
```

Quando rodar em outro notebook da mesma rede, use o IP desse notebook:

```text
http://IP-DO-NOTEBOOK:3000
```

Exemplo:

```text
http://192.168.0.20:3000
```

## Rotas principais

### Teste da API

```http
GET /api/health
```

### Listar conteudos

```http
GET /api/conteudos
```

Tambem aceita filtros:

```http
GET /api/conteudos?busca=ruptura
GET /api/conteudos?categoria=Drama
```

### Cadastrar usuario

```http
POST /api/usuarios
```

Corpo JSON:

```json
{
  "nome": "Joao",
  "email": "joao@email.com",
  "senha": "123456",
  "confirmarSenha": "123456"
}
```

### Login

```http
POST /api/login
```

Corpo JSON:

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### Favoritos

```http
GET /api/usuarios/:usuarioId/favoritos
POST /api/usuarios/:usuarioId/favoritos
DELETE /api/usuarios/:usuarioId/favoritos/:conteudoId
```

Corpo JSON para salvar favorito:

```json
{
  "conteudoId": "ruptura"
}
```

### Ver mais tarde

```http
GET /api/usuarios/:usuarioId/ver-mais-tarde
POST /api/usuarios/:usuarioId/ver-mais-tarde
DELETE /api/usuarios/:usuarioId/ver-mais-tarde/:conteudoId
```

Corpo JSON para salvar:

```json
{
  "conteudoId": "the-boys"
}
```

### Historico / continuar assistindo

```http
GET /api/usuarios/:usuarioId/historico
POST /api/usuarios/:usuarioId/historico
DELETE /api/usuarios/:usuarioId/historico/:conteudoId
```

Corpo JSON para registrar que o usuario iniciou um conteudo:

```json
{
  "conteudoId": "ruptura",
  "progresso": 8
}
```

A tela do player chama essa rota automaticamente. A sidebar usa o historico para mostrar o ultimo item em "Continue assistindo".

## Banco de dados temporario

Nesta primeira versao, os dados ficam em:

```text
backend/data/db.json
```

Isso facilita os testes iniciais. Esse arquivo e local e nao deve ser enviado ao GitHub com dados reais de usuario.
Depois, se o trabalho pedir banco de dados real, essa estrutura pode virar MySQL, PostgreSQL ou SQLite.
