const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configuração do MongoDB
mongoose.connect('mongodb://localhost:27017/vital-ativa', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(express.json());

// Modelo de Matrícula
const matriculaSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    cpf: String,
    plano: String,
    objetivo: String,
    horario: String,
    dataMatricula: {
        type: Date,
        default: Date.now
    }
});

const Matricula = mongoose.model('Matricula', matriculaSchema);

// salvar matrícula
app.post('/api/matriculas', async (req, res) => {
    try {
        const matricula = new Matricula(req.body);
        await matricula.save();
        res.status(201).json({ message: 'Matrícula realizada com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao salvar matrícula' });
    }
});

// listar matrículas
app.get('/api/matriculas', async (req, res) => {
    try {
        const matriculas = await Matricula.find();
        res.json(matriculas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar matrículas' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 