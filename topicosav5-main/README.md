# AV5 - Cadastro de Corpos

Aplicação web para cadastrar e consultar corpos. O projeto usa Flask com SQLite no backend e Next.js no frontend. A inclusão exige login; a conta local padrão é `admin` / `admin123`.

## Executar no Windows

Abra dois terminais na pasta do projeto.

### 1. Backend

```powershell
cd 06-complete-app\back-python
uv sync
$env:PYTHONPATH = "$PWD\src"
uv run flask --app app run
```

O backend ficará disponível em `http://127.0.0.1:5000`.

### 2. Frontend

```powershell
cd 06-complete-app\front-react-next
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`, selecione **Login** e entre com `admin` / `admin123`. Use **Cadastrar corpo** para incluir um registro e **Corpos cadastrados** para consultar os registros.

## Campos de Corpo

- Nome, idade, altura e órgão faltante são obrigatórios.
- Peso é opcional.
- Idade é um número inteiro; peso e altura aceitam decimais.
