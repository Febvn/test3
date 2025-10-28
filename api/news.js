// api/news.js
// Serverless proxy for NewsAPI. Keep your NEWSAPI_KEY in Vercel's environment variables.

export default async function handler(req, res) {
  try {
    const query = req.query || {};

    // Decide which NewsAPI endpoint to use.
    // If there's a q or date filters, use 'everything', otherwise use 'top-headlines'.
    const useEverything = Boolean(query.q) || Boolean(query.from) || Boolean(query.to);
    let endpoint = useEverything ? 'https://newsapi.org/v2/everything' : 'https://newsapi.org/v2/top-headlines';

    // Build params, but do not rely on client to send apiKey
    const params = new URLSearchParams();

    if (useEverything) {
      // ensure there's at least a q param for everything
      params.set('q', query.q || 'news');
    } else {
      // top-headlines: allow country/category
      if (query.country) params.set('country', query.country);
      if (query.category) params.set('category', query.category);
    }

    if (query.page) params.set('page', query.page);
    if (query.pageSize) params.set('pageSize', query.pageSize);
    if (query.from) params.set('from', query.from);
    if (query.to) params.set('to', query.to);

    // Support multiple environment variable names used in different setups
    const apiKey = process.env.NEWSAPI_KEY || process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;
    if (!apiKey) {
      // Return a helpful message so the frontend can display actionable info
      return res.status(500).json({
        status: 'error',
        message:
          'Server missing NewsAPI key. Please set NEWSAPI_KEY (or VITE_NEWS_API_KEY) in your hosting provider (e.g. Vercel Project Settings -> Environment Variables) and redeploy.'
      });
    }

    params.set('apiKey', apiKey);

    const url = `${endpoint}?${params.toString()}`;

    const newsRes = await fetch(url);
    // If upstream returned non-JSON (or an error), guard with try/catch
    let data;
    try {
      data = await newsRes.json();
    } catch (e) {
      return res.status(502).json({ status: 'error', message: 'Upstream NewsAPI returned invalid JSON' });
    }

    // Forward status and JSON
    return res.status(newsRes.status === 200 ? 200 : newsRes.status).json(data);
  } catch (err) {
    // Provide more context for unexpected server errors
    res.status(500).json({ status: 'error', message: `Server error: ${err.message}` });
  }
}
