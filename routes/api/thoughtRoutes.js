const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thoughtController");

//api/thoughts 
router.route('/').get(getThought).post(newThought);

//api/thoughts/:thoughtId 
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//api/thoughts/:thoughtId/reactions 
router.route('/:thoughtId/reactions')
.post(createReaction);

//api/thoughts/:thoughtId/reactions/:reactionId 
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;