export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const { topic, name, message, replyto } = req.body || {};

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ success: false });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram env vars not set.');
    return res.status(200).json({ success: true });
  }

  const text = `📬 New MeraHaq Message\n\nTopic: ${topic || 'N/A'}\nName: ${name || 'Anonymous'}\nReply: ${replyto || 'N/A'}\n\nMessage:\n${message.substring(0, 1000)}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram error:', err);
    return res.status(200).json({ success: true });
  }
}
