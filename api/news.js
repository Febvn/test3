// api/news.js
// Serverless proxy for NewsAPI. Keep your NEWSAPI_KEY in Vercel's environment variables.

export default async function handler(req, res) {
  try {
    const { category, page = '1', pageSize = '8', searchQuery, from, to } = req.query;
    const apiKey = process.env.NEWSAPI_KEY || process.env.VITE_NEWS_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing NEWSAPI_KEY' });

    const isSearch = Boolean(searchQuery);
    const endpoint = isSearch ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';
    const params = new URLSearchParams({ apiKey, page, pageSize });

    if (isSearch) {
      // /everything accepts q, from, to, but NOT category
      params.set('q', searchQuery);
      if (from) params.set('from', from);
      if (to) params.set('to', to);
    } else {
      // top-headlines: country + optional category
      params.set('country', 'us');
      if (category && category !== 'all') params.set('category', category);
    }

    const upstream = await fetch(`${endpoint}?${params.toString()}`);
    const text = await upstream.text();

    if (!upstream.ok) {
      console.error('Upstream NewsAPI error', upstream.status, text);
      return res.status(502).json({ error: 'Upstream NewsAPI error', status: upstream.status, details: text });
    }

    const data = text ? JSON.parse(text) : null;
    return res.status(200).json(data);
  } catch (err) {
    console.error('API handler error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
