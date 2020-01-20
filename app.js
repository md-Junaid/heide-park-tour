const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const routes = require('./server/routes/index');
const connectDB = require('./server/config/db');

// load env vars
dotenv.config({ path: './.env' });

// Body Parse
app.use(bodyParser.json());

// Enable cors
app.use(cors());
// Connect to database
connectDB();

// Routes
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  // here we are configuring dist to serve app files
  app.use('/', serveStatic(path.join(__dirname, '/dist')));
}

// // this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
// res.sendFile(path.join(__dirname, '/dist/index.html'))
// })

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
