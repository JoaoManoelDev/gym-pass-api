# 🏋️ Gym Pass API (SOLID) 🎟️

## :dart: Sobre

O Gym Pass API foi construído para que eu pudesse aprofundar meus conhecimentos sobre SOLID e entender seu papel na criação de uma base de código organizada. Desenvolvi esse projeto com clareza sobre a importância desses princípios, especialmente na parte de manutenção e escalabilidade.

## :rocket: Tecnologias

- <a href="https://nodejs.org/en" target="_blank">Node.js</a>
- <a href="https://fastify.dev/" target="_blank">Fastify</a>
- <a href="https://github.com/fastify/fastify-cookie" target="_blank">Fastify Cookie</a>
- <a href="https://github.com/fastify/fastify-jwt" target="_blank">Fastify JWT</a>
- <a href="https://www.prisma.io/" target="_blank">Prisma ORM</a>
- <a href="https://zod.dev/" target="_blank">Zod</a>
- <a href="https://day.js.org/" target="_blank">Day.js</a>
- <a href="https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html" target="_blank">SOLID</a>
- <a href="https://docs.github.com/pt/actions" target="_blank">GitHub Actions (CI)</a>

### 🎲 Rodando o app

```bash
# Clone este repositório:
$ git clone git@github.com:JoaoManoelDev/gym-pass-api.git

# Acesse a pasta do projeto no terminal/cmd.
$ cd gym-pass-api

# Instale as dependências
$ npm install

# Crie uma arquivo .env e copie o arquivo .env.example dentro dele.
# Para facilitar, o arquivo já contém o DATABASE_URL padrão do Docker e JWT_SECRET configurado.

# Para rodar as migrations do prisma digite o comando:
$ npx prisma migrate dev

# Para configurar o prisma client e suas tipagens digite o comando:
$ npx prisma generate

# Para rodar os testes unitários digite o comando:
$ npm run test

# Para rodar os testes e2e digite o comando:
$ npm run test:e2e

# Para subir o servidor digite o comando:
$ npm run dev

# Deve aparecer a seguinte mensagem -> HTTP Server Running!

```

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter o seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas (até 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por administradores
- [x] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)
