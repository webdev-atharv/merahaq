const fs = require('fs');
const path = require('path');

// ── MOBILE CSS (exact same fix as pm-awas-yojana-gramin.html) ──
const MOBILE_CSS = `
<style id="mobile-fix">
@media(max-width:768px){
  html,body{overflow-x:hidden !important;width:100% !important}
  *{box-sizing:border-box}
  nav{padding:0 1rem;height:54px}
  .nav-btn{display:none !important}
  .hamburger{display:flex !important}
  .nav-links{display:none !important}
  .logo{font-size:1.2rem}
  .hero{padding:2rem 1rem 1.5rem}
  .hero h1{font-size:1.45rem;line-height:1.2}
  .hero-sub{font-size:0.88rem;line-height:1.5 !important;text-align:left}
  .hero-badge{font-size:0.68rem;padding:5px 12px}
  .breadcrumb{font-size:0.65rem;padding:0 0.5rem}
  .content-sec{padding:1.5rem 1rem}
  .content-sec h2{font-size:1.2rem}
  .content-sec p{font-size:0.93rem;line-height:1.55 !important}
  .content-sec ul,.content-sec ol{margin-left:1rem}
  .content-sec li{line-height:1.55 !important}
  .key-facts{display:grid !important;grid-template-columns:1fr 1fr !important;gap:0.6rem !important;width:100% !important;overflow:hidden !important}
  .fact-card{padding:0.85rem 0.5rem !important;width:100% !important;min-width:0 !important}
  .fact-card .num{font-size:1.3rem !important;word-break:break-word !important}
  .ad-slot{min-height:0 !important;height:auto !important;padding:0 !important;margin:0.25rem 0 !important;border:none !important;background:transparent !important;overflow:hidden !important}
  .ad-label{display:none !important}
  ins.adsbygoogle{min-height:0 !important}
  .tip-grid{grid-template-columns:1fr !important}
  .related-grid{grid-template-columns:1fr !important}
  .compare-table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;font-size:0.8rem}
  .highlight-box,.info-box,.warn-box{padding:1rem;font-size:0.9rem;line-height:1.55}
  .apply-bar{padding:2rem 1rem}
  .apply-bar h3{font-size:1.2rem}
  .apply-btns{flex-direction:column;align-items:stretch}
  .apply-btn{width:100%;justify-content:center;text-align:center}
  .faq-q{padding:0.9rem 1rem}
  .faq-q-text{font-size:0.85rem}
  .faq-a{padding:0 1rem 0.9rem;font-size:0.85rem;line-height:1.55}
  .related-sec{padding:2rem 1rem}
  .sec-title{font-size:1.3rem}
  .foot-inner{grid-template-columns:1fr 1fr !important;gap:1rem !important}
  .foot-col a{min-height:32px !important;margin-bottom:0.15rem !important}
  .foot-bottom{flex-direction:column;text-align:center}
  .rich-content p,.rich-content li{line-height:1.55 !important}
}
@media(max-width:480px){
  .hero h1{font-size:1.3rem}
  .key-facts{grid-template-columns:1fr 1fr !important}
  .fact-card .num{font-size:1.2rem !important}
  .foot-inner{grid-template-columns:1fr !important}
}
</style>`;

// ── FIX INLINE ISSUES IN EACH FILE ──
function fixInline(html) {
  // Fix line-height:2 → 1.65 (too stretched on all screens)
  html = html.replace(/line-height:2([^\.0-9])/g, 'line-height:1.65$1');
  // Fix ad slot outer wrapper padding
  html = html.replace(/(<div style="background:#f8f3eb;padding:)0\.5rem 1rem(")/g, '$10.25rem 1rem$2');
  // Fix key-facts outer div padding
  html = html.replace(/(<div style="background:#1a1a2e;padding:)2rem(")/g, '$11.5rem 1rem$2');
  // Fix adsbygoogle style to prevent empty box
  html = html.replace(/(style="display:block")(\s*data-full-width)/g, 'style="display:block;min-height:0"$2');
  html = html.replace(/(style="display:block")(\s*><\/ins>)/g, 'style="display:block;min-height:0"$2');
  return html;
}

// ── SKIP THESE FILES ──
const SKIP = ['index.html','about.html','contact.html','privacy-policy.html','disclaimer.html','404.html','terms.html','cookie-policy.html'];

function getAllHtmlFiles(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...getAllHtmlFiles(full));
    } else if (item.endsWith('.html') && !SKIP.includes(item)) {
      files.push(full);
    }
  }
  return files;
}

const files = getAllHtmlFiles('.');
let fixed = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Remove any old mobile-fix style first (clean re-run)
  html = html.replace(/<style id="mobile-fix">[\s\S]*?<\/style>\n?/g, '');

  // Apply inline fixes
  html = fixInline(html);

  // Inject mobile CSS before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', MOBILE_CSS + '\n</head>');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`✅ Fixed: ${path.basename(file)}`);
    fixed++;
  } else {
    console.log(`⚠️  Skipped (no </head>): ${path.basename(file)}`);
    skipped++;
  }
}

console.log(`\n🎉 Done! Fixed ${fixed} pages. Skipped ${skipped}.`);
