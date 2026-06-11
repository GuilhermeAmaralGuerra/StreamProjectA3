# StreamProjectA3

Projeto academico para desenvolvimento de um site de streaming chamado *AssinaVideo*.

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

## Verificar o projeto

```bash
npm run check
```

Esse comando executa lint, build do frontend e validação de sintaxe do backend.
