import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

function cmp(a, b) {
    if (a.score > b.score) return 1;
    return -1;
}
// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
    try {
        const mes = await Post.find({});
        mes.sort(function cmp(a, b) {
            if (a.timestamp > b.timestamp) return -1;
            return 1;
        });
        if (mes.length >= 1) {
            const data = [];
            const size = mes.length;
            for (let i = 0; i < size; i++) {
                data.push(mes[i]);
            }
            res.status(200).send({ message: "success", data: data });
        }
        else
            res.status(403).send({ message: "error", data: null });
    } catch (e) {
        res.status(403).send({ message: "error", data: null });
    }
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    try {
        const request = req.query;
        const mes = await Post.find({ postId: request.pid });
        if (mes.length == 1) {
            const pd = new Post(mes[0]);
            res.status(200).send({ message: "success", post: pd });
        }
        else
            res.status(403).send({ message: "error", post: null });
    } catch (e) {
        res.status(403).send({ message: "error", post: null });
    }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    try {
        const newpost = new Post(req.body);
        await newpost.save();
        res.status(200).send({ message: "success" });
    } catch (e) {
        res.status(403).send({ message: "error", post: null });
    }
})
// TODO 5-(1): create the 4th API (/api/post)

export default router