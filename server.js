const express = require('express');
const mongoose = require('mongoose');

const shortUrls = require('./models/shortUrl');

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const PORT = 5000 || process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  const shortUrl = await shortUrls.find();
  res.render('index', {shortUrl});
});

app.post('/shortUrls', async (req, res) => {
  await shortUrls.create({full: req.body.fullUrl});
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
  const shortOne = await shortUrls.findOne({
    short: req.params.shortUrl
  });

  if (shortOne === null)
    return res.sendStatus(404);

  shortOne.clicks++;
  shortOne.save();

  res.status(308);
  res.redirect(shortOne.full);
});

app.listen(PORT, () => {
  console.log(`\nApp is listening on http://localhost:${PORT}\n`);
});