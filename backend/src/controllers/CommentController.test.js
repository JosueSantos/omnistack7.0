const comments = require('./CommentController');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

describe('Testes para comentários', () => {

    beforeAll(async () => {
        //conecta com o banco - usuario: hyan / senha: eQbKOftPSNdy5U03
        mongoose.connect('mongodb+srv://hyan:eQbKOftPSNdy5U03@cluster0.70ti5.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })

    it('Ler comentários de um post', async() => {

        const post_id = "605fa0e3966b8a2422dcf01e"
        const post_comentarios = ["Teste1", "Teste2", "Teste3"];

        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/posts/' + post_id + '/comments'
        });

        const res = httpMocks.createResponse();

        //id do post a ser testado
        req.params.id = post_id;

        await comments.index(req, res);

        let resultado = JSON.parse(res._getData());

        expect(post_comentarios).toEqual(resultado.comments);

        //mongoose.disconnect();
    })

    it('Postar comentário em um post', async ()=>{

        const post_id = "60636a33bf2aaf108ecf1fe2"
        const post_novo_comentario = "Teste " + Math.random();

        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/posts/' + post_id + '/comments'
        });

        const res = httpMocks.createResponse();

        //id do post a ser testado
        req.params.id = post_id;

        //novo comentário
        req.body.comment = post_novo_comentario;

        await comments.store(req, res);

        let resultado = JSON.parse(res._getData());

        expect(resultado.comments.includes(post_novo_comentario)).toBe(true);

        mongoose.disconnect();
    })

})