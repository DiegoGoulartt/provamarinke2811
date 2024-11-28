 Realizar Deposit para Profile 
 Tipo de métod http: POST
 url:http://localhost:3000/profiles/1/deposit
    Dados a serem enviados:
    {
      "amount": 1
    }

Listar todos os Contract de um determinado Profile
Tipo de métod http: GET
url:http://localhost:3000/contracts/1/contracts

Listar todos os Jobs de um Contract que não foram pagos integralmente 
Tipo de métod http: GET
url:http://localhost:3000/jobs/contracts/1/jobs/unpaid