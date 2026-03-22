// =============================================================
// api/contact.js — Vercel Serverless Function
// Place this file at:  /api/contact.js  in your repo root
// =============================================================

// ── Simple in-memory rate limiter (per serverless instance)
// For production scale, replace with Vercel KV or Upstash Redis.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX       = 3;          // max 3 submissions per IP per minute

function isRateLimited(ip) {
  const now  = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, start: now };

  // Reset window if expired
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  // Cleanup stale entries to prevent memory leak in long-lived instances
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap) {
      if (now - val.start > RATE_LIMIT_WINDOW_MS * 2) rateLimitMap.delete(key);
    }
  }

  return entry.count > RATE_LIMIT_MAX;
}

// ── Sanitize: strip all control characters, trim, cap length
function sanitize(val, maxLen = 200) {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\u0000-\u001F\u007F]/g, ' ') // strip control chars
    .trim()
    .slice(0, maxLen);
}

// ── Escape special Telegram MarkdownV2 characters
function escapeTelegram(str) {
  return str.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

// ── CORS allowed origins (only your own domain)
const ALLOWED_ORIGINS = [
  'https://merahaq.online',
  'https://www.merahaq.online',
];

export default async function handler(req, res) {

  // ── CORS: reject requests from unknown origins
  const origin = req.headers['origin'] || '';
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }

  // ── Handle pre-flight OPTIONS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // ── Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // ── Enforce Content-Type
  const ct = req.headers['content-type'] || '';
  if (!ct.includes('application/json')) {
    return res.status(415).json({ success: false, error: 'Unsupported Media Type' });
  }

  // ── Rate limiting by IP
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please wait a minute.' });
  }

  // ── Extract and sanitize inputs
  const body    = req.body || {};
  const topic   = sanitize(body.topic,   100);
  const name    = sanitize(body.name,    100);
  const replyto = sanitize(body.replyto, 100);
  const message = sanitize(body.message, 1000);

  // ── Validate required fields
  if (!message || message.length < 10) {
    return res.status(400).json({ success: false, error: 'Message is too short.' });
  }

  // ── Read env vars
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    // Env vars not configured — log server-side, respond honestly to client
    console.warn('[contact.js] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in environment.');
    // Still return success=false so frontend mailto fallback triggers
    return res.status(503).json({ success: false, error: 'Contact service not configured.' });
  }

  // ── Build Telegram message (plain text — no MarkdownV2 to avoid parse errors)
  const text = [
    '📬 New MeraHaq Message',
    '',
    `Topic:   ${topic   || 'N/A'}`,
    `Name:    ${name    || 'Anonymous'}`,
    `Reply:   ${replyto || 'N/A'}`,
    `IP:      ${ip}`,
    '',
    'Message:',
    message,
  ].join('\n');

  // ── Send to Telegram
  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          chat_id:    CHAT_ID,
          text:       text,
          parse_mode: '', // plain text — intentionally empty to avoid injection
        }),
      }
    );

    if (!telegramRes.ok) {
      const errBody = await telegramRes.text();
      console.error('[contact.js] Telegram API error:', telegramRes.status, errBody);
      // Don't expose Telegram internals to client — return false so mailto fires
      return res.status(200).json({ success: false });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('[contact.js] Network error sending to Telegram:', err);
    return res.status(200).json({ success: false });
  }
  }

