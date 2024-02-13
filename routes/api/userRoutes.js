const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

//api/users
router.route('/').get(getUsers).post(newUser);

//api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;