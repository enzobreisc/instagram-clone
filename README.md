Endpoints da API do Clone do Instagram
1. Autenticação
POST /register
Registra um novo usuário.

POST /login
Faz login e retorna um token de autenticação.

2. Usuários
GET /users
Retorna a lista de todos os usuários cadastrados.

GET /users/:id
Retorna os dados de um usuário específico.

3. Postagens
POST /posts
Cria uma nova postagem com imagem e legenda.

GET /posts
Retorna todas as postagens criadas por todos os usuários.

GET /posts/:id
Retorna os detalhes de uma postagem específica.

DELETE /posts/:id
Remove uma postagem específica (autorização necessária).
