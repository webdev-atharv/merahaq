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

// ✅ Daily limit — stays within Gemini free tier quota (3 pages = ~4 min total with waits)
const DAILY_LIMIT = 3;

if (!API_KEY) {
  console.error('❌ GEMINI_API_KEY secret is not set in GitHub secrets!');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════
//  MASTER TOPIC LIST — add more topics here anytime
//  Format: { slug, topic, icon, schedule: 'daily' | 'weekly' | 'monthly' }
// ═══════════════════════════════════════════════════════════════
const ALL_TOPICS = [
  // ── Government Schemes ──────────────────────────────────────
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

  // ── Legal Rights ─────────────────────────────────────────────
  { slug: 'right-to-education',              topic: 'Right to Education Act',           icon: '📚', schedule: 'weekly'  },
  { slug: 'consumer-protection-2019',        topic: 'Consumer Protection Act 2019',     icon: '🛡️', schedule: 'weekly'  },
  { slug: 'posh-act-workplace',              topic: 'POSH Act — Workplace Rights',      icon: '⚖️', schedule: 'weekly'  },
  { slug: 'disability-rights-india',         topic: 'Rights of Persons with Disabilities', icon: '♿', schedule: 'weekly' },
  { slug: 'senior-citizen-rights',           topic: 'Senior Citizen Rights India',      icon: '👴', schedule: 'weekly'  },
  { slug: 'maternity-benefit-act',           topic: 'Maternity Benefit Act',            icon: '🤰', schedule: 'monthly' },
  { slug: 'minimum-wages-act',               topic: 'Minimum Wages Act India',          icon: '💰', schedule: 'monthly' },
  { slug: 'tenant-rights-india',             topic: 'Tenant Rights India',              icon: '🏘️', schedule: 'monthly' },

  // ── How-To Guides ─────────────────────────────────────────────
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
//  SCHEDULE LOGIC — decides which topics to generate today
//  ✅ Capped at DAILY_LIMIT to stay within Gemini free quota
// ═══════════════════════════════════════════════════════════════
function getTodaysTopics() {
  if (CUSTOM.trim()) {
    const slugs = CUSTOM.split(',').map(s => s.trim()).filter(Boolean);
    const customTopics = ALL_TOPICS.filter(t => slugs.includes(t.slug));
    // Still cap custom topics to DAILY_LIMIT
    return customTopics.slice(0, DAILY_LIMIT);
  }

  const today       = new Date();
  const dayOfWeek   = today.getDay();
  const dayOfMonth  = today.getDate();

  const scheduled = ALL_TOPICS.filter(t => {
    const fileExists = fs.existsSync(`${t.slug}.html`);
    if (!fileExists) return true;   // Always generate missing pages
    if (FORCE)       return true;
    if (t.schedule === 'daily')   return true;
    if (t.schedule === 'weekly')  return dayOfWeek === 1;
    if (t.schedule === 'monthly') return dayOfMonth === 1;
    return false;
  });

  // ✅ Cap to DAILY_LIMIT — prevents quota exceeded errors
  if (scheduled.length > DAILY_LIMIT) {
    console.log(`⚠️  ${scheduled.length} pages scheduled but capping to ${DAILY_LIMIT}/day (free tier limit).`);
    console.log(`   Remaining ${scheduled.length - DAILY_LIMIT} pages will generate on future days.\n`);
    return scheduled.slice(0, DAILY_LIMIT);
  }

  return scheduled;
}

// ═══════════════════════════════════════════════════════════════
//  PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════
function buildPrompt(topic, slug, icon) {
  return `You are an expert web developer for MeraHaq (merahaq.online) — India's free government schemes & rights guide.

Your task: Generate a COMPLETE, production-ready HTML page for the topic: "${topic}"

CRITICAL DESIGN RULES — Must match exactly:
- Colors: Background #f8f3eb, Navy #1a1a2e, Orange #e05c1a, Gold #f2a900, Green #22a876
- Fonts: Playfair Display (serif headings), Nunito (body), JetBrains Mono (mono/labels)
- Nav: sticky, #1a1a2e background, 3px #e05c1a bottom border, logo "Mera<span style='color:#e05c1a'>Haq</span>"
- Cards: white, 2px #e8e0d5 border, 16px border-radius, hover: transform translateY(-4px)
- Hero: linear-gradient(135deg, #1a1a2e, #2d2d5e, #1a1a2e)
- Section labels: JetBrains Mono, 0.7rem, #a03a08, uppercase, letterSpacing 3px
- Section titles: Playfair Display, 900 weight, #1a1a2e, em tags in #e05c1a
- Benefit boxes: background #fdf6e3, border rgba(242,169,0,0.3), color #7a4f00
- How-to boxes: background #f0faf6, border-left 3px solid #22a876
- Footer: #1a1a2e, 4-column grid

CONTENT REQUIREMENTS — Use only official Indian government data:
1. Full eligibility criteria from official .gov.in sources
2. Exact benefit amounts in ₹ with current figures
3. Official helpline numbers (verified)
4. Step-by-step application process with official portal links
5. Required documents list
6. Important deadlines/dates if any
7. FAQ section (at least 5 real questions)
8. Schema.org structured data (FAQPage + Article)
9. Open Graph meta tags
10. Canonical URL: https://merahaq.online/${slug}

PAGE STRUCTURE (follow this exactly):
1. <head> with complete SEO meta, OG tags, Schema.org JSON-LD, Google Fonts, AdSense (ca-pub-7633997088146449), GA4 (G-SP7DL5SNJW)
2. Nav (same as homepage with links to /, /about, /blog)
3. Hero section (dark gradient, topic title, verified badge "✅ Official .gov.in Source")
4. Breadcrumb: Home > Topic
5. At-a-glance box: 3-4 key stats with icons (benefit amount, beneficiaries, ministry)
6. Eligibility criteria section (cards with ✅/❌ indicators)
7. Benefits section (what you get, in benefit-box style)
8. Required Documents (styled doc chips)
9. Step-by-step application guide (numbered, with official portal links)
10. Helpline section (dark background, JetBrains Mono phone numbers in #f2a900)
11. FAQ section (expandable accordions with FAQ Schema)
12. Related pages grid (link to 3-4 related MeraHaq pages)
13. Footer (same 4-column footer as homepage)
14. Cookie consent banner (same as homepage)

Icon for this topic: ${icon}
Slug: ${slug}

IMPORTANT:
- Make content 100% accurate from official sources (myscheme.gov.in, india.gov.in, respective ministry sites)
- Include "Last updated" timestamp and source citations
- Mobile responsive (same breakpoints as homepage)
- All external links go to official .gov.in domains only
- Add MeraHaq's disclaimer at bottom

Output ONLY the complete HTML file, starting with <!DOCTYPE html>. No explanations. No markdown. No backticks.`;
}

// ═══════════════════════════════════════════════════════════════
//  GEMINI API CALL — gemini-1.5-flash (stable free tier model)
// ═══════════════════════════════════════════════════════════════
async function generateHTML(topic, slug, icon, attempt = 1) {
  console.log(`  📡 Calling Gemini API (attempt ${attempt})…`);

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildPrompt(topic, slug, icon) }] }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    // Rate limit — wait and retry up to 3 times
    if ((response.status === 429 || response.status === 503) && attempt < 3) {
      const wait = attempt * 60000;
      console.log(`  ⏳ Server busy (${response.status}). Waiting ${wait / 1000}s before retry…`);
      await sleep(wait);
      return generateHTML(topic, slug, icon, attempt + 1);
    }
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();

  // Extract text from Gemini response format
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!raw) throw new Error('Empty response from Gemini API');

  // Extract pure HTML (remove markdown code fences if present)
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
  let xml = '';

  if (fs.existsSync(sitemapPath)) {
    xml = fs.readFileSync(sitemapPath, 'utf8');
  } else {
    xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;
  }

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

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('\n══════════════════════════════════════════════');
  console.log('  🤖 MeraHaq Auto Page Generator (Gemini)');
  console.log(`  📅 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
  console.log(`  📊 Daily limit: ${DAILY_LIMIT} pages (free tier)`);
  console.log('══════════════════════════════════════════════\n');

  const topics = getTodaysTopics();

  if (topics.length === 0) {
    console.log('✅ No pages scheduled for today. All done!\n');
    return;
  }

  console.log(`📋 Topics to generate today: ${topics.length}`);
  topics.forEach((t, i) => console.log(`   ${i + 1}. ${t.topic} → ${t.slug}.html`));
  console.log('');

  const successSlugs = [];
  const failed       = [];

  for (let i = 0; i < topics.length; i++) {
    const { slug, topic, icon } = topics[i];
    console.log(`\n[${i + 1}/${topics.length}] 🔧 Generating: ${topic}`);

    try {
      const html = await generateHTML(topic, slug, icon);

      if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
        throw new Error('Invalid HTML returned from API');
      }

      fs.writeFileSync(`${slug}.html`, html, 'utf8');
      const sizeKB = (html.length / 1024).toFixed(1);
      console.log(`  ✅ Saved: ${slug}.html (${sizeKB} KB)`);
      successSlugs.push(slug);

    } catch (err) {
      console.error(`  ❌ FAILED: ${topic}`);
      console.error(`     Reason: ${err.message}`);
      failed.push({ topic, slug, error: err.message });
    }

    // Wait 65 seconds between calls (Gemini free tier is strict on RPM)
    if (i < topics.length - 1) {
      console.log('  ⏳ Waiting 65 seconds before next page (free tier rate limit)…');
      await sleep(65000);
    }
  }

  if (successSlugs.length > 0) {
    updateSitemap(successSlugs);
  }

  console.log('\n══════════════════════════════════════════════');
  console.log('  📊 GENERATION SUMMARY');
  console.log('══════════════════════════════════════════════');
  console.log(`  ✅ Success : ${successSlugs.length} pages`);
  console.log(`  ❌ Failed  : ${failed.length} pages`);

  if (failed.length > 0) {
    console.log('\n  Failed pages:');
    failed.forEach(f => console.log(`   • ${f.topic}: ${f.error}`));
  }

  if (successSlugs.length > 0) {
    console.log('\n  Generated files:');
    successSlugs.forEach(s => console.log(`   • ${s}.html`));
    console.log('\n  🚀 Vercel will auto-deploy in ~30 seconds after push.');
  }

  console.log('══════════════════════════════════════════════\n');

  if (failed.length > 0 && successSlugs.length === 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
