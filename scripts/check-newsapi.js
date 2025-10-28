#!/usr/bin/env node
// Simple script to validate the NewsAPI key by calling top-headlines.
// Reads `news-portal/.env.local` if present (no external deps required).

import fs from 'fs';
import path from 'path';
import axios from 'axios';

const envPath = path.resolve(process.cwd(), '.env.local');
let key = process.env.NEWSAPI_KEY || process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;

if (!key && fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^\s*(?:NEWSAPI_KEY|VITE_NEWS_API_KEY|NEWS_API_KEY)\s*=\s*(.+)\s*$/i);
    if (m) {
      key = m[1].trim();
      break;
    }
  }
}

if (!key) {
  console.error('No NewsAPI key found. Set NEWSAPI_KEY or VITE_NEWS_API_KEY in .env.local or environment.');
  process.exit(2);
}

(async () => {
  try {
    console.log('Using NewsAPI key:', key ? (key.slice(0,6) + '...') : '(none)');
    const params = new URLSearchParams({ country: 'us', pageSize: '1' });
    params.set('apiKey', key);
    const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
    const res = await axios.get(url);
    console.log('Status:', res.status);
    if (res.data) {
      console.log('Response status field:', res.data.status);
      if (Array.isArray(res.data.articles)) {
        console.log('Articles returned:', res.data.articles.length);
      }
      if (res.data.status !== 'ok') {
        console.error('NewsAPI returned error message:', res.data.message || JSON.stringify(res.data));
        process.exit(3);
      } else {
        console.log('NewsAPI key appears valid (got articles).');
      }
    }
  } catch (err) {
    if (err.response) {
      console.error('HTTP error:', err.response.status, err.response.data);
    } else {
      console.error('Request error:', err.message);
    }
    process.exit(4);
  }
})();
