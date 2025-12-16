import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing magazine id' });
    }

    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';

    const viewKey = `magazine:${id}`;
    const userKey = `viewed:${id}:${ip}`;

    // Ensure counter exists
    await kv.setnx(viewKey, 0);

    const alreadyViewed = await kv.get(userKey);

    if (!alreadyViewed) {
      await kv.incr(viewKey);
      await kv.set(userKey, 1, { ex: 86400 }); // 24h
    }

    const count = await kv.get(viewKey);

    return res.status(200).json({ count });
  } catch (err) {
    console.error('KV ERROR:', err);
    return res.status(500).json({ error: err.message });
  }
}
