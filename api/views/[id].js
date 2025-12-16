import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';

    const viewKey = `magazine:${id}`;
    const userKey = `viewed:${id}:${ip}`;

    await kv.setnx(viewKey, 0);

    const viewed = await kv.get(userKey);
    if (!viewed) {
      await kv.incr(viewKey);
      await kv.set(userKey, 1, { ex: 86400 });
    }

    const count = await kv.get(viewKey);
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
