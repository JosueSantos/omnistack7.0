//importa mongoDB
const mongoose = require('mongoose');

//mapeia tabela no mongoDB
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    },
}, {
    //cria um registro de data de *created at* e *updated at* na base de dados
    timestamps: true,
});

//exporta model
module.exports = mongoose.model('Post', PostSchema);