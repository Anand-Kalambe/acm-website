import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const keys = await kv.keys('magazine:*');
    const result = {};

    for (const key of keys) {
      const id = key.split(':')[1];
      result[id] = await kv.get(key);
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
