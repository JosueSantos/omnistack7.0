//importa express
const express = require('express');
//importa mongoDB
const mongoose = require('mongoose');
//importa path (padrao do node) que resolve os caminhos
const path = require('path');
//importa cors que permite acessar o backend de dominios diferentes
const cors = require('cors');

//cria servidor
const app = express();

//importa o http padrao do node e atribui o app como parametro
const server = require('http').Server(app);
//importa o socket.io e atribui o server como parametro
//isso permite o server utilizar tanto http como web socket
const io = require('socket.io')(server);

//conecta com o mongoDB via mongoDB atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-4v2yq.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//cria um middleware e atribui a variavel io na requisicao para disponibiliza-la nos controllers
app.use((req, res, next) => {
    req.io = io;
    //next chama o proximo middleware
    next();
});

//permite qualquer aplicacao acessar a o backend
app.use(cors());

//permite acessar as imagens pelo navegador
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

//usa arquivo de rotas
app.use(require('./routes'));

//escuta porta
server.listen(3333);

