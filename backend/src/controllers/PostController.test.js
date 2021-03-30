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

        const req = httpMocks.createRequest({
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

    it("Cadastrar um novo post", async () => {

        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/new'
        });

        const res = httpMocks.createResponse();

        //dados do post criado para teste
        const testeVal = "Teste Jest " + Math.random();

        req.body.author = testeVal;
        req.body.place = testeVal;
        req.body.description = testeVal;
        req.body.hashtags = testeVal;

        req.file = {
            fieldname: 'image',
            originalname: 'placeholder-circle.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination:
                '/home/hyan/Desktop/react-projetcs/omnistack7.0/backend/uploads',
            filename: 'placeholder-circle.png',
            path:
                '/home/hyan/Desktop/react-projetcs/omnistack7.0/backend/uploads/placeholder-circle.png',
            size: 23370
        };
        //req.file.filename = "placeholder-circle.jpg";
        //req.file.path = "/home/hyan/Desktop/react-projetcs/omnistack7.0/backend/uploads/placeholder-circle.png";
        //req.file.destination = "/home/hyan/Desktop/react-projetcs/omnistack7.0/backend/uploads";

        await posts.store(req, res);

        let resultado = JSON.parse(res._getData());

        expect(resultado.author).toBe(testeVal);

        mongoose.disconnect();
    })
})