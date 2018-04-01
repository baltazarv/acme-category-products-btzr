const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || '3000';
const db = require('./db');

app.use(require('body-parser').json());

db.sync()
  .then(() => db.seed());

app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(path.join(__dirname, '/dist')));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
