## APP

GymPass style app.

## RFS (Requisitos funcionais)

- [ X ] Deve ser possivel se cadastrar;
- [ X ] Deve ser possivel se autenticar;
- [ X ] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel obter o seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [ X ] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usario;
- [ ] Deve ser possivel cadastrar uma academia;


## RNs (Regras de Negócio)

- [ X ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;


## RNFs (Requisitos não-funcionais)

- [ X ] A senha do usúario precisa estar cripotagrafada;
- [ X ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas  de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);