const express = require('express');
const morgan = require('morgan');
// const fs = require('node:fs');
const path = require('node:path');

const { getBase, getTest, getCountries, getSortedCountries } = require(path.join(__dirname, 'controllers', 'getRes.cjs'));
const { postTest, postApiDataBase } = require(path.join(__dirname, 'controllers', 'postRes.cjs'));

const app = express();

// Configure Morgan for logging
app.use(morgan('dev'));

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get('/base', async (req, res) => await getBase(req, res));
app.get('/test', async (req, res) => await getTest(req, res));
app.get('/countries', async (req, res) => await getCountries(req, res));
app.get('/sort/countries', async (req, res) => await getSortedCountries(req, res));

// POST route
app.post('/test', async (req, res) => await postTest(req, res));

app.post('/api/data', async (req, res) => await postApiDataBase(req, res));

// PATCH route
/* MYSQL
app.patch('/api/data', async (req, res) => {
  try {
    const update = req.body;
    // const dataPath = "./api/data/test.json";
    // const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    // Object.assign(data, update);
    // await fs.writeFile(dataPath, JSON.stringify(data, null,  2));
    res.send('Data updated');
  } catch (err) {
    res.status(500).send('Error updating data');
  }
});
*/

// PUT route
/* MYSQL
app.put('/api/data', async (req, res) => {
  try {
    const data = req.body;
    await fs.writeFile("./api/data/base.json", JSON.stringify(data, null,  2));
    res.send('Data replaced');
  } catch (err) {
    res.status(500).send('Error replacing data');
  }
});
*/

// Start the server
const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
