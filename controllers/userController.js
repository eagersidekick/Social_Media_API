const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('./models');


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

//delete to remove user by its _id

//post to add a new friend to a user's friend list

//delete to remove user by its _id

}
