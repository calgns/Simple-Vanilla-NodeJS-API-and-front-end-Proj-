const fs = require('fs');

// POST route
const postTest = async (req, res) => {
  try {
    const data = req.body;
    // await fs.writeFile("./api/data/base.json", JSON.stringify(data, null,  2));
    await fs.promises.writeFile("./api/data/test.json", JSON.stringify(data, null,  2));

  
    console.log("data POST req: ",data);
    res.status(200).send('Data created');
  
  } catch (err) {
    res.status(500).send('Error caught on creating data');
  }
};

const postApiDataBase = async (req, res) => {
  try {
    const data = req.body;

    console.log("data POST req: ",data);
    res.status(200).send('Data created');

  } catch (err) {
    res.status(500).send('Error creating data');
  }
};


module.exports = { postTest, postApiDataBase };