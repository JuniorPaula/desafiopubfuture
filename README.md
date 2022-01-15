# Desafio PubFuture

### Aplicação desenvolvida em NodeJS e MySQL com Sequelize.

O Projeto conciste em uma API de finanças pessoais que realiza as seguintes operações:

- Cadastro de conta
- Cadastro de receitas
- Cadastro de despesas

### Instruções para rodar o projeto

Os requisitos necessários são:

- Node versão V16
- npm
- MySql

Faça o clone do projeto e rode o comando `npm install` para instalar as dependências.

~~~javascript
npm install
~~~

Subir o servidor atravéz do comando `npm run dev` disponibilizará a porta 5000.

~~~javascript
npm run dev
~~~

Configurar a base de dados criando um arquivo `.env` na raiz do projeto, e seguindo o examplo das variaveis de ambiente que estão no arquivo `.env.example`.

Rodar o comando `npx sequelize db:migrate` para gerar as migrations na base de dados.

~~~javascript
npx sequelize db:migrate
~~~

### Endpoints da aplicação

### Rotas accounts

#### Criar uma conta:

~~~javascript
[POST] <http://localhost:${port}/accounts>
~~~

Para criar uma conta `/accounts`.
`type_account` aceita os seguintes tipos de conta:

- Carteira
- Conta Poupança
- Conta Corrente

Exemplo:

**body**
~~~javascript
{
	"balance": 400,
	"type_account": "Carteira",
	"financial_institution": "Banco Pan"
}
~~~

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	"balance": 400,
	"type_account": "Carteira",
	"financial_institution": "Banco Pan"
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Invalid account."
	]
}
~~~

#### Listar as contas:

~~~javascript
[GET] <http://localhost:${port}/accounts>
~~~

Para listar as contas `/accounts`. Retorna um `json` com as contas e entradas e despesas associadas a está conta.

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
[
	{
		"id": 34,
		"balance": 200,
		"type_account": "Conta Corrente",
		"financial_institution": "Banco Pan",
		"created_at": "2022-01-08T15:58:25.000Z",
		"updated_at": "2022-01-12T23:38:08.000Z",
		"incomes": [
			{
				"id": 6,
				"amount": 100,
				"receipt_date": "2022-01-11",
				"expected_receipt_date": "2022-05-03",
				"description": "Prêmio do trabalho",
				"account_id": 34,
				"type_income": "Prêmio",
				"created_at": "2022-01-11T23:13:57.000Z",
				"updated_at": "2022-01-11T23:13:57.000Z"
			}
		],
		"costs": [
			{
				"id": 2,
				"amount": 100,
				"receipt_date": "2022-01-12",
				"expected_receipt_date": "2022-01-17",
				"account_id": 34,
				"type_cost": "Alimentação",
				"created_at": "2022-01-12T23:38:08.000Z",
				"updated_at": "2022-01-12T23:38:08.000Z"
			},
		]
	}
]
~~~

#### Atualizar uma conta:

~~~javascript
[PUT] <http://localhost:${port}/accounts/${id}>
~~~

para atualizar `/accounts/2`, recebe um id como parâmetro. retorna a conta atualizada

Exemplo:

**body**
~~~javascript
{
	"type_account": "Carteira",
	"financial_institution": "Banco Pan"
}
~~~

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	"id": 36,
	"balance": 2200,
	"type_account": "Carteira",
	"financial_institution": "Banco Pan",
	"created_at": "2022-01-08T16:00:31.000Z",
	"updated_at": "2022-01-12T23:41:00.000Z"
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Account not found."
	]
}
~~~

#### Deletar uma conta

~~~javascript
[DELETE] <http://localhost:${port}/accounts/${id}>
~~~

para deletar `/accounts/2`, recebe um id como parâmetro. retorna `[]`

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    []
}
~~~

#### Listar saldo total das contas

~~~javascript
[GET] <http://localhost:${port}/accounts/saldos>
~~~

para listar o saldo total das contas `/accounts/saldos`.

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	"saldo_total": 5400
}
~~~

#### Transferências entre contas

~~~javascript
[PATCH] <http://localhost:${port}/accounts/transfer/${id}>
~~~

para realizar transferências entre contas `/accounts/transfer/2`. recebe o `id ` da conta pagadora por parầmetro e `id` da conta recebedora pelo `body` da requisição.

exemplo:

**body**
~~~javascript
{
	"value": 200,
	"account_id": 34,
	"account_name": "Conta Corrente"
}
~~~

**Retorno**
![Generic badge](https://img.shields.io/badge/OK-201-<COLOR>.svg)
~~~javascript
{
	"message": "Transferência de 200 realizada com succeso."
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Account not found."
	]
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"insufficient funds.."
	]
}
~~~

### Rotas Incomes

#### Criar uma entrada:

~~~javascript
[POST] <http://localhost:${port}/incomes>
~~~

Para criar uma entrada `/incomes`.
`type_income` aceita os seguintes tipos de entradas:

- Salário
- Presente
- Prêmio
- Outros

Exemplo:

**body**

~~~javascript
{
	"amount": 2000,
	"receipt_date": "2022-04-26",
	"expected_receipt_date": "2022-05-03",
	"description": "Salário do mês",
	"account_id": 36,
	"type_income": "Salário"
}
~~~

**Retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	{
    	"id": 8,
    	"amount": 2000,
    	"receipt_date": "2022-04-26",
    	"expected_receipt_date": "2022-05-03",
    	"description": "Salário do mês",
    	"account_id": 36,
    	"type_income": "Salário",
    	"updated_at": "2022-01-12T00:02:44.749Z",
    	"created_at": "2022-01-12T00:02:44.749Z"
    }
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Invalid type income."
	]
}
~~~

#### Atualizar uma entrada:

~~~javascript
[PUT] <http://localhost:${port}/incomes/${id}>
~~~

para atualizar `/incomes/2`, recebe um id como parâmetro. retorna a entrada atualizada

Exemplo:

**body**
~~~javascript
{
	"expected_receipt_date": "2022-04-03",
	"description": "Presente",
	"type_income": "Outros"
}
~~~

**retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    {
    	"id": 5,
    	"amount": 150,
    	"receipt_date": "2022-01-11",
    	"expected_receipt_date": "2022-04-03",
    	"description": "Presente",
    	"account_id": 35,
    	"type_income": "Outros",
    	"created_at": "2022-01-11T22:44:07.000Z",
    	"updated_at": "2022-01-11T23:00:00.420Z"
    }
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Invalid type income."
	]
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Income not found."
	]
}
~~~

#### Deletar uma entrada

~~~javascript
[DELETE] <http://localhost:${port}/incomes/${id}>
~~~

para deletar `/incomes/2`, recebe um id como parâmetro. retorna `[]`

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    []
}
~~~

#### Listar entradas pelo tipo

~~~javascript
[GET] <http://localhost:${port}/incomes?name=${valor}>
~~~

para listar as entradas pelo tipo `/incomes?name=Premio`. Retorna um Array de objetos com as entradas filtradas

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
[
	{
        "id": 4,
        "amount": 150,
        "receipt_date": "2022-01-11",
        "expected_receipt_date": "2022-02-03",
        "description": "Prêmio do trabalho",
        "account_id": 35,
        "type_income": "Prêmio",
        "created_at": "2022-01-11T22:40:17.000Z",
        "updated_at": "2022-01-11T22:40:17.000Z"
    },
]
~~~

#### Listar entradas por filtro de datas

~~~javascript
[GET] <http://localhost:${port}/incomes/filter?start_date=${valor}&end_date=${valor}>
~~~

para listar as entradas por filtro de datas `/incomes/filter?start_date=01/01/2022&end_date=02/03/2022`. Retorna um Array de objetos com as entradas filtradas

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
[
	{
		"id": 4,
		"amount": 150,
		"receipt_date": "2022-01-11",
		"expected_receipt_date": "2022-02-03",
		"description": "Prêmio do trabalho",
		"account_id": 35,
		"type_income": "Prêmio",
		"created_at": "2022-01-11T22:40:17.000Z",
		"updated_at": "2022-01-11T22:40:17.000Z"
	},
	{
		"id": 5,
		"amount": 150,
		"receipt_date": "2022-01-11",
		"expected_receipt_date": "2022-04-03",
		"description": "Presente",
		"account_id": 35,
		"type_income": "Outros",
		"created_at": "2022-01-11T22:44:07.000Z",
		"updated_at": "2022-01-11T23:00:00.000Z"
	},
]
~~~

#### Listar saldo total das entradas

~~~javascript
[GET] <http://localhost:${port}/incomes/entradas/total>
~~~

para listar saldo total das entradas `/incomes/entradas/total`.

exemplo:

**Retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	"saldo_total": 2600
}
~~~

### Rotas Costs

#### Criar uma despesa:

~~~javascript
[POST] <http://localhost:${port}/costs>
~~~

Para criar uma despesa `/costs`.
`type_cost` aceita os seguintes tipos de entradas:

- Alimentação
- Educação
- Lazer
- Moradia
- Roupa
- Saúde
- Transporte
- Outros

Exemplo:
**body**

~~~javascript
{
	"amount": 300,
	"receipt_date": "15/01/2022",
	"expected_receipt_date": "01/02/2022",
	"account_id": 36,
	"type_cost": "Lazer"
}
~~~

**Retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    {
    	"id": 4,
    	"amount": 300,
    	"receipt_date": "2022-01-15",
    	"expected_receipt_date": "2022-02-01",
    	"account_id": 36,
    	"type_cost": "Lazer",
    	"updated_at": "2022-01-12T23:41:00.260Z",
    	"created_at": "2022-01-12T23:41:00.260Z"
    }
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Invalid type cost."
	]
}
~~~

#### Atualizar uma despesa:

~~~javascript
[PUT] <http://localhost:${port}/costs/${id}>
~~~

para atualizar `/costs/2`.

Exemplo:

**body**
~~~javascript
{
	"expected_receipt_date": "05/06/2022",
	"type_cost": "Educação"
}
~~~

**retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    {
    	"id": 4,
    	"amount": 300,
    	"receipt_date": "2022-01-15",
    	"expected_receipt_date": "2022-06-05",
    	"account_id": 36,
    	"type_cost": "Educação",
    	"created_at": "2022-01-12T23:41:00.000Z",
    	"updated_at": "2022-01-13T23:20:34.000Z"
    }
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Invalid type cost."
	]
}
~~~

![Maintenance](https://img.shields.io/badge/BadRequest-400-red.svg)
~~~javascript
{
	"errors": [
		"Cost not found."
	]
}
~~~

#### Deletar uma despesa

~~~javascript
[DELETE] <http://localhost:${port}/costs/${id}>
~~~

para deletar `/costs/2`, recebe um id como parâmetro. retorna `[]`

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
    []
}
~~~

#### Listar despesas pelo tipo

~~~javascript
[GET] <http://localhost:${port}/costs?name=${valor}>
~~~

para listar as despesas pelo tipo `/costs?name=Alimentação`. Retorna um Array de objetos com as despesas filtradas

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
[
	{
		"id": 1,
		"amount": 100,
		"receipt_date": "2022-01-12",
		"expected_receipt_date": "2022-01-17",
		"account_id": 34,
		"type_cost": "Alimentação",
		"created_at": "2022-01-12T23:37:43.000Z",
		"updated_at": "2022-01-12T23:37:43.000Z"
	},
]
~~~

#### Listar despesas por filtro de datas

~~~javascript
[GET] <http://localhost:${port}/costs/filter?start_date=${valor}&end_date=${valor}>
~~~

para listar as despesas por filtro de datas `/costs/filter?start_date=10/01/2022&end_date=16/01/2022`. Retorna um Array de objetos com as entradas filtradas

exemplo:

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
[
	{
		"id": 1,
		"amount": 100,
		"receipt_date": "2022-01-12",
		"expected_receipt_date": "2022-01-17",
		"account_id": 34,
		"type_cost": "Alimentação",
		"created_at": "2022-01-12T23:37:43.000Z",
		"updated_at": "2022-01-12T23:37:43.000Z"
	},
	{
		"id": 2,
		"amount": 100,
		"receipt_date": "2022-01-12",
		"expected_receipt_date": "2022-01-17",
		"account_id": 34,
		"type_cost": "Alimentação",
		"created_at": "2022-01-12T23:38:08.000Z",
		"updated_at": "2022-01-12T23:38:08.000Z"
	},
]
~~~

#### Listar saldo total das despesas

~~~javascript
[GET] <http://localhost:${port}/costs/despesas/total>
~~~

para listar saldo total das despesas `/costs/despesas/total`.

exemplo:

**Retorno**

![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)
~~~javascript
{
	"saldo_total": 500
}
~~~
