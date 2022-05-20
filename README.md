# Nome do produto
Projeto de estudos - Desafio NGINX Proxy Reverso + Aplicação NodeJS + DB MySQL.

## Descrição
O objetivo desse projeto é criar um conjunto de containers utilizando um código em NodeJS. 
Um container será responsável pelo banco de dados, outro conterá a aplicação em NodeJS e um terceiro container executará um proxy reverso em NGINX.
O container da aplicação disponibilizará 3 operações: 

| Método | Descrição |
| ------------------ | ------ |
| ```GET /``` | A operação retornará "Full cycle Rocks!" seguido da lista dos nomes de pessoas cadastradas no banco de dados; |
| ```GET /people``` | Essa operação retornará todos os dados das pessoas cadastradas no formato JSON |
| ```POST /people``` | Essa operação irá cadastrar uma nova pessoa no banco |

## Instalação

Get started Docker - [Click here](https://docs.docker.com/get-started/)

## Exemplo de uso

Executar o conjunto de containers utilizando composer:
```sh
docker-compose up -d
```

## Release History

* 0.0.2
   * No longer needs to create database manually.
* 0.0.1
    * Project initialized and finished.
