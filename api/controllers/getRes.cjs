const fs = require('node:fs');
const path = require('node:path');

const dataPath = (file) => path.join(__dirname, '../data', file);

// GET route
const getBase = async (req, res) => {
  try {
    fs.readFile(dataPath("base.json"), 'utf8', (err, data) => { // IRMÃO!!! PADRONIZA APARTIR DA ROOT DA PASTA 
      if (err) return res.status(500).send('FS could not read data');
      res.status(200);
      res.send(JSON.parse(data));
    })
  } catch (err) {
    res.status(500).send('Error reading data');
  }
};

const getTest = async (req, res) => {
  try {
    fs.readFile(dataPath("test.json"), 'utf8', (err, data) => { // IRMÃO!!! PADRONIZA APARTIR DA ROOT DA PASTA 
      if (err) return res.status(500).send('FS could not rebad data').end();
      res.status(200).send(JSON.parse(data)).end();
    })
  } catch (err) {
    res.status(500).send('Error reading data').end();
  }
};

const getCountries =  async (req, res) => {
  try {
    const data = fs.readFile(dataPath("countries.json"), 'utf8');

    res.status(200).send(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading data');
  }
};

const getSortedCountries = async (req, res) => {
  try {
    const data = fs.readFile(dataPath("sortCountries.json"), 'utf8');
    res.send(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading data');
  }
};


module.exports = { getBase, getTest, getCountries, getSortedCountries };