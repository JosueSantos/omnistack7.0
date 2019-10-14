//importa model
const Post = require('../models/Post');

//exporta os metodos do controller
module.exports = {
    //responde ao POST
    async store(req, res) {
        //espera a funcao assincrona que recebe os registros do mongoDB pesquisando pelo id
        //req.params.xxxx recebe os parametros passados na url mapeados em routes.js 
        const post = await Post.findById(req.params.id);
        //adiciona 1 like
        post.likes += 1;
        //salva o estado atual de post no mongoDB
        await post.save();

        //emite dados para todos os usuarios conectados na aplicacao via web socket
        //recebe um nome qualquer e os dados como parametro
        req.io.emit('like', post);

        //responde com o objeto post
        return res.json(post);
    },
};