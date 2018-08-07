const bcrypt = require('bcryptjs');
const {createUser} = require('../actions/signUp');
const logger = require('../logger');

function comparePass(userPassword, databasePassword, userIsValid, userIsNotValid) {
  logger.info("Comparing passwords...");
  return bcrypt.compare(userPassword, databasePassword)
  .then((validPassword) => {
      if (validPassword) {
          logger.info("User successfully authenticated!");
          return userIsValid;
      }
      logger.info("Rejecting the login attempt.");
      return userIsNotValid;
  })
  .catch(err => {throw new Error('operation failed')})
  .catch(err => logger.error(err)) 
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


