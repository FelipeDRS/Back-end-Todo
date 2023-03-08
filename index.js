// configuração inicial
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const Todo = require('./models/Todo');

const USER_DB = 'felipedrs';
const PASSWORD_DB = '45198007';

mongoose
  .connect(
    `mongodb+srv://${USER_DB}:${PASSWORD_DB}@cluster0.ha6aopo.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('MongoDB!');
    app.listen(5000);
  })
  .catch((erro) => {
    console.log(erro);
  });

// forma de ler json / middlewares
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// rotas da API

// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar req
  res.json({ message: 'Oi Express!' });
});

// inserindo dados no banco

app.post('/todo', async (req, res) => {
  const { title, id, isCompleted, description } = req.body;

  const todo = {
    title,
    id,
    isCompleted,
    description,
  };
  try {
    await Todo.create(todo);
    res.status(201).json({ message: 'Todo inserido com sucesso' });
    console.log(todo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get('/todo', async (req, res) => {
  try {
    const todo = await Todo.find();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// atualizando dados no banco
app.patch('/todo/:id', async (req, res) => {
  const ID = req.params.id;
  const { title, id, isCompleted, description } = req.body;

  const todo = {
    title,
    id,
    isCompleted,
    description,
  };

  try {
    await Todo.updateOne({ _id: ID }, todo);
    res.status(200).json({ message: 'Usuário atualizado' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// delete
app.delete('/todo/:id', async (req, res) => {
  const ID = req.params.id;
  try {
    await Todo.deleteOne({ _id: ID });
    res.status(200).json({ message: 'Usuário removido' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
