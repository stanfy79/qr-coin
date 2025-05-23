const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API route
app.get('/api/scrape', async (req, res) => {
  const targetUrl = 'https://qrcoin.fun';
  const selector = '.truncate.font-medium';

  try {
    const { data } = await axios.get(targetUrl);
    const $ = cheerio.load(data);
    const scrapedData = $(selector).text().trim();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ data: scrapedData || 'No data found' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or parse data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
