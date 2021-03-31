const Post = require('../models/Post');
//importa biblioteca para redimensionar imagens
const sharp = require('sharp');
//importa biblioteca para resolver o pathing
const path = require('path');
//importa biblioteca do file system
const fs = require('fs');


module.exports = {
     async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image} = req.file;

        console.log(req.file);

        //separa o nome da imagem da extencao
        const [name] = image.split('.');
        const fileName = name + '.jpg';

        //redimensiona e salva a imagem recebida
        await sharp(req.file.path).resize(500).jpeg({quality:70}).toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        );

        //deleta a imagem com tamanho original
        //fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author, place, description, hashtags, image: fileName
        });

        if(req.io)req.io.emit('post', post);

        res.json(post);
    }
}