const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('./logger');
const basicRoutes = require('./router/routes');
const cors = require('cors');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//// Cancellare
// - app.use(express.static(__dirname + '/AdvancedReduxCode/auth/server/authentication'));
app.use(express.static(path.join(__dirname + '/authentication')));

/// use routes
app.use('/basicRoutes', basicRoutes);

const port = process.env.PORT || 3090;
app.listen(port, () => {
    logger.info(`Server started on port ${port}`)
});
