// ═══════════════════════════════════════════════════════════════
//  MeraHaq — Automated Page Generator (Gemini Free API)
//  Runs inside GitHub Actions. Calls Gemini API → saves .html files.
//  Place this file at: scripts/generate-pages.js
// ═══════════════════════════════════════════════════════════════

import fetch from 'node-fetch';
import fs from 'fs';

const API_KEY = process.env.GEMINI_API_KEY;
const FORCE   = process.env.FORCE_REGENERATE === 'true';
const CUSTOM  = process.env.CUSTOM_TOPICS || '';

// ✅ Daily limit — 3 pages per day
const DAILY_LIMIT = 3;

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY secret is not set in GitHub secrets!');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════
//  MASTER TOPIC LIST
// ═══════════════════════════════════════════════════════════════
const ALL_TOPICS = [
  { slug: 'pm-awas-yojana-gramin',           topic: 'PM Awas Yojana Gramin',            icon: '🏠', schedule: 'weekly'  },
  { slug: 'pm-ujjwala-yojana-2',             topic: 'PM Ujjwala Yojana 2.0',            icon: '🔥', schedule: 'weekly'  },
  { slug: 'kisan-credit-card',               topic: 'Kisan Credit Card',                icon: '💳', schedule: 'weekly'  },
  { slug: 'national-pension-scheme',         topic: 'National Pension Scheme',          icon: '👴', schedule: 'weekly'  },
  { slug: 'stand-up-india',                  topic: 'Stand Up India Scheme',            icon: '🚀', schedule: 'weekly'  },
  { slug: 'pradhan-mantri-matru-vandana',    topic: 'PM Matru Vandana Yojana',          icon: '🤱', schedule: 'weekly'  },
  { slug: 'poshan-abhiyaan',                 topic: 'POSHAN Abhiyaan',                  icon: '🥗', schedule: 'weekly'  },
  { slug: 'pm-garib-kalyan-yojana',          topic: 'PM Garib Kalyan Anna Yojana',      icon: '🌾', schedule: 'weekly'  },
  { slug: 'e-shram-card',                    topic: 'e-Shram Card Registration',        icon: '👷', schedule: 'weekly'  },
  { slug: 'pm-vishwakarma-yojana',           topic: 'PM Vishwakarma Yojana',            icon: '🔨', schedule: 'weekly'  },
  { slug: 'agnipath-scheme',                 topic: 'Agnipath Scheme',                  icon: '🪖', schedule: 'weekly'  },
  { slug: 'pradhan-mantri-fasal-bima',       topic: 'Pradhan Mantri Fasal Bima Yojana', icon: '🌿', schedule: 'weekly'  },
  { slug: 'jal-jeevan-mission',              topic: 'Jal Jeevan Mission',               icon: '💧', schedule: 'monthly' },
  { slug: 'swachh-bharat-mission',           topic: 'Swachh Bharat Mission',            icon: '🧹', schedule: 'monthly' },
  { slug: 'startup-india',                   topic: 'Startup India Scheme',             icon: '💡', schedule: 'monthly' },
  { slug: 'make-in-india',                   topic: 'Make in India Initiative',         icon: '🏭', schedule: 'monthly' },
  { slug: 'digital-india',                   topic: 'Digital India Programme',          icon: '💻', schedule: 'monthly' },
  { slug: 'right-to-education',              topic: 'Right to Education Act',           icon: '📚', schedule: 'weekly'  },
  { slug: 'consumer-protection-2019',        topic: 'Consumer Protection Act 2019',     icon: '🛡️', schedule: 'weekly'  },
  { slug: 'posh-act-workplace',              topic: 'POSH Act — Workplace Rights',      icon: '⚖️', schedule: 'weekly'  },
  { slug: 'disability-rights-india',         topic: 'Rights of Persons with Disabilities', icon: '♿', schedule: 'weekly' },
  { slug: 'senior-citizen-rights',           topic: 'Senior Citizen Rights India',      icon: '👴', schedule: 'weekly'  },
  { slug: 'maternity-benefit-act',           topic: 'Maternity Benefit Act',            icon: '🤰', schedule: 'monthly' },
  { slug: 'minimum-wages-act',               topic: 'Minimum Wages Act India',          icon: '💰', schedule: 'monthly' },
  { slug: 'tenant-rights-india',             topic: 'Tenant Rights India',              icon: '🏘️', schedule: 'monthly' },
  { slug: 'how-to-apply-passport-india',     topic: 'How to Apply for Passport India',  icon: '🛂', schedule: 'monthly' },
  { slug: 'how-to-link-aadhaar-pan',         topic: 'How to Link Aadhaar with PAN',     icon: '🔗', schedule: 'monthly' },
  { slug: 'how-to-file-income-tax-return',   topic: 'How to File Income Tax Return',    icon: '💼', schedule: 'monthly' },
  { slug: 'how-to-apply-driving-licence',    topic: 'How to Apply Driving Licence',     icon: '🚗', schedule: 'monthly' },
  { slug: 'how-to-apply-birth-certificate',  topic: 'How to Get Birth Certificate',     icon: '👶', schedule: 'monthly' },
  { slug: 'how-to-open-jan-dhan-account',    topic: 'How to Open Jan Dhan Account',     icon: '🏦', schedule: 'monthly' },
  { slug: 'how-to-apply-caste-certificate',  topic: 'How to Apply for Caste Certificate', icon: '📄', schedule: 'monthly' },
  { slug: 'how-to-file-police-complaint',    topic: 'How to File Police Complaint Online', icon: '👮', schedule: 'monthly' },
];

// ═══════════════════════════════════════════════════════════════
//  SCHEDULE LOGIC
// ═══════════════════════════════════════════════════════════════
function getTodaysTopics() {
  if (CUSTOM.trim()) {
    const slugs = CUSTOM.split(',').map(s => s.trim()).filter(Boolean);
    return ALL_TOPICS.filter(t => slugs.includes(t.slug)).slice(0, DAILY_LIMIT);
  }

  const today      = new Date();
  const dayOfWeek  = today.getDay();
  const dayOfMonth = today.getDate();

  const scheduled = ALL_TOPICS.filter(t => {
    const fileExists = fs.existsSync(`${t.slug}.html`);
    if (!fileExists) return true;
    if (FORCE)       return true;
    if (t.schedule === 'daily')   return true;
    if (t.schedule === 'weekly')  return dayOfWeek === 1;
    if (t.schedule === 'monthly') return dayOfMonth === 1;
    return false;
  });

  if (scheduled.length > DAILY_LIMIT) {
    console.log(`⚠️  ${scheduled.length} pages scheduled but capping to ${DAILY_LIMIT}/day.`);
    return scheduled.slice(0, DAILY_LIMIT);
  }

  return scheduled;
}

// ═══════════════════════════════════════════════════════════════
//  PROMPT BUILDER — simplified to avoid token cutoff
// ═══════════════════════════════════════════════════════════════
function buildPrompt(topic, slug, icon) {
  return `You are a web developer for MeraHaq (merahaq.online) — India's free government schemes guide.

Generate a COMPLETE HTML page for: "${topic}" (icon: ${icon})

STRICT RULES:
- Output ONLY valid HTML. No markdown. No backticks. No explanations.
- The HTML MUST be complete — starting with <!DOCTYPE html> and ending with </html>
- Keep total output UNDER 4000 words to avoid cutoff
- Mobile responsive

DESIGN (match exactly):
- Background: #f8f3eb, Navy: #1a1a2e, Orange: #e05c1a, Green: #22a876
- Font: system-ui, sans-serif (no external fonts needed)
- Sticky nav: background #1a1a2e, orange bottom border, logo "MeraHaq"
- Cards: white background, border-radius 12px, box-shadow

REQUIRED SECTIONS (keep each section SHORT):
1. Head: title, meta description, canonical (https://merahaq.online/${slug}), AdSense (ca-pub-7633997088146449), GA4 (G-SP7DL5SNJW)
2. Nav: links to /, /blog, /about, /contact
3. Hero: dark gradient, topic title, "Official .gov.in Source" badge
4. Quick facts: 3 key stats (benefit amount, who qualifies, ministry)
5. Eligibility: simple bulleted list
6. Benefits: what you get in ₹
7. How to apply: 4-5 numbered steps with official portal link
8. Required documents: simple list
9. Helpline: official phone number
10. FAQ: 4 questions with answers
11. Footer: links to /, /about, /contact, /privacy-policy, /blog
12. Disclaimer: "Not affiliated with any government body"

Canonical URL: https://merahaq.online/${slug}
Topic: ${topic}

Output ONLY the HTML file starting with <!DOCTYPE html> and ending with </html>.`;
}

// ═══════════════════════════════════════════════════════════════
//  GEMINI API CALL
// ═══════════════════════════════════════════════════════════════
async function generateHTML(topic, slug, icon, attempt = 1) {
  console.log(`  📡 Calling Gemini API (attempt ${attempt})…`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(topic, slug, icon) }] }],
      generationConfig: {
        maxOutputTokens: 65536,
        temperature: 0.5,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    if ((response.status === 429 || response.status === 503) && attempt < 5) {
      const wait = attempt * 90000;
      console.log(`  ⏳ Server busy (${response.status}). Waiting ${wait / 1000}s…`);
      await sleep(wait);
      return generateHTML(topic, slug, icon, attempt + 1);
    }
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const raw  = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!raw) throw new Error('Empty response from Gemini API');

  // Extract pure HTML
  const m1 = raw.match(/```html\s*([\s\S]*?)```/i);
  const m2 = raw.match(/(<!DOCTYPE[\s\S]*<\/html>)/i);
  if (m1) return m1[1].trim();
  if (m2) return m2[1].trim();
  return raw.trim();
}

// ═══════════════════════════════════════════════════════════════
//  SITEMAP UPDATER
// ═══════════════════════════════════════════════════════════════
function updateSitemap(newSlugs) {
  const sitemapPath = 'sitemap.xml';
  let xml = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, 'utf8')
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;

  const today = new Date().toISOString().split('T')[0];
  let added = 0;

  for (const slug of newSlugs) {
    const url = `https://merahaq.online/${slug}`;
    if (xml.includes(url)) continue;
    const entry = `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    xml = xml.replace('</urlset>', entry + '</urlset>');
    added++;
  }

  if (added > 0) {
    fs.writeFileSync(sitemapPath, xml, 'utf8');
    console.log(`\n🗺️  Sitemap updated — added ${added} new URL(s).`);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  🤖 MeraHaq Auto Page Generator');
  console.log(`  📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
  console.log('══════════════════════════════════════════════\n');

  const topics = getTodaysTopics();

  if (topics.length === 0) {
    console.log('✅ No pages scheduled for today.\n');
    return;
  }

  console.log(`📋 Generating today: ${topics.map(t => t.slug).join(', ')}\n`);

  const successSlugs = [];
  const failed       = [];

  for (let i = 0; i < topics.length; i++) {
    const { slug, topic, icon } = topics[i];
    console.log(`\n[${i + 1}/${topics.length}] 🔧 ${topic}`);

    try {
      const html = await generateHTML(topic, slug, icon);

      if (!html.includes('</html>')) {
        throw new Error('HTML appears to be cut off — missing </html> tag');
      }

      fs.writeFileSync(`${slug}.html`, html, 'utf8');
      const sizeKB = (html.length / 1024).toFixed(1);
      console.log(`  ✅ Saved: ${slug}.html (${sizeKB} KB)`);
      successSlugs.push(slug);

    } catch (err) {
      console.error(`  ❌ FAILED: ${topic} — ${err.message}`);
      failed.push({ topic, slug, error: err.message });
    }

    if (i < topics.length - 1) {
      console.log('  ⏳ Waiting 65s before next page…');
      await sleep(65000);
    }
  }

  if (successSlugs.length > 0) updateSitemap(successSlugs);

  console.log(`\n✅ Done — ${successSlugs.length} success, ${failed.length} failed\n`);

  if (failed.length > 0 && successSlugs.length === 0) process.exit(1);
}

main().catch(err => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
      
