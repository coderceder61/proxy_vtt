const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing URL param');

  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/vtt'
      }
    });

    res.setHeader('Content-Type', 'text/vtt');
    response.data.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error fetching VTT file');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
