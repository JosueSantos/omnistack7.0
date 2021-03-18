const express = require('express');
//biblioteca para lidar com multipart form, enviar e ler os dados, fotos, etc.
const multer = require('multer');

//importa configs do multer para upload da imagem
const uploadConfig = require('./config/upload.js');
//importa contoller do post
const PostControler = require('./controllers/PostController.js');
//importa controller dos likes
const LikeController = require('./controllers/LikeController.js');
//importa controller dos comentarios
const CommentController = require('./controllers/CommentController.js');


//cria objeto para gerenciar as rotas
const routes = new express.Router();
//instancia o multer para enviar a imagem
const upload = multer(uploadConfig);

routes.get('/posts', PostControler.index);
routes.post('/posts', upload.single('image'), PostControler.store);

routes.post('/posts/:id/like', LikeController.store);

routes.get('/posts/:id/comments', CommentController.index);
routes.post('/posts/:id/comments', CommentController.store);

module.exports = routes;