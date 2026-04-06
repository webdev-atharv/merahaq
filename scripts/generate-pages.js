// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MeraHaq â€” Automated Page Generator (Gemini Free API)
//  Runs inside GitHub Actions. Calls Gemini API â†’ saves .html files.
//  Place this file at: scripts/generate-pages.js
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

import fetch from 'node-fetch';
import fs from 'fs';

const API_KEY = process.env.GEMINI_API_KEY;
const FORCE   = process.env.FORCE_REGENERATE === 'true';
const CUSTOM  = process.env.CUSTOM_TOPICS || '';

if (!API_KEY) {
  console.error('âŒ GEMINI_API_KEY secret is not set in GitHub secrets!');
  process.exit(1);
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MASTER TOPIC LIST â€” add more topics here anytime
//  Format: { slug, topic, icon, schedule: 'daily' | 'weekly' | 'monthly' }
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const ALL_TOPICS = [
  // â”€â”€ Government Schemes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { slug: 'pm-awas-yojana-gramin',           topic: 'PM Awas Yojana Gramin',            icon: 'ðŸ ', schedule: 'weekly'  },
  { slug: 'pm-ujjwala-yojana-2',             topic: 'PM Ujjwala Yojana 2.0',            icon: 'ðŸ”¥', schedule: 'weekly'  },
  { slug: 'kisan-credit-card',               topic: 'Kisan Credit Card',                icon: 'ðŸ’³', schedule: 'weekly'  },
  { slug: 'national-pension-scheme',         topic: 'National Pension Scheme',          icon: 'ðŸ‘´', schedule: 'weekly'  },
  { slug: 'stand-up-india',                  topic: 'Stand Up India Scheme',            icon: 'ðŸš€', schedule: 'weekly'  },
  { slug: 'pradhan-mantri-matru-vandana',    topic: 'PM Matru Vandana Yojana',          icon: 'ðŸ¤±', schedule: 'weekly'  },
  { slug: 'poshan-abhiyaan',                 topic: 'POSHAN Abhiyaan',                  icon: 'ðŸ¥—', schedule: 'weekly'  },
  { slug: 'pm-garib-kalyan-yojana',          topic: 'PM Garib Kalyan Anna Yojana',      icon: 'ðŸŒ¾', schedule: 'weekly'  },
  { slug: 'e-shram-card',                    topic: 'e-Shram Card Registration',        icon: 'ðŸ‘·', schedule: 'weekly'  },
  { slug: 'pm-vishwakarma-yojana',           topic: 'PM Vishwakarma Yojana',            icon: 'ðŸ”¨', schedule: 'weekly'  },
  { slug: 'agnipath-scheme',                 topic: 'Agnipath Scheme',                  icon: 'ðŸª–', schedule: 'weekly'  },
  { slug: 'pradhan-mantri-fasal-bima',       topic: 'Pradhan Mantri Fasal Bima Yojana', icon: 'ðŸŒ¿', schedule: 'weekly'  },
  { slug: 'jal-jeevan-mission',              topic: 'Jal Jeevan Mission',               icon: 'ðŸ’§', schedule: 'monthly' },
  { slug: 'swachh-bharat-mission',           topic: 'Swachh Bharat Mission',            icon: 'ðŸ§¹', schedule: 'monthly' },
  { slug: 'startup-india',                   topic: 'Startup India Scheme',             icon: 'ðŸ’¡', schedule: 'monthly' },
  { slug: 'make-in-india',                   topic: 'Make in India Initiative',         icon: 'ðŸ­', schedule: 'monthly' },
  { slug: 'digital-india',                   topic: 'Digital India Programme',          icon: 'ðŸ’»', schedule: 'monthly' },

  // â”€â”€ Legal Rights â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { slug: 'right-to-education',              topic: 'Right to Education Act',           icon: 'ðŸ“š', schedule: 'weekly'  },
  { slug: 'consumer-protection-2019',        topic: 'Consumer Protection Act 2019',     icon: 'ðŸ›¡ï¸', schedule: 'weekly'  },
  { slug: 'posh-act-workplace',              topic: 'POSH Act â€” Workplace Rights',      icon: 'âš–ï¸', schedule: 'weekly'  },
  { slug: 'disability-rights-india',         topic: 'Rights of Persons with Disabilities', icon: 'â™¿', schedule: 'weekly' },
  { slug: 'senior-citizen-rights',           topic: 'Senior Citizen Rights India',      icon: 'ðŸ‘´', schedule: 'weekly'  },
  { slug: 'maternity-benefit-act',           topic: 'Maternity Benefit Act',            icon: 'ðŸ¤°', schedule: 'monthly' },
  { slug: 'minimum-wages-act',               topic: 'Minimum Wages Act India',          icon: 'ðŸ’°', schedule: 'monthly' },
  { slug: 'tenant-rights-india',             topic: 'Tenant Rights India',              icon: 'ðŸ˜ï¸', schedule: 'monthly' },

  // â”€â”€ How-To Guides â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { slug: 'how-to-apply-passport-india',     topic: 'How to Apply for Passport India',  icon: 'ðŸ›‚', schedule: 'monthly' },
  { slug: 'how-to-link-aadhaar-pan',         topic: 'How to Link Aadhaar with PAN',     icon: 'ðŸ”—', schedule: 'monthly' },
  { slug: 'how-to-file-income-tax-return',   topic: 'How to File Income Tax Return',    icon: 'ðŸ’¼', schedule: 'monthly' },
  { slug: 'how-to-apply-driving-licence',    topic: 'How to Apply Driving Licence',     icon: 'ðŸš—', schedule: 'monthly' },
  { slug: 'how-to-apply-birth-certificate',  topic: 'How to Get Birth Certificate',     icon: 'ðŸ‘¶', schedule: 'monthly' },
  { slug: 'how-to-open-jan-dhan-account',    topic: 'How to Open Jan Dhan Account',     icon: 'ðŸ¦', schedule: 'monthly' },
  { slug: 'how-to-apply-caste-certificate',  topic: 'How to Apply for Caste Certificate', icon: 'ðŸ“„', schedule: 'monthly' },
  { slug: 'how-to-file-police-complaint',    topic: 'How to File Police Complaint Online', icon: 'ðŸ‘®', schedule: 'monthly' },
];

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  SCHEDULE LOGIC â€” decides which topics to generate today
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function getTodaysTopics() {
  if (CUSTOM.trim()) {
    const slugs = CUSTOM.split(',').map(s => s.trim()).filter(Boolean);
    return ALL_TOPICS.filter(t => slugs.includes(t.slug));
  }

  const today       = new Date();
  const dayOfWeek   = today.getDay();
  const dayOfMonth  = today.getDate();

  return ALL_TOPICS.filter(t => {
    const fileExists = fs.existsSync(`${t.slug}.html`);
    if (!fileExists) return true;
    if (FORCE)       return true;
    if (t.schedule === 'daily')   return true;
    if (t.schedule === 'weekly')  return dayOfWeek === 1;
    if (t.schedule === 'monthly') return dayOfMonth === 1;
    return false;
  });
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  PROMPT BUILDER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function buildPrompt(topic, slug, icon) {
  return `You are an expert web developer for MeraHaq (merahaq.online) â€” India's free government schemes & rights guide.

Your task: Generate a COMPLETE, production-ready HTML page for the topic: "${topic}"

CRITICAL DESIGN RULES â€” Must match exactly:
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

CONTENT REQUIREMENTS â€” Use only official Indian government data:
1. Full eligibility criteria from official .gov.in sources
2. Exact benefit amounts in â‚¹ with current figures
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
3. Hero section (dark gradient, topic title, verified badge "âœ… Official .gov.in Source")
4. Breadcrumb: Home > Topic
5. At-a-glance box: 3-4 key stats with icons (benefit amount, beneficiaries, ministry)
6. Eligibility criteria section (cards with âœ…/âŒ indicators)
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  GEMINI API CALL â€” FREE tier (gemini-1.5-flash)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
async function generateHTML(topic, slug, icon, attempt = 1) {
  console.log(`  ðŸ“¡ Calling Gemini API (attempt ${attempt})â€¦`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    // Rate limit â€” wait and retry up to 3 times
    if (response.status === 429 && attempt < 3) {
      const wait = attempt * 30000;
      console.log(`  â³ Rate limited. Waiting ${wait / 1000}s before retryâ€¦`);
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

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  SITEMAP UPDATER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
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
    console.log(`\nðŸ—ºï¸  Sitemap updated â€” added ${added} new URL(s).`);
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  HELPERS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
//  MAIN
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
async function main() {
  console.log('\nâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
  console.log('  ðŸ¤– MeraHaq Auto Page Generator (Gemini)');
  console.log(`  ðŸ“… ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
  console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•\n');

  const topics = getTodaysTopics();

  if (topics.length === 0) {
    console.log('âœ… No pages scheduled for today. All done!\n');
    return;
  }

  console.log(`ðŸ“‹ Topics to generate today: ${topics.length}`);
  topics.forEach((t, i) => console.log(`   ${i + 1}. ${t.topic} â†’ ${t.slug}.html`));
  console.log('');

  const successSlugs = [];
  const failed       = [];

  for (let i = 0; i < topics.length; i++) {
    const { slug, topic, icon } = topics[i];
    console.log(`\n[${i + 1}/${topics.length}] ðŸ”§ Generating: ${topic}`);

    try {
      const html = await generateHTML(topic, slug, icon);

      if (!html.includes('<!DOCTYPE') || !html.includes('</html>')) {
        throw new Error('Invalid HTML returned from API');
      }

      fs.writeFileSync(`${slug}.html`, html, 'utf8');
      const sizeKB = (html.length / 1024).toFixed(1);
      console.log(`  âœ… Saved: ${slug}.html (${sizeKB} KB)`);
      successSlugs.push(slug);

    } catch (err) {
      console.error(`  âŒ FAILED: ${topic}`);
      console.error(`     Reason: ${err.message}`);
      failed.push({ topic, slug, error: err.message });
    }

    // Wait 5 seconds between calls (Gemini free tier: 15 req/min)
    if (i < topics.length - 1) {
      console.log('  â³ Waiting 5 seconds before next pageâ€¦');
      await sleep(5000);
    }
  }

  if (successSlugs.length > 0) {
    updateSitemap(successSlugs);
  }

  console.log('\nâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
  console.log('  ðŸ“Š GENERATION SUMMARY');
  console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•');
  console.log(`  âœ… Success : ${successSlugs.length} pages`);
  console.log(`  âŒ Failed  : ${failed.length} pages`);

  if (failed.length > 0) {
    console.log('\n  Failed pages:');
    failed.forEach(f => console.log(`   â€¢ ${f.topic}: ${f.error}`));
  }

  if (successSlugs.length > 0) {
    console.log('\n  Generated files:');
    successSlugs.forEach(s => console.log(`   â€¢ ${s}.html`));
    console.log('\n  ðŸš€ Vercel will auto-deploy in ~30 seconds after push.');
  }

  console.log('â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•\n');

  if (failed.length > 0 && successSlugs.length === 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('ðŸ’¥ Fatal error:', err);
  process.exit(1);
});
