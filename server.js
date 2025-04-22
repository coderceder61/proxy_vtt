const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url, { responseType: 'stream' });
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/vtt');
    response.data.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching file');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy running at port ${PORT}`));
