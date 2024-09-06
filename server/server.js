require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app')

const port = process.env.PORT
const databaseURL = process.env.DATABASE_URL

mongoose.connect(databaseURL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
