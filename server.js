const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/catfact', async (req, res) => {
    const fetch = await import('node-fetch').then(mod => mod.default);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a helpful assistant and gives short fun facts.' }, { role: 'user', content: 'Tell me a short fun cat fact.' }],
            max_tokens: 50
        })
    });

    if (!response.ok) {
        res.status(response.status).send('Error fetching cat fact');
        return;
    }

    const data = await response.json();
    res.json(data.choices[0].message.content.trim());
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
