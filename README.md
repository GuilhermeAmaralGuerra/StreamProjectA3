# StreamProjectA3

Projeto academico para desenvolvimento de um site de streaming chamado **AssinaVideo**.

## Tecnologias

- Frontend: React, Vite, React Router e Tailwind CSS
- Backend: Node.js, Express e CORS

## Requisitos

- Node.js instalado
- npm instalado

## Instalar dependencias

Na pasta raiz do projeto, rode:

```bash
npm run install:all
```

Ou instale separadamente:

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Rodar o frontend

```bash
npm run frontend:dev
```

O Vite normalmente abre em:

```text
http://localhost:5173
```

## Rodar o backend

```bash
npm run backend:dev
```

A API fica disponivel em:

```text
http://localhost:3000
```

Rota de teste:

```text
GET /
```

Resposta esperada:

```json
{
  "status": "Servidor online"
}
```

Rotas da API:

```text
GET /api/status
GET /api/catalog
```

O arquivo `backend/.env.example` mostra as variaveis que podem ser usadas no servidor.
O arquivo `frontend/.env.example` mostra a URL da API para o frontend.

## Verificar o projeto

```bash
npm run check
```

Esse comando executa lint, build do frontend e validacao de sintaxe do backend.
