# My E-commerce

Essa é uma aplicação desenvolvida com o intuíto de avaliação para empresa [Pagar.me](https://pagar.me/)

## Como utilizar

Para utilizar esta aplicação você deve primeiro configurar as váriaveis de ambiente no arquivo `.env`. Há um arquivo `.env.example` a qual você pode se basear com as seguintes
configurações:

```shell
REACT_APP_API=https://5e3317ede0161c00140abf7f.mockapi.io
REACT_APP_PAGARME_KEY=
REACT_APP_API_CEP=https://viacep.com.br/ws

REACT_APP_CLIENT_RECEPTOR_ID=
REACT_APP_PLATFORM_RECEPTOR_ID=
```

Para instalar a aplicação utilize o comando:

```shell
npm install
```

Para rodar a aplicação basta utilizar o comando:

```shell
npm start
```

Para rodar os testes unitários:

```shell
npm test
```

A aplicação também possui comandos helpers para facilitar a utilização da API Pagarme:

```shell
// Consulta todas as transações
npm run transactions

// Consulta todos os receptores
npm run receptors

// Cria 2 receptores para o projeto
npm run createReceptors
```

## Backend

O backend foi utilizado a aplicação mockapi.io para criar os mocks de produtos. Caso você deseje criar sua própria API, você pode encontrar na pasta
**mock**, os arquivos json utilizados para criar a lista de produtos. A API está disponível nesta URL:

(https://5e3317ede0161c00140abf7f.mockapi.io/products)[https://5e3317ede0161c00140abf7f.mockapi.io/products]

## Tecnologias utilizadas

- [Pagarme](https://github.com/pagarme/pagarme-js)
- [MockAPI.io](https://www.mockapi.io/)
- axios
- dotenv
- react-redux
- react-router-dom
- react-credit-cards
- react-input-mask
- styled-icons
- typesafe-actions
