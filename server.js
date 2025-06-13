
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const N8N_WEBHOOK = process.env.N8N_WEBHOOK_URL;

app.get('/api/leads', async (req, res) => {
  try {
    if (N8N_WEBHOOK) {
      const { data } = await axios.post(N8N_WEBHOOK);
      return res.json(data);
    } else {
      throw new Error('N8N webhook not configured, using mock');
    }
  } catch (e) {
    console.log('Falling back to mock database...');
    const mockPath = path.join(__dirname, 'salesforce-agent-database.json');
    const mockData = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));
    res.json(mockData);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
