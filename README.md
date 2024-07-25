# App

## RFs (Requisitos Funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuario logado;
- [X] Deve ser possível obter o numero de check-ins realizados pelo usuario logado;
- [X] Deve ser possível o usuario obter seu historico de check-ins;
- [X] Deve ser possível o usuario buscar academias proximas;
- [X] Deve ser possível o usuario buscar academias pelo nome;
- [X] Deve ser possível o usuario realizar o check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuario;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [X] O usuario não deve poder se cadastrar com um email duplicado;
- [X] O usuario não pode fazer 2 check-ins no mesmo dia;
- [X] O usuario nao pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-n só pode ser validado até 20 min após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] O academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

- [X] A senha do usuário precusa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por paginas;
- [X] O usuário deve ser identificado por um JWT;

# Tests
Os testes foram feitos utilizando o Vitest e Supertest.

## E2E Tests
Para cada teste foi criado um environment diferente, sendo assim os testes foram rodados em um ambiente seguro e sem nehuma conexão com o banco de dados da produção, outro ponto que vale resaltar é que cada rota de teste e2e é criado um schema diferente para o banco de dados, sendo assim nenhum teste interfere no outro, ao terminar os testes é derrubado esse serviço.

## Unit Test
Para cada caso de uso foi criado um teste, para verificar a integridade das funções.
