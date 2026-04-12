const fs = require('fs');
const path = require('path');

// Mobile CSS to inject into every inner page
const MOBILE_CSS = `
<style id="mobile-fix">
/* ===== MERAHAQ MOBILE FIX ===== */
@media(max-width:768px){
  html,body{overflow-x:hidden !important;width:100% !important}
  *{box-sizing:border-box}

  /* NAVBAR - hide button, show hamburger only */
  nav{padding:0 1rem !important;height:54px !important}
  .nav-btn{display:none !important}
  .nav-links{display:none !important}
  .hamburger{display:flex !important}
  .logo{font-size:1.15rem !important;flex:1}

  /* HERO - fix text alignment and spacing */
  .hero{padding:2rem 1rem 1.5rem !important}
  .hero h1{font-size:1.55rem !important;line-height:1.2 !important;text-align:center}
  .hero h1 em{font-size:inherit !important}
  .hero-sub{font-size:0.9rem !important;line-height:1.65 !important;text-align:left !important;margin:0 0 1rem !important}
  .hero-badge{font-size:0.68rem !important;padding:5px 10px !important}
  .breadcrumb{font-size:0.64rem !important;padding:0 !important}

  /* CONTENT - fix line height and text */
  .content-sec{padding:1.25rem 1rem !important}
  .content-sec p{line-height:1.75 !important;font-size:0.93rem !important;text-align:left !important}
  .content-sec h2{font-size:1.2rem !important}
  .content-sec h3{font-size:1rem !important}
  .content-sec ul,.content-sec ol{margin-left:1.2rem !important;line-height:1.75 !important}

  /* CARDS & GRIDS */
  .key-facts{grid-template-columns:1fr 1fr !important;gap:0.75rem !important}
  .tip-grid{grid-template-columns:1fr !important}
  .related-grid{grid-template-columns:1fr !important}
  .fact-card{padding:0.9rem !important}
  .fact-card .num{font-size:1.5rem !important}

  /* TABLE - horizontal scroll */
  .compare-table{display:block !important;overflow-x:auto !important;-webkit-overflow-scrolling:touch !important;font-size:0.8rem !important;white-space:nowrap}

  /* BOXES */
  .highlight-box,.info-box,.warn-box{padding:0.9rem 1rem !important;font-size:0.88rem !important;line-height:1.7 !important}

  /* AD SLOTS - no huge empty boxes */
  .ad-slot{min-height:0 !important;height:auto !important;padding:0.25rem !important;margin:0.75rem 0 !important;overflow:hidden !important}

  /* APPLY BAR */
  .apply-bar{padding:1.75rem 1rem !important}
  .apply-bar h3{font-size:1.15rem !important}
  .apply-btns{flex-direction:column !important;align-items:stretch !important;gap:0.75rem !important}
  .apply-btn{width:100% !important;justify-content:center !important;text-align:center !important;padding:12px 16px !important}

  /* FAQ */
  .faq-q{padding:0.85rem 1rem !important}
  .faq-q-text{font-size:0.84rem !important}
  .faq-a{padding:0 1rem 0.85rem !important;font-size:0.84rem !important}

  /* RELATED SECTION */
  .related-sec{padding:2rem 1rem !important}
  .sec-title{font-size:1.25rem !important}

  /* FOOTER */
  .foot-inner{grid-template-columns:1fr !important;gap:1.5rem !important}
  .foot-bottom{flex-direction:column !important;text-align:center !important;gap:0.25rem !important}
  footer{padding:2rem 1rem !important}
  .disclaimer{padding:1rem !important}

  /* STEPS */
  .steps-list li{gap:0.75rem !important}
}

@media(max-width:480px){
  .hero h1{font-size:1.35rem !important}
  .key-facts{grid-template-columns:1fr !important}
}
</style>`;

// Skip list - never touch these
const SKIP = ['index.html','about.html','contact.html','privacy-policy.html','disclaimer.html','404.html'];

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

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Remove old mobile-fix style if already injected (for re-runs)
  html = html.replace(/<style id="mobile-fix">[\s\S]*?<\/style>/g, '');

  // Inject mobile CSS before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', MOBILE_CSS + '\n</head>');
    fs.writeFileSync(file, html, 'utf8');
    console.log(`✅ Fixed: ${path.basename(file)}`);
    fixed++;
  } else {
    console.log(`⚠️  Skipped (no </head>): ${path.basename(file)}`);
  }
}

console.log(`\n🎉 Done! Fixed ${fixed} pages.`);
