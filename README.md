<p align="center">
    <a href="https://api-no-covid.pedrosodre.dev/" target="blank">
        <img src="https://raw.githubusercontent.com/pedrosodre/no-covid-api/master/NoCovidApi.png" width="120" alt="No Covid API" />
    </a>
    <h1 align="center" style="color: #eb5569; margin: 0;">
        No Covid API
    </h1>
</p>

<p align="center">
    API pública e gratuita contendo informações atualizadas várias vezes durante o dia sobre a pandemia do COVID-19.
</p>

<p align="center">
    <a>
        <img src="https://img.shields.io/github/package-json/v/pedrosodre/no-covid-api" alt="API Version" />
    </a>
    <a>
        <img src="https://sonarcloud.io/api/project_badges/measure?project=pedrosodre_no-covid-api&metric=alert_status" alt="SonarCloud">
    </a>
    <a>
        <img src="https://sonarcloud.io/api/project_badges/measure?project=pedrosodre_no-covid-api&metric=security_rating" alt="SonarCloud">
    </a>
    <a>
        <img src="https://sonarcloud.io/api/project_badges/measure?project=pedrosodre_no-covid-api&metric=coverage" alt="SonarCloud">
    </a>
    <a>
        <img src="https://sonarcloud.io/api/project_badges/measure?project=pedrosodre_no-covid-api&metric=bugs" alt="SonarCloud">
    </a>
    <a href="LICENSE">
        <img src="https://img.shields.io/github/license/pedrosodre/no-covid-api" alt="License" />
    </a>
    <a href="issues">
        <img src="https://img.shields.io/github/issues-raw/pedrosodre/no-covid-api" alt="Issues" />
    </a>
    <a>
        <img src="https://img.shields.io/github/commit-activity/m/pedrosodre/no-covid-api" alt="GitHub Commit Activity" />
    </a>
    <a>
        <img src="https://img.shields.io/github/last-commit/pedrosodre/no-covid-api" alt="GitHub Last Commit" />
    </a>
</p>

## Descrição

 O objetivo da API é permitir que mais aplicações informativas apareçam para manter a população consciente sobre o coronavírus. Ideias, sugestões ou problemas podem ser enviados através da aba de <a href="issues">Issues</a> do GitHub.

## Requisitos
- npm
- Node.js 10.x ou superior
- Mongo 4.x ou superior
- TypeScript 3.8.x ou superior

## Início rápido

1. Instale todas as dependências do projeto:

```bash
$ npm install
```
2. Crie um arquivo `.env` através do `.env.example` e preencha as variáveis necessárias. Por exemplo, preencha `MONGODB_URL` com os dados de conexão a sua instância local do MongoDB.
3. Carregue as amostras de dados contidos na pasta `/db-sample` no seu banco de dados. Observação: os dados de amostra já contém uma aplicação criada com a combinação de chaves `sampleKey`:`sampleSecret`, criada apenas para facilitar no seu desenvolvimento local.
4. Inicie a aplicação com o comando abaixo:

```bash
$ npm run start:dev
```

## Testes

Para manter o nível da aplicação, qualquer novo recurso ou correção adicionadas a API deverão ter cobertura de testes unitários e end-to-end. Para isso, utilize os comandos abaixos para guiar-se:

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Licença

A API foi disponibilizada publicamente através da licença [GPL-3.0](LICENSE).
