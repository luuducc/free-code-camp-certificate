require('dotenv').config();
const dns = require('node:dns');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { URL } = require('url')
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let shortUrl = -1
let urlMapper = {}
app.post('/api/shorturl?', (req, res) => {
  const { url: inputUrl } = req.body
  let parsedUrl
  try {
    parsedUrl = new URL(inputUrl)
  } catch (err) {
    return res.json({error: 'invalid url'})
  }

  const { hostname } = parsedUrl
  dns.lookup(hostname, (err, address, family) => {
    if (err) { return res.json({"error": "invalid url"}) }
    if (!(inputUrl in urlMapper)) {
      shortUrl++
      urlMapper[inputUrl] = shortUrl
    }
    
    res.json({
      "original_url": inputUrl,
      "short_url": shortUrl
    })
  });
})

app.get('/api/shorturl/:value', (req, res) => {
  const { value } = req.params
  if (!Object.values(urlMapper).includes(Number(value))) {
    return res.json({"error": "No short URL found for the given input"})
  } 
  res.redirect(Object.keys(urlMapper)[value])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
