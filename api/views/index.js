import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const keys = await kv.keys('magazine:*');
    const counts = {};

    for (const key of keys) {
      const id = key.split(':')[1];
      counts[id] = await kv.get(key);
    }

    return res.status(200).json(counts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
