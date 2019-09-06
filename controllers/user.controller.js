const mongoose = require("mongoose");
const { User } = require("../models/user.model");

module.exports.getAllUsers = async (req, res) => {
    let users = await User.find({});
    return res.send(users);
  };
  
module.exports.getUser = async (req, res) => {
    let userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).send("Invalid object id");
    let user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    return res.send(user);
  };
  
module.exports.createUser = async (req, res) => {
    console.log(req.body);
    let user = new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email
    });
    await user.save()
    .then(user => {
      return res.send(user);
    })
    .catch(err => {
      return res.status(500).send(err)
    });
  };
  
module.exports.updateUser = async (req, res) => {
    let userId = req.params.id;
    User.findOneAndUpdate(userId, req.body, { new: true })
      .then(user => {
        return res.send(user);
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  };
  
module.exports.deleteUser = async (req, res) => {
    let userId = req.params.id;
    await User.findByIdAndDelete(userId)
    .then(user => {
      return res.send("User deleted");
    })
    .catch(err => {
      return res.status(404).send("User not found");
    });
  };