//importa express
const express = require('express');
//importa mongoDB
const mongoose = require('mongoose');

//cria servidor
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-4v2yq.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//usa arquivo de rotas
app.use(require('./routes'));

//escuta porta
app.listen(3333);

