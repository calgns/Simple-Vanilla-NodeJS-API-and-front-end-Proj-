const fs = require('fs');

const getCountry = async(req, res) => {
  try {
    fs.readFile('./api/data/countries.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal - fs country - API Server Error" }));
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } catch (err) {
    console.log("Err catched ~ country: ", err);
  }
}

const getSortedCountries = async(req, res) => {
  try {
    fs.readFile('./api/data/sortCountries.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Internal - fs sorted - API Server Error" }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  } catch (err) {
    console.log("Err catched ~ sortCountries: ", err);
  }
}


module.exports = { getCountry, getSortedCountries };