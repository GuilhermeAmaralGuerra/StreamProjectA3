# StreamProjectA3

Projeto de streaming com frontend em React/Vite e backend em Node.js/Express.

## Requisitos

- Node.js instalado
- npm instalado

## Como baixar

```powershell
git clone https://github.com/GuilhermeAmaralGuerra/StreamProjectA3.git
cd StreamProjectA3
```

## Rodar a API

Abra um terminal:

```powershell
cd backend
npm install
npm start
```

Teste no navegador:

```text
http://localhost:3000/api/health
```

## Rodar o site

Abra outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

Depois acesse:

```text
http://localhost:5173
```

## Como o projeto funciona

O frontend mostra as telas do site.

O backend recebe as requisicoes do frontend e salva os dados em:

```text
backend/data/db.json
```

Esse arquivo guarda os usuarios cadastrados, favoritos, itens para assistir mais tarde e historico.

## Funcionalidades da API

- Cadastro de usuario
- Login
- Listagem de conteudos
- Favoritos
- Ver mais tarde
- Historico / continuar assistindo

## Observacao

O arquivo `backend/data/db.json` e local e nao deve ir para o GitHub com dados reais.
Quando outra pessoa rodar o projeto, esse arquivo sera criado automaticamente pela API.
