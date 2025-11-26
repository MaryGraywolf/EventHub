# Diretrizes para Agentes de IA

Este documento fornece diretrizes para agentes de IA que trabalham neste repositório.

## Visão Geral do Projeto

Este é um projeto de registro de eventos com um backend construído em Node.js com Fastify e Prisma, e um frontend em React.

### Arquitetura

- **`backend/`**: Contém o código da API, incluindo rotas, lógica de negócios e configuração do banco de dados.
  - **`prisma/`**: Contém o schema do banco de dados e as migrações.
  - **`src/`**: Contém o código-fonte da aplicação, incluindo rotas, bibliotecas e o servidor.
- **`frontend/`**: Contém o código do cliente web.

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, siga estas etapas:

1.  **Instale as dependências do backend:**
    ```bash
    cd backend && npm install
    ```

2.  **Execute as migrações do banco de dados:**
    ```bash
    cd backend && npx prisma migrate deploy
    ```

## Executando os Testes

Para garantir a qualidade do código, é essencial executar os testes antes de enviar qualquer alteração.

### Configurando o Ambiente de Teste

1.  **Crie um arquivo `.env.test` na raiz do diretório `backend/`:**
    ```bash
    cp backend/.env.example backend/.env.test
    ```

2.  **Ajuste a variável `DATABASE_URL` no arquivo `.env.test` para usar um schema de teste:**
    -   Exemplo: `DATABASE_URL="postgresql://postgres:postgres@db-service.database.svc.cluster.local:5432/app?schema=test"`

### Scripts de Teste

-   **`npm run test:migrate`**: Executa as migrações no banco de dados de teste.
-   **`npm test`**: Executa os testes.

Sempre execute `npm run test:migrate` antes de `npm test` para garantir que o banco de dados de teste esteja atualizado.
