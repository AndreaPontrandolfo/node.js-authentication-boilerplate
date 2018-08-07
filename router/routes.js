const express = require('express');
const auth = require('./authentication');
/// in passportService sono contenute le nostre strategie di autenticazione 
const passport = require('passport');
const passportService = require('../services/passport');

/// we are setting session to false because JWTs don’t require sessions on the server
const requireAuth = passport.authenticate('jwt', { session: false });

/// Grider original code
/* 
module.exports = function(app) {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
} 
*/

const routes = express.Router();

routes.get('/', requireAuth, (req, res) => res.send("you found me!"))
routes.use('/auth', auth);

module.exports = routes;