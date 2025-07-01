const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {User} = require('./../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send("No User found with this email");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);


})


function validate(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    return schema.validate(user);
}


module.exports = router;

