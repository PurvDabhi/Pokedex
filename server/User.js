const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
  confirmPassword: { 
    type: String, required: true
  },
  termsAgreed: {
    type: Boolean, required: false
  }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel