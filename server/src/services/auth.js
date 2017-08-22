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
      return done(null, false, 'Invalid Credentials');
    }
    user.comparePassword(passport, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, 'Invalid Credentials');
    });
  } catch (e) {
    done(e);
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

async function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid Credentials');
      } else {
        req.logIn(user, () => resolve(user));
      }
    })({ body: { email, passport } });
  });
}

module.exports = { signup, login };
