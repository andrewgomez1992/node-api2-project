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

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(post => {
            if (!req.params.id) {
                res.status(200).json({ message: 'The adopter has been nuked' });
            } else {
                res.status(404).json({ message: 'The adopter could not be found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The post could not be removed" })
        })
})

router.put('/:id', (req, res) => {

})

router.get('/:id/messages', (req, res) => {

})









// router.get('/', (req, res) => {
//     Posts.find(req.query)
//         .then(posts => {
//             res.status(200).json(posts)
//         })
//         .catch(error => {
//             res.status(500).json({ message: "The post with the specified ID does not exist" })
//         })
// })

// router.get('/:id', (req, res) => {
//     Posts.findById(req.params.id)
//         .then(post => {
//             if (post) {
//                 res.status(200).json(post);
//             } else {
//                 res.status(404).json({ message: "The post with the specified ID does not exist" });
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ message: "The post information could not be retrieved" });
//         });
// });

// router.post('/:id/dogs', (req, res) => {
//     Posts.insert(req.params.id)
//         .then(post => {
//             if (post.length > 0) {
//                 res.status(201).json(post);
//             } else {
//                 res.status(404).json({ message: 'No dogs for this adopter' });
//             }
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ message: 'Error retrieving the dogs for this adopter' });
//         });
// });



module.exports = router;
