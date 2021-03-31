const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        const posts = await Post.findById(req.params.id);
        return res.json(posts);
    },

    async store(req, res) {
        const post = await Post.findById(req.params.id);

        const { comment } = req.body;

        post.comments.push(comment);

        await post.save();

        if(req.io)req.io.emit('comment', post);

        return res.json(post);
    }
}