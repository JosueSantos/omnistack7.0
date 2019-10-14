//importa model
const Post = require('../models/Post');
//importa sharp para manipular imagens 
const sharp = require('sharp');
//importa path (padrao do node) que resolve os caminhos
const path = require('path');
//importa file system padrao de node para lidar com arquivos
const fs = require('fs');

//exporta os metodos do controller
module.exports = {

    async index(req, res) {
        //espera o resultado da funcao assincrona de buscar todos o registro no mongoDB 
        //ordenando por data de criacao de forma decrescente
        const posts = await Post.find().sort('-createdAt');

        //responde com a lista de todos os posts ordenados
        return res.json(posts);
    },

    //responde ao POST
    async store(req, res) {
        //utiliza a desestruturacao do ES6 para recuperar os atributos dos objetos
        const { author, place, description, hashtags } = req.body;
        //pega o filename de req.file e muda o nome da variavel para image
        const { filename: image } = req.file;

        //armazena o nome da imagem sem a extencao
        const [name] = image.split('.');
        //adiciona jpg como a nova extencao
        const filename = `${name}.jpg`;

        //utiliza o sharp para redimensionar a imagem passando seu caminho
        await sharp(req.file.path)
            .resize(500) //redimensiona para 500px
            .jpeg({ quality: 70 }) //transforma em jpeg e modifica a qualidade para 70%
            .toFile(path.resolve(req.file.destination, 'resized', filename)); //Salva a imagem na pasta resized.

        //utiliza o metodo unlink em sua versao sincrona para deletar a imagem original.
        fs.unlinkSync(req.file.path);

        //espera o resultado da funcao assincrona de criar o registro no mongoDB
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename,
        });

        //emite dados para todos os usuarios conectados na aplicacao via web socket
        //recebe um nome qualquer e os dados como parametro
        req.io.emit('post', post);

        //responde com o objeto post
        return res.json(post);
    },
};