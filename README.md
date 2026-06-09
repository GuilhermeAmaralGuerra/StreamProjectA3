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

## Como rodar o backend/API

Abra um terminal:

```powershell
cd backend
npm install
npm start
```

A API fica em:

```text
http://localhost:3000
```

Teste:

```text
http://localhost:3000/api/health
```

## Como rodar o frontend/site

Abra outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

O site fica em:

```text
http://localhost:5173
```

## Observacao importante

O frontend precisa que o backend esteja rodando para cadastro, login, favoritos e ver mais tarde funcionarem.
O historico de "Continue assistindo" tambem depende do backend, pois ele e salvo pela API quando o usuario abre a tela de player.

## Usando um segundo notebook como servidor

Use esta configuracao quando o backend/API ficar em um notebook e o frontend/site em outro.

### No notebook servidor

1. Conecte o notebook servidor na mesma rede Wi-Fi do notebook que vai abrir o site.
2. Abra o PowerShell na pasta do projeto.
3. Rode:

```powershell
cd backend
npm install
npm start
```

4. Descubra o IP do notebook servidor:

```powershell
ipconfig
```

Procure o campo `IPv4`. Exemplo:

```text
192.168.0.20
```

5. No navegador de outro notebook, teste:

```text
http://192.168.0.20:3000/api/health
```

Troque `192.168.0.20` pelo IP real do notebook servidor.

### No notebook que vai abrir o site

1. Entre na pasta `frontend`.
2. Crie um arquivo chamado `.env`.
3. Coloque dentro dele:

```text
VITE_API_URL=http://192.168.0.20:3000/api
```

Troque `192.168.0.20` pelo IP real do notebook servidor.

4. Rode o frontend:

```powershell
npm install
npm run dev
```

5. Abra:

```text
http://localhost:5173
```

Se o IP do notebook servidor mudar, atualize o arquivo `frontend/.env` e reinicie o frontend.
