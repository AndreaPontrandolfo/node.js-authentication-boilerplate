const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('./logger');
const basicRoutes = require('./router/routes');
const cors = require('cors');

const app = express();

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(
  morgan(morganFormat, {
    skip: function(req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr
  })
);

app.use(
  morgan(morganFormat, {
    skip: function(req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout
  })
);

//// Cancellare
// - app.use(express.static(__dirname + '/AdvancedReduxCode/auth/server/authentication'));
app.use(express.static(path.join(__dirname + '/authentication')));

/// use routes
app.use('/basicRoutes', basicRoutes);

const port = process.env.PORT || 3090;
app.listen(port, () => {
    logger.info(`Server started on port ${port}`)
});
