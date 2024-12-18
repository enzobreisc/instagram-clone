const express = require('express');
const db = require('./database'); // Importa o banco de dados

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Endpoint para registrar um novo usuário
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Verifica se os campos estão preenchidos
    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios.' });
    }

    // Logando para garantir que os dados estão sendo recebidos corretamente
    console.log("Dados recebidos no POST /register:", { username, password });

    // Insere os dados no banco de dados
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], function (err) {
        if (err) {
            console.error('Erro ao inserir dados:', err.message);
            return res.status(500).json({ error: 'Erro ao salvar os dados.' });
        }
        
        console.log('Usuário registrado com sucesso! ID:', this.lastID);
        res.status(201).json({ message: 'Usuário registrado com sucesso!', userId: this.lastID });
    });
});

// Endpoint para listar todos os usuários
app.get('/users', (req, res) => {
    const query = `SELECT id, username, password FROM users`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar os dados.' });
        }
        res.json(rows);
    });
});

// Endpoint para deletar um usuário pelo ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM users WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            console.error('Erro ao deletar usuário:', err.message);
            return res.status(500).json({ error: 'Erro ao deletar o usuário.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }
        res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    });
});

// Inicia o servidor
app.listen(port,"localhost", () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

