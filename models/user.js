require('dotenv').config(); // 👈 add this line FIRST
const Joi = require('joi');
const { required, bool } = require('joi');
const mongoose = require('mongoose');
const { max, unique } = require('underscore');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean
    }
    
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model('User', userSchema);

function ValidateUser(user){
    const schema = Joi.object({
        name: Joi.string().required().min(4).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4).max(255),
        isAdmin: Joi.boolean().required()
    })

    return schema.validate(user);
}

// ✅ Use this for updates
function validateUserUpdate(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(255),
    isAdmin: Joi.boolean()
  }).min(1); // At least one field must be sent

  return schema.validate(user);

}



module.exports = {User, ValidateUser, validateUserUpdate};