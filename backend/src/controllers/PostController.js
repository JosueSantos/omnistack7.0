//importa model
const Post = require('../models/Post');

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

        //espera o resultado da funcao assincrona de criar o registro no mongoDB
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        //responde com o objeto post
        return res.json(post);
    },
};