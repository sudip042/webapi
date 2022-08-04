const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({

    fullname: {
        type: String
    },
    email: {
        type: String
    },
    phonenumber: {
        type: String
    },
    address: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    // cnfpassword: {
    //     type: String
    // },
    usertype: {
        type: String
    },

    tokens: [{ token: { type: String } }]

})

userSchema.statics.test = function (user, pass) {
    console.log(user)
    console.log(pass)
}

userSchema.statics.checkCrediantialsDb = async (user, password) => {
    const user1 = await User.findOne({ username: user, password: password });
    if (user1) {
      return user1;
    }
  };
  
  userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "bookcarservicing", {
      expiresIn: "60m"
    });
    console.log(token);
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
  
    return token;
  };
// const User = mongoose.model('users', userSchema)
const User = mongoose.model('user', userSchema);


module.exports = User;
    //User is const name