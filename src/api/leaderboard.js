const express = require('express');
const router = express.Router();
require('dotenv').config();
// api/getLeaderboard.js (Serverless function on Vercel)
router.get('/leaderboard', async (req, res) => {
  try {
    // Use the API key stored in environment variables
    const apiKey = process.env.API_KEY;
    // console.log(`Using API key: ${apiKey}`);

    // Prepare the payload including your API key
    const payload = {
      api_key: apiKey
    };

    // Make a POST request to your backend leaderboard endpoint
    const backendResponse = await fetch('https://computle-backend.vercel.app/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Get the JSON data from your backend
    const data = await backendResponse.json();

    // Return the data to the front-end
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;