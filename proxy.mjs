import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = 5500;

// Define the API base URL
const apiBaseUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api';

// Handle all incoming requests
app.use('/', async (req, res) => {
  try {
    const url = apiBaseUrl + req.url;

    // Fetch the data from the external API
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization
      },
      body: req.method === 'GET' ? null : JSON.stringify(req.body)
    });

    // Parse and send the response from the external API back to the client
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'An error occurred while making the request.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
