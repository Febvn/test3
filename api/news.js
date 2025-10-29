// api/news.js
// Serverless proxy for NewsAPI. Keep your NEWSAPI_KEY in Vercel's environment variables.

export default async function handler(req, res) {
  try {
  const { category, page = '1', pageSize = '10', searchQuery, from, to } = req.query;
    const apiKey = process.env.NEWSAPI_KEY || process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.error('Missing NEWSAPI_KEY');
      return res.status(500).json({ error: 'Missing NEWSAPI_KEY' });
    }

    const endpoint = searchQuery ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';
    const params = new URLSearchParams({ apiKey, page, pageSize });

    if (searchQuery) params.set('q', searchQuery);
    else params.set('country', 'us');

  if (category && category !== 'all') params.set('category', category);
  if (from) params.set('from', from);
  if (to) params.set('to', to);

    const upstream = await fetch(`${endpoint}?${params.toString()}`);
    const text = await upstream.text();

    if (!upstream.ok) {
      console.error('Upstream HTTP error', upstream.status, text);
      return res.status(502).json({ error: 'Upstream NewsAPI error', status: upstream.status, details: text });
    }

    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseErr) {
      console.error('Failed to parse NewsAPI response:', parseErr, 'raw:', text);
      return res.status(502).json({ error: 'Invalid JSON from NewsAPI', details: text.slice(0, 1000) });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
