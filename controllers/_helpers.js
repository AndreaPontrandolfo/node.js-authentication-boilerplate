const bcrypt = require('bcryptjs');
const {createUser} = require('../actions/signUp');
const logger = require('../logger');

function comparePass(userPassword, databasePassword, userIsValid, userIsNotValid, error) {
    logger.info("Comparing passwords...");
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
    logger.info("Hashing passwords...");
    bcrypt.hash(password, 10)
    .then((hash) => {
      logger.debug(`password: ${password}, hash: ${hash}`);
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


