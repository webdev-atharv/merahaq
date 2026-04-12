const fs = require('fs');
const path = require('path');

const PUBLISHER_ID = 'ca-pub-7633997088146449';
const SITE_URL = 'https://merahaq.online';

// ── MOBILE CSS ──────────────────────────────────────────
const MOBILE_CSS = `<style id="mhfix">
@media(max-width:768px){
  html,body{overflow-x:hidden!important;width:100%!important}
  *{box-sizing:border-box}
  nav{padding:0 1rem!important;height:54px!important}
  .nav-btn{display:none!important}
  .nav-links{display:none!important}
  .hamburger{display:flex!important}
  .logo{font-size:1.15rem!important;flex:1}
  .hero{padding:2rem 1rem 1.5rem!important}
  .hero h1{font-size:1.55rem!important;line-height:1.2!important}
  .hero-sub{font-size:0.9rem!important;line-height:1.65!important;text-align:left!important}
  .hero-badge{font-size:0.68rem!important;padding:5px 10px!important}
  .breadcrumb{font-size:0.64rem!important}
  .content-sec{padding:1.25rem 1rem!important}
  .content-sec p{line-height:1.75!important;font-size:0.93rem!important;text-align:left!important}
  .content-sec h2{font-size:1.2rem!important}
  .content-sec h3{font-size:1rem!important}
  .content-sec ul,.content-sec ol{margin-left:1.2rem!important;line-height:1.75!important}
  .key-facts{grid-template-columns:1fr 1fr!important;gap:0.75rem!important}
  .tip-grid{grid-template-columns:1fr!important}
  .related-grid{grid-template-columns:1fr!important}
  .fact-card{padding:0.9rem!important}
  .fact-card .num{font-size:1.5rem!important}
  .compare-table{display:block!important;overflow-x:auto!important;font-size:0.8rem!important}
  .highlight-box,.info-box,.warn-box{padding:0.9rem 1rem!important;font-size:0.88rem!important;line-height:1.7!important}
  .ad-slot{min-height:0!important;height:auto!important;padding:0.25rem!important;margin:0.75rem 0!important;overflow:hidden!important}
  .apply-bar{padding:1.75rem 1rem!important}
  .apply-bar h3{font-size:1.15rem!important}
  .apply-btns{flex-direction:column!important;align-items:stretch!important;gap:0.75rem!important}
  .apply-btn{width:100%!important;justify-content:center!important;text-align:center!important}
  .faq-q{padding:0.85rem 1rem!important}
  .faq-q-text{font-size:0.84rem!important}
  .faq-a{padding:0 1rem 0.85rem!important;font-size:0.84rem!important}
  .related-sec{padding:2rem 1rem!important}
  .sec-title{font-size:1.25rem!important}
  .foot-inner{grid-template-columns:1fr!important;gap:1.5rem!important}
  .foot-bottom{flex-direction:column!important;text-align:center!important}
  footer{padding:2rem 1rem!important}
  .disclaimer{padding:1rem!important}
  .steps-list li{gap:0.75rem!important}
}
@media(max-width:480px){
  .hero h1{font-size:1.35rem!important}
  .key-facts{grid-template-columns:1fr!important}
}
</style>`;

// ── HELPERS ─────────────────────────────────────────────
function getAllHtmlFiles(dir) {
  const files = [];
  const skip = ['index.html','about.html','contact.html','privacy-policy.html','disclaimer.html','404.html'];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...getAllHtmlFiles(full));
    } else if (item.endsWith('.html') && !skip.includes(item)) {
      files.push(full);
    }
  }
  return files;
}

function fixAdSense(html) {
  // Add publisher ID if missing in adsbygoogle tags
  return html.replace(/data-ad-client="ca-pub-\d+"/g, `data-ad-client="ca-${PUBLISHER_ID}"`);
}

function ensureAdSenseScript(html) {
  if (html.includes('adsbygoogle.js') || html.includes('googlesyndication')) return html;
  const tag = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${PUBLISHER_ID}" crossorigin="anonymous"></script>`;
  return html.replace('</head>', tag + '\n</head>');
}

function fixMobile(html) {
  html = html.replace(/<style id="mhfix">[\s\S]*?<\/style>/g, '');
  return html.replace('</head>', MOBILE_CSS + '\n</head>');
}

function fixPageSpeed(html) {
  // Add loading=lazy to any images
  html = html.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');
  return html;
}

// ── GENERATE SITEMAP ─────────────────────────────────────
function generateSitemap(htmlFiles) {
  const today = new Date().toISOString().split('T')[0];
  const urls = [`  <url><loc>${SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority><lastmod>${today}</lastmod></url>`];
  for (const f of htmlFiles) {
    const name = path.basename(f);
    const slug = name.replace('.html', '');
    urls.push(`  <url><loc>${SITE_URL}/${name}</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>${today}</lastmod></url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ── GENERATE ROBOTS.TXT ──────────────────────────────────
function generateRobots() {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml`;
}

// ── MAIN ─────────────────────────────────────────────────
console.log('Starting MeraHaq full fix...\n');
const allFiles = getAllHtmlFiles('.');
let fixed = 0;

for (const file of allFiles) {
  let html = fs.readFileSync(file, 'utf8');
  html = fixMobile(html);
  html = fixAdSense(html);
  html = ensureAdSenseScript(html);
  html = fixPageSpeed(html);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✅ Fixed: ${path.basename(file)}`);
  fixed++;
}

// Write sitemap
const sitemap = generateSitemap(allFiles);
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
console.log('✅ Generated: sitemap.xml');

// Write robots.txt
fs.writeFileSync('robots.txt', generateRobots(), 'utf8');
console.log('✅ Generated: robots.txt');

console.log(`\n🎉 Done! Fixed ${fixed} pages + sitemap + robots.txt`);
