//importa express
const express = require('express');
//importa multer para lidar com upload
const multer = require('multer');
//importa funcao para configurar o upload usando o multer
const uploadConfig = require('./config/upload');
//importa os controllers
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

//cria router
const routes = new express.Router();
//instancia e passa a configuracao do multer para lidar com uploads
const upload = multer(uploadConfig);

//faz a rota do metodo GET para o controller
routes.get('/posts', PostController.index);
//faz a rota do metodo POST para o controller passando a imagem resolvida pelo multer como parametro
routes.post('/posts', upload.single('image'), PostController.store);
//faz a rota do metodo POST para o controller passando o id como parametro
routes.post('/posts/:id/like', LikeController.store);

//exporta rotas
module.exports = routes;