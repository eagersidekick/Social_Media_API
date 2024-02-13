const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../Models');


module.exports = {
    //get all users
    getUsers(req, res) {
        try {
            User.find();
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //get a single user by its _id and populated thought and friend data
    getSingleUser(req, res) {
        try {
            User.findOne({ _id: req.params.userId })
                .populate("thoughts")
                .populate("friends")
                .select("-__v")
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //post a new user
    newUser(req, res) {
        try {
            User.create(req.body)
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    //put to update a user by its _id
    updateUser(req, res) {
        try {
            const user = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete to remove user by its _id
    deleteUser(req, res) {
        try {
            const user = User.findOneAndDelete(
                { _id: req.params.userId },
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }
            res.json({ message: "User deleted!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //post to add a new friend to a user's friend list
    addFriend(req, res) {
        try {
            const user = User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete to remove user by its _id
    deleteFriend(req, res) {
    try {
        const user = User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
};