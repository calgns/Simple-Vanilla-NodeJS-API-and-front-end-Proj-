const fs = require('fs');

const postTest = async(req, res) => {
  try {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', async () => {
      const formatedData =  JSON.stringify(JSON.parse(data), null, 2);

      fs.writeFile('./api/data/test.json', formatedData, (err) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: "Internal - fs country - API Server Error" }));
        } else {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          // console.log("req fs postReq formatedData: ", formatedData);
          res.end(formatedData);
        }
      });
    })
  } catch (err) {
    console.log("Err catched ~ sortCountries: ", err);
  }
}

module.exports = { postTest };