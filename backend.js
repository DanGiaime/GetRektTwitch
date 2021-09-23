// Create a simple express backend with three routes
// routes are /roast, /pun, /random
// each route returns a random roast, pun

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import fetch from 'node-fetch';

// setup airtable
const apiKey = process.env.AIRTABLE_API_KEY;
const base = 'appgoVvaIEMvF9WWc';
const baseUrl = `https://api.airtable.com/v0/${base}`;


const getRandomRecord = (table, res) => {
  const url = `${baseUrl}/${table}`;
  const options = {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  };
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const roast = data.records[Math.floor(Math.random() * data.records.length)].fields.value;
      res.send(roast);
    })
    .catch(err => console.log(err));
}

// get a random entry from the airtable roasts table
app.get('/roast', (req, res) => {
  const table = 'roasts';
  getRandomRecord(table, res);
});

app.get('/pun', (req, res) => {
  const table = 'puns';
  getRandomRecord(table, res);
});

app.get('/random', (req, res) => {
  let table = 'puns';
  const random = Math.random();
  if (random > 0.85) {
    table = 'roasts';
  }
  getRandomRecord(table, res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
