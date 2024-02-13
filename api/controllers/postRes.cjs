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

// Create the server
const patchTest = async(req, res) => {
  try {
    let body = '';

    // Accumulate the request body data
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // Parse the request body once the request is fully received
    req.on('end', async () => {
      // Parse the JSON string into an object
      const update = JSON.parse(body);

      // Read the existing JSON file
      const data = await fs.promises.readFile('./api/data/test.json', 'utf8');
      const dataObj = await JSON.parse(data);
      // Sample JSON object to be updated
      // let dataStore = {
      //   id:  1,
      //   name: 'John Doe',
      //   age:  30
      // };


      // Update the data object with the new values
      Object.assign(dataObj, update);

      // Write the updated object back to the JSON file
      await fs.promises.writeFile('./api/data/test.json', JSON.stringify(dataObj, null, 2));

      // Send a confirmation message as the response
      res.setHeader('Content-Type', 'text/plain');
      res.end('Data updated successfully');
      
    });
  } catch (err) { // Parse the request body once the request is fully received
    // Handle parsing errors
    res.statusCode =  400;
    res.end('Invalid JSON');
  } 
};



module.exports = { postTest, patchTest };