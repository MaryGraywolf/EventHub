# docker-multi-service-project

Este projeto é uma aplicação multi-serviço que utiliza Docker para orquestrar um backend, um frontend e um banco de dados. Abaixo estão as instruções para configurar e executar o projeto.

## Estrutura do Projeto

```
docker-multi-service-project
├── backend          # Código do backend da aplicação
│   ├── Dockerfile   # Instruções para construir a imagem Docker do backend
│   ├── package.json # Manifesto do projeto backend
│   ├── package-lock.json # Registra as versões exatas das dependências
│   ├── tsconfig.json # Configurações do TypeScript
│   ├── src          # Código fonte do backend
│   │   ├── server.ts # Ponto de entrada da aplicação backend
│   │   ├── controllers # Lógica de controle da aplicação
│   │   └── routes    # Definição das rotas da aplicação
│   └── prisma       # Esquema do banco de dados utilizado pelo Prisma
│       └── schema.prisma
├── frontend         # Código do frontend da aplicação
│   ├── Dockerfile   # Instruções para construir a imagem Docker do frontend
│   ├── package.json # Manifesto do projeto frontend
│   ├── package-lock.json # Registra as versões exatas das dependências
│   ├── public       # Arquivos públicos do frontend
│   │   └── index.html # HTML principal da aplicação frontend
│   └── src          # Código fonte do frontend
│       └── main.tsx # Ponto de entrada da aplicação frontend
├── db              # Configuração do banco de dados
│   ├── Dockerfile   # Instruções para construir a imagem Docker do banco de dados
│   └── init         # Scripts de inicialização do banco de dados
│       └── init.sql # Scripts SQL para inicializar o banco de dados
├── docker-compose.yml # Orquestração dos serviços
├── .env            # Variáveis de ambiente
└── README.md       # Documentação do projeto
```

## Pré-requisitos

- Docker e Docker Compose instalados na sua máquina.
- Node.js e npm instalados para desenvolvimento local.

## Instalação

1. Clone este repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd docker-multi-service-project
   ```

2. Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente.

## Execução

Para iniciar todos os serviços, execute o seguinte comando na raiz do projeto:

```
docker-compose up --build
```

Isso irá construir as imagens Docker e iniciar os serviços do backend, frontend e banco de dados.

## Acesso

- O frontend estará disponível em `http://localhost:3000`.
- O backend estará disponível em `http://localhost:2424`.
- O banco de dados pode ser acessado conforme configurado no arquivo `.env`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.