'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  db = require('./config/db.js'),
  env = require('./config/env'),
  router = require('./router/index');

const app = express();
const PORT = env.PORT;

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));



// Permet d'omettre le .ejs quand on déclare les vues.
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.header('Content-Type', 'text/html');
  next();
});

router(app, db);

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Express listening on port:', PORT);
  });
});