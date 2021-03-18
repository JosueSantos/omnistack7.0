const mongoose = require('mongoose');

//Cria schema da tabela do banco no mongoose
const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hasgtag: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    comments: [String],
},{
    timestamps: true //cria campos createdAt e updatedAt
});

module.exports = mongoose.model('Post', PostSchema);