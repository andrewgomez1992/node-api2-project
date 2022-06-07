// implement your posts router here
const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    res.json("yoooo")
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.delete('/:id', (req, res) => {

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
