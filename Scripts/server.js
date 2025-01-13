const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 4000;

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); 
    res.sendStatus(204); 
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Get")
});

app.post('/Scripts/server', (req, res) => {
    // Read the current visit count from visitData.json
    fs.readFile('./JSON/traffic.json', 'utf8', (err, data) => {
    if (err) {
        return res.status(500).send('Error reading visit data');
    }
    console.log('File read')
    // Parse the data and increment the visit count
    let visitData = JSON.parse(data);
    visitData.visits++;
    console.log('visit count updated')
    // Write the updated visit count back to the JSON file
        fs.writeFile('./JSON/traffic.json', JSON.stringify(visitData), (err) => {
            if (err) {
                return res.status(500).send('Error saving visit data');
            }
            // Send a response back with the updated visit count
            res.json({ visitCount: visitData.visits });
        });
    console.log(`Request received: ${req.method} ${req.url}`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
