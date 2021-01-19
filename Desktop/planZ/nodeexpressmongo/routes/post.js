const express = require('express');
const router = express.Router();
const Post = require('../modals/Post')
const Joi = require('joi');

//POST se related API yaha Same age user Se to user.js bnate

//Get  All  Post
router.get('/', (req, res) => {
    const post = Post.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
})

//Specific Post 
router.get('/:postid', async (req, res) => {
    // console.log(req.params.postid);
    try {
        const post = await Post.findById(req.params.postid)
        res.json(post)
    }
    catch (err) {
        res.status(400).send({ msg: err })
    }
})

//Submit the Post
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        name: req.body.name,
        discription: req.body.discription
    });
    post.save()
        .then((data) => {
            res.send({ msg: 'success', post })
        })
        .catch((err) => {
            res.status(400).send({ msg: 'Unsucessfull', err })
        })
})

//Delete Post
router.delete('/:postid', (req, res) => {
    Post.remove({ _id: req.params.postid })
        .then(() => res.send({ msg: "Delete Successfully" }))
        .catch((err) => res.status(400).send({ msg: err }))
})


//Update  Post
router.patch('/:postid', (req, res) => {
    const Schema = Joi.object({
        title: Joi.required(),
        // discription: Joi.required()
    })
    const result = Schema.validate({ title: req.body.title })
    if (result.error) {
        res.status(404).json({ msg: result.error.details[0].message })
        return
    }

    Post.updateOne(
        { _id: req.params.postid },
        { $set: { title: req.body.title } }
    )
        .then((data) => {
            res.json(data)
        })
        .catch((err) => res.status(400).json({ msg: err }))
})

module.exports = router;
