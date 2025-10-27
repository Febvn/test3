import axios from 'axios';

// Serverless proxy for NewsAPI on Vercel.
// Uses VITE_NEWS_API_KEY from environment variables (set in Vercel Project Settings).
export default async function handler(req, res) {
  try {
    const query = req.query || {};

    // Choose endpoint: 'everything' for q/from/to, otherwise 'top-headlines'.
    const useEverything = Boolean(query.q) || Boolean(query.from) || Boolean(query.to);
    const endpoint = useEverything
      ? 'https://newsapi.org/v2/everything'
      : 'https://newsapi.org/v2/top-headlines';

    const params = new URLSearchParams();

    if (useEverything) {
      params.set('q', query.q || 'news');
    } else {
      if (query.country) params.set('country', query.country);
      if (query.category) params.set('category', query.category);
    }

    if (query.page) params.set('page', query.page);
    if (query.pageSize) params.set('pageSize', query.pageSize);
    if (query.from) params.set('from', query.from);
    if (query.to) params.set('to', query.to);

    const apiKey = process.env.VITE_NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message:
          'Server missing VITE_NEWS_API_KEY environment variable. Set VITE_NEWS_API_KEY in Vercel Project Settings -> Environment Variables.'
      });
    }

    params.set('apiKey', apiKey);
    const url = `${endpoint}?${params.toString()}`;

    const apiResponse = await axios.get(url);
    return res.status(200).json(apiResponse.data);
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal mengambil data dari News API',
      error: error.message
    });
  }
}
