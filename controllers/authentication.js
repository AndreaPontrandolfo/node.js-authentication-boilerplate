/// jwt-simple è il token creation package
const jwt = require("jwt-simple");
const {createUser} = require('../actions/signUp');
//// usare dotenv
const config = require('../config');
//// usare bcryptjs
const bcrypt = require('bcrypt');

/// Not working currently
// - const { hashPass } = require("./_helpers");

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

  /// This takes the user password and the salt and returns a promise that resolves to a string that we can pass into our createUser function in place of the plain text password. Then, createUser either resolves to a shiny newUser object to pass into our tokenForUser function to generate and send a token, or the database doesn’t send anything back, and we catch that error

const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  //// Bisogna fare in modo che venga passato anche il created_at nel token
bcrypt.hash(password, 10)
  .then(hash => {
    console.log((`password: ${password}, hash: ${hash}`));
    return createUser(username, email, hash)
      .then((newUser) => {
        res.json({token: tokenForUser(newUser)})
      })
      //// L'err non usato genera un errore di promises. Bisogna correggere perfezionando il flow di questa promise
      .catch((err) => {
        console.log(username + email + hash);
        res.json({error: 'Error saving user to database'})
      })
  })
  .catch((err) => {
    return next(err)
  }) 

};

module.exports = { signup, signin };
