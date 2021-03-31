const likes = require('./LikeController');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const Post = require('../models/Post');

describe('Testes para likes', () => {

    beforeAll(async () => {
        //conecta com o banco - usuario: hyan / senha: eQbKOftPSNdy5U03
        mongoose.connect('mongodb+srv://hyan:eQbKOftPSNdy5U03@cluster0.70ti5.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })

    it('Incrementar o like do post selecionado', async () => {

        const post_id = "602422cab4c5622d455c2b12"

        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/posts/'+post_id+'/like'
        });

        const res = httpMocks.createResponse();

        //id do post a ser testado
        req.params.id = post_id;

        //busca no banco o id
        const post = await Post.findById(req.params.id);

        let prevLikes = post.likes;

        await likes.store(req,res);

        let resultado = JSON.parse(res._getData());

        expect(prevLikes + 1).toEqual(resultado.likes);

        mongoose.disconnect();
    })

})