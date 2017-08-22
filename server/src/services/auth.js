const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }
    return done(null, user);
  } catch (e) {
    done(e, false);
  }
}));

async function signup({ email, password, req }) {
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already taken');
  }

  const user = new User({ email, password });
  await user.save();

  return new Promise((resolve, reject) => {
    req.logIn(user, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject(err.message);
      } else {
        req.logIn(user, () => resolve(user));
      }
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
