const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const tweetsRoutes =  require('./routes/tweetRoutes');
const app = express();

const port = config.get('app.port');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.get('app.database'))
  .then(async () => {
    app.use(express.json()) // for parsing application/json
    app.use('/api/v1', tweetsRoutes);
    app.listen(port, () => {
      console.log(`tweets app listening at http://localhost:${port}`)
    });
  })
  .catch((err) => {
    console.error('error when starting application', err);
  });
