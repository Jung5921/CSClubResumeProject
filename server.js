const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 4000;

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, or replace with specific frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow these HTTP methods
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  res.sendStatus(204); // No content response for preflight
});

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Get")
});

app.post('/', (req, res) => {
  // Read the current visit count from visitData.json
  fs.readFile('./traffic.json', 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading visit data');
      }
      console.log('File read')
      // Parse the data and increment the visit count
      let visitData = JSON.parse(data);
      visitData.visits++;
      console.log('visit count updated')
      // Write the updated visit count back to the JSON file
      fs.writeFile('./traffic.json', JSON.stringify(visitData), (err) => {
          if (err) {
              return res.status(500).send('Error saving visit data');
          }
          // Send a response back with the updated visit count
          res.json({ visitCount: visitData.visits });
      });
      console.log(`Request received: ${req.method} ${req.url}`);
  });
});

/*
app.use((req, res, next) => {
    // Read the traffic.json file
    fs.readFile('traffic.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading traffic file:', err);
        return next(err);
      }
  
      // Parse the JSON data
      const trafficData = JSON.parse(data);
  
      // Increment the visit count
      trafficData.visits++;

      // Write the updated data back to the file
      fs.writeFile('traffic.json', JSON.stringify(trafficData), (err) => {
        if (err) {
          console.error('Error writing to traffic file:', err);
        }
      });
  
      console.log(`Traffic count updated: ${trafficData.visits} visits`);
    });
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
*/



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});