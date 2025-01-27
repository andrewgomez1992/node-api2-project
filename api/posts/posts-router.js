const express = require('express')
const Post = require('./posts-model')
const router = express.Router()

// GET THEM ALL
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
})

// GET BY SPECIFIC ID
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => {
            if (posts) {
                res.json(posts)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The post information could not be retrieved" })
        })
})

//
router.post('/', (req, res) => {
    let { title, contents } = req.body
    if (!title || !contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        title = title.trim();
        contents = contents.trim();
        Post.insert(req.body)
            .then(({ id }) => {
                return Post.findById(id)
            })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err.message,
                    stack: err.stack,
                })
            })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else {
            await Post.remove(req.params.id)
            res.json(post)
        }
    } catch (error) {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

router.put('/:id', (req, res) => {
    let { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Post.findById(req.params.id)
            .then(post => {
                if (!post) {
                    res.status(404).json({ message: "The post with the specified ID does not exist", })
                } else {
                    return Post.update(req.params.id, req.body)
                }
            })
            .then(data => {
                if (data) {
                    return Post.findById(req.params.id)
                }
            })
            .then(post => {
                res.json(post)
            })
            .catch(error => {
                res.status(500).json({ message: "The posts information could not be retrieved" })
            })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            const messages = await Post.findPostComments(req.params.id)
            res.json(messages)
        }
    } catch (err) {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})



module.exports = router;
