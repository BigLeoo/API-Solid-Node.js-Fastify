# App

## RFs (Requisitos Funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuario logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possível o usuario obter seu historico de check-ins;
- [ ] Deve ser possível o usuario buscar academias proximas;
- [ ] Deve ser possível o usuario buscar academias pelo nome;
- [X] Deve ser possível o usuario realizar o check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuario;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [X] O usuario não deve poder se cadastrar com um email duplicado;
- [X] O usuario não pode fazer 2 check-ins no mesmo dia;
- [X] O usuario nao pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-n só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] O academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não Funcionais)

- [X] A senha do usuário precusa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por paginas;
- [ ] O usuário deve ser identificado por um JWT;
