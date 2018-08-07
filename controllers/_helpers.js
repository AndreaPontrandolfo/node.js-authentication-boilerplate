const bcrypt = require('bcryptjs');
const {createUser} = require('../actions/signUp');

function comparePass(userPassword, databasePassword, userIsValid, userIsNotValid, error) {
    console.log("Comparing passwords...");
  return bcrypt.compare(userPassword, databasePassword)
  .then((validPassword) => {
      if (validPassword) {
          return userIsValid;
      }
      return userIsNotValid;
  })
  .catch(err => error);
}

function hashPass(username, email, password, givingTokenToUser, userNotSaved, catchingError) {
    console.log("Hashing passwords...");
    bcrypt.hash(password, 10)
    .then((hash) => {
      return createUser(username, email, hash)
      .then(givingTokenToUser)
      .catch(userNotSaved)
    })
    .catch(catchingError)
};


module.exports = {
  comparePass,
  hashPass
};


