# eventHub

Este projeto é uma aplicação multi-serviço que utiliza Docker para orquestrar um backend, um frontend e um banco de dados. Abaixo estão as instruções para configurar e executar o projeto.

## Pré-requisitos

- Docker e Docker Compose instalados na sua máquina.
- Node.js e npm instalados para desenvolvimento local.

## Instalação

1. Clone este repositório:

   ```
   git clone <URL_DO_REPOSITORIO>
   cd eventhub
   ```

2. Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente.

## Execução

Para iniciar todos os serviços, execute o seguinte comando na raiz do projeto:

```
docker-compose up --build
```

Isso irá construir as imagens Docker e iniciar os serviços do backend, frontend e banco de dados.

## Acesso

- O frontend estará disponível em `http://localhost:4173`.
- O backend estará disponível em `http://localhost:3000`.
- O banco de dados pode ser acessado conforme configurado no arquivo `.env`.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.
