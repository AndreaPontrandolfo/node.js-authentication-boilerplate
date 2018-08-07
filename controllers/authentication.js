/// jwt-simple è il token creation package
const jwt = require("jwt-simple");
const { hashPass } = require("./_helpers");
//// usare dotenv
const config = require('../config');

// - const config = require('../config');

/// The tokenForUser function takes in a user object, and returns an encoded token that is created with a subject (conventionally called sub) set to the user’s id and a timestamp (also conventionally called iat), along with the imported secret
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { sub: user.id, iat: timestamp },
    config.JWT_SECRET
  );
};

/// We are giving a token to the user that passed Auth: Il token viene mandato al frontend
const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  let givingTokenToUser = newUser => {
    res.json({ token: tokenForUser(newUser) });
  };

  let userNotSaved = err => {
    res.json({ error: "Error saving user to database" });
  };

  let catchingError = err => {
    return next(err);
  };

  /// This takes the user password and the salt and returns a promise that resolves to a string that we can pass into our createUser function in place of the plain text password. Then, createUser either resolves to a shiny newUser object to pass into our tokenForUser function to generate and send a token, or the database doesn’t send anything back, and we catch that error

  hashPass(username, email, password, givingTokenToUser, userNotSaved, catchingError);
};

module.exports = { signup, signin };
