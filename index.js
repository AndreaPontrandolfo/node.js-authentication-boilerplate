const express = require('express');
const path = require('path');
//// Cancellare
const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicRoutes = require('./router/routes');
const cors = require('cors');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
// - router(app);

//// Cancellare
// - app.use(express.static(__dirname + '/AdvancedReduxCode/auth/server/authentication'));
app.use(express.static(path.join(__dirname + '/authentication')));

// use routes
app.use('/basicRoutes', basicRoutes);

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
    console.log((`Server started on port ${port}`));
});
