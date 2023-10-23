const User = require('../Models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { secret } = require('../.env'); 

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  //  email is already registered
  User.findOne({ email: email }).then((err, user) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      console.log(err)
    } else if (user) {
      res.status(400).send('Email already registered');
    } else {
      // Create a new user
      const newUser = new User({ username, email, password });

      // Save the user to the database
      newUser.save().then((err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).send('User created');
        }
      });
    }
  });
};

exports.login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(400).send('Invalid username or password');
    }

    const token = jwt.sign(user.toJSON(), secret);
    res.json({ token });
  })(req, res);
};
