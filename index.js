// Main starting point of the application
const express = require('express');
const path = require('path');
//// Cancellare
const http = require('http');
//// Cancellare
const bodyParser = require('body-parser');
const morgan = require('morgan');
const basicRoutes = require('./router/routes');
// - const router = require('./router');
const cors = require('cors');

const app = express();

// App Setup
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
// - router(app);

//// Cancellare
// - app.use(express.static(__dirname + '/AdvancedReduxCode/auth/server/authentication'));
app.use(express.static(path.join(__dirname + '/authentication')));

//index route
/* app.get("/", (req, res) => {
    res.send('Hey there');
}); */

// use routes
app.use('/basicRoutes', basicRoutes);



// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
