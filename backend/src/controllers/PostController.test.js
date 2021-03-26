const posts = require('./PostController');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

describe('Testes para posts', () => {

    beforeAll(async () => {
        //conecta com o banco - usuario: hyan / senha: eQbKOftPSNdy5U03
        mongoose.connect('mongodb+srv://hyan:eQbKOftPSNdy5U03@cluster0.70ti5.mongodb.net/test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })

    it('O feed deve exibir os posts em ordem de publicação', async () => {

        const req= httpMocks.createRequest({
            method: 'GET',
            url: '/posts'
        });

        const res = httpMocks.createResponse();

        await posts.index(req,res);

        let resultado = JSON.parse(res._getData());
        let resultadoOrdenado = JSON.parse(res._getData()); 

        //faz a ordenação dos elementos
        resultadoOrdenado.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1: 0));

        expect(resultado).toStrictEqual(resultadoOrdenado);
    })
})