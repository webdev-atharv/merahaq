// add-adsense.js
// Run this script once to add AdSense code to all HTML files
// Usage: node add-adsense.js

const fs = require('fs');
const path = require('path');

const ADSENSE_CODE = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7633997088146449" crossorigin="anonymous"></script>`;

// Get all HTML files in current directory
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Skip if AdSense code already exists
  if (content.includes('ca-pub-7633997088146449')) {
    console.log(`SKIPPED (already has AdSense): ${file}`);
    skipped++;
    return;
  }

  // Insert after <head> tag
  if (content.includes('<head>')) {
    content = content.replace('<head>', `<head>\n  ${ADSENSE_CODE}`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`UPDATED: ${file}`);
    updated++;
  } else {
    console.log(`SKIPPED (no <head> tag): ${file}`);
    skipped++;
  }
});

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
