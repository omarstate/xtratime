const mongoose = require('mongoose');
const {User, ValidateUser, validateUserUpdate} = require('./../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const users = await User.find({});
    if(!users) return res.status(404).send('No Users Found!');

    res.send(users);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send("User with the give id not found!");

    res.send(_.pick(user, ["name", "email", "isAdmin"]));
})

router.post('/', async (req, res) => {
    // 1.Validate the inputs
    const { error } = ValidateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // 2. Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already registered.");

    // 3. Create the User and Save it
    user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

     const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // 4. Send the response
    const token = await user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ["name", "email", "isAdmin"]));    
})

router.patch('/:id', async (req, res, next) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id ,req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).send("User with the given id not found!");

  res.send(_.pick(user, ["name", "email", "isAdmin"]));
});

router.delete('/:id', async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).send("User with the given id is not found!");

    res.send(user);
})


module.exports = router;