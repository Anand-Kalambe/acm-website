// api/index.js
const express = require('express');
const { kv } = require('@vercel/kv'); // Import Vercel KV
const app = express();

app.use(express.json());

// GET all views
app.get('/api/views', async (req, res) => {
    // Fetch all keys starting with 'magazine:'
    const keys = await kv.keys('magazine:*');
    const counts = {};
    
    for (const key of keys) {
        const id = key.split(':')[1]; // Extract ID from "magazine:1"
        const value = await kv.get(key);
        counts[id] = value;
    }
    
    res.json(counts);
});

// POST (Increment view)
app.post('/api/views/:id', async (req, res) => {
    const { id } = req.params;
    
    // INCR increments the number at this key by 1. 
    // If it doesn't exist, it starts at 0 then adds 1.
    const newCount = await kv.incr(`magazine:${id}`);
    
    res.json({ success: true, count: newCount });
});

// Export the app for Vercel Serverless
module.exports = app;