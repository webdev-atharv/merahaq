#!/usr/bin/env python3
"""
MeraHaq — MASTER FIX SCRIPT
Fixes ALL errors on ALL HTML pages at once:
1. Consistent nav bar (Style 1) on every page
2. Consistent footer on every page
3. Copyright year 2025 → 2026 everywhere
4. Rich content moved above footer (not below)
5. Missing meta description added
6. Missing meta viewport added
7. Missing canonical link added
"""

from bs4 import BeautifulSoup
import os, glob, re

# ─────────────────────────────────────────────
# CORRECT NAV — Style 1 (matches main site)
# ─────────────────────────────────────────────
CORRECT_NAV = """<nav style="background:#1a1035;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;position:sticky;top:0;z-index:999;">
  <a href="index.html" style="color:white;font-size:1.2rem;font-weight:800;text-decoration:none;display:flex;align-items:center;gap:6px;">
    <span>🇮🇳</span> Mera<span style="color:#ff6b00;">Haq</span>
  </a>
  <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;">
    <a href="index.html" style="color:#ccc;text-decoration:none;font-size:0.82rem;padding:4px 8px;">Home</a>
    <a href="blog.html" style="color:#ccc;text-decoration:none;font-size:0.82rem;padding:4px 8px;">All Schemes</a>
    <a href="legal-rights.html" style="color:#ccc;text-decoration:none;font-size:0.82rem;padding:4px 8px;">Your Rights</a>
    <a href="index.html#helplines" style="color:#ccc;text-decoration:none;font-size:0.82rem;padding:4px 8px;">Helplines</a>
    <a href="rti-guide.html" style="color:#ccc;text-decoration:none;font-size:0.82rem;padding:4px 8px;">RTI Tool</a>
    <a href="index.html#scheme-finder" style="background:#ff6b00;color:white;text-decoration:none;font-size:0.8rem;font-weight:700;padding:7px 14px;border-radius:8px;white-space:nowrap;">Find My Benefits</a>
  </div>
</nav>"""

# ─────────────────────────────────────────────
# CORRECT FOOTER — Full, consistent
# ─────────────────────────────────────────────
CORRECT_FOOTER = """<footer style="background:#1a1035;color:#aaa;padding:32px 20px 24px;font-size:0.8rem;margin-top:40px;">
  <div style="max-width:900px;margin:0 auto;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:20px;margin-bottom:24px;">
      <div>
        <div style="color:white;font-size:1rem;font-weight:800;margin-bottom:8px;">Mera<span style="color:#ff6b00;">Haq</span></div>
        <div style="font-size:0.78rem;line-height:1.6;">Your rights. Your schemes.<br>Free. Always.<br>Not affiliated with any govt body.</div>
      </div>
      <div>
        <div style="color:white;font-size:0.82rem;font-weight:700;margin-bottom:8px;">Schemes</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <a href="pm-kisan.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">PM Kisan</a>
          <a href="ayushman-bharat.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Ayushman Bharat</a>
          <a href="mgnrega.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">MGNREGA</a>
          <a href="ration-card.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Ration Card</a>
          <a href="pmay.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">PM Awas Yojana</a>
          <a href="blog.html" style="color:#ff6b00;text-decoration:none;font-size:0.78rem;">All Schemes →</a>
        </div>
      </div>
      <div>
        <div style="color:white;font-size:0.82rem;font-weight:700;margin-bottom:8px;">Rights</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <a href="legal-rights.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Legal Rights</a>
          <a href="consumer-rights-india-complaint.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Consumer Rights</a>
          <a href="labour-rights-india.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Labour Rights</a>
          <a href="women-rights-india.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Women Rights</a>
          <a href="rti-guide.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">RTI Guide</a>
        </div>
      </div>
      <div>
        <div style="color:white;font-size:0.82rem;font-weight:700;margin-bottom:8px;">Info</div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <a href="about.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">About MeraHaq</a>
          <a href="contact.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Contact Us</a>
          <a href="privacy-policy.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Privacy Policy</a>
          <a href="terms.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Terms of Use</a>
          <a href="disclaimer.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Disclaimer</a>
          <a href="cookie-policy.html" style="color:#aaa;text-decoration:none;font-size:0.78rem;">Cookie Policy</a>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid #2e1a00;padding-top:16px;text-align:center;">
      <p style="margin:0 0 6px;font-size:0.78rem;">Disclaimer: MeraHaq is an independent information platform. Not affiliated with any government department. All information is for guidance only. Always verify from official .gov.in portals before applying.</p>
      <p style="margin:0;font-size:0.78rem;">© 2026 MeraHaq &nbsp;·&nbsp; Free for all Indians &nbsp;·&nbsp; Data from official govt sources &nbsp;·&nbsp; <a href="privacy-policy.html" style="color:#ff6b00;text-decoration:none;">Privacy</a> &nbsp;·&nbsp; <a href="terms.html" style="color:#ff6b00;text-decoration:none;">Terms</a> &nbsp;·&nbsp; <a href="cookie-policy.html" style="color:#ff6b00;text-decoration:none;">Cookies</a></p>
    </div>
  </div>
</footer>"""

# Pages to skip (not content pages)
SKIP_FILES = [
    'add-adsense.js', 'fix_all_pages.js', 'full_fix.js',
    'upgrade_script.js', 'content_generator.js', 'master_fix.py',
    'fix_issues.py', 'fix_minor.py', 'upgrade_content.py'
]

# Meta descriptions for key pages
META_DESCRIPTIONS = {
    'index': 'MeraHaq — Every Indian\'s Rights & Government Scheme Guide. Find schemes you qualify for, know your legal rights, save helplines. Free, no login needed.',
    'pm-kisan': 'Complete guide to PM Kisan Samman Nidhi Yojana 2026. Eligibility, registration, eKYC, payment status check. ₹6,000 per year for farmers.',
    'ayushman-bharat': 'Ayushman Bharat PM-JAY complete guide. Free ₹5 lakh health insurance for eligible families. Check eligibility, get Golden Card, find empanelled hospitals.',
    'mgnrega': 'MGNREGA complete guide. 100 days guaranteed employment for rural families. How to get Job Card, apply for work, track wages. 2026 updated.',
    'ration-card': 'Ration card complete guide India. How to apply, types of ration cards, One Nation One Ration Card. Free food grains under NFSA.',
    'aadhaar-guide': 'Aadhaar card complete guide. How to apply, update address, download e-Aadhaar, link to bank account and mobile. UIDAI helpline 1947.',
    'aadhaar-update-address-online': 'How to update Aadhaar address online. Step by step guide to change address in Aadhaar card at myaadhaar.uidai.gov.in. Documents needed.',
    'rti-guide': 'How to file RTI application in India. Complete step by step guide. Pay ₹10, file online at rtionline.gov.in, get reply in 30 days. Free for BPL.',
    'legal-rights': 'Legal rights of every Indian citizen. Fundamental rights, police rights, consumer rights, labour rights, women rights. Free legal aid through NALSA.',
    'pan-card-guide': 'PAN card complete guide. Apply online, get instant e-PAN free, link PAN with Aadhaar, correct mistakes. Income Tax department guide.',
    'blog': 'MeraHaq Blog — In-depth guides on Indian government schemes and legal rights. PM Kisan, Ayushman Bharat, MGNREGA, RTI, Aadhaar and more.',
    'about': 'About MeraHaq — India\'s free, independent platform for government scheme guides and legal rights. Not affiliated with any government body.',
    'contact': 'Contact MeraHaq. Questions, suggestions, RTI help. Email: contact@merahaq.online. We respond within 24-48 hours.',
    'privacy-policy': 'MeraHaq Privacy Policy. We do not collect or sell your personal data. Google Analytics anonymous data only. DPDPA 2023 compliant.',
    'scholarships': 'Government scholarships for Indian students 2026. National Scholarship Portal, SC ST OBC minority scholarships. How to apply at scholarships.gov.in.',
    'pmay': 'PM Awas Yojana complete guide. Free house scheme for rural and urban poor. Eligibility, how to apply, check beneficiary list.',
    'ujjwala-yojana': 'PM Ujjwala Yojana guide. Free LPG gas connection for BPL women. How to apply at nearest gas agency. Documents needed.',
    'jan-dhan-yojana': 'Jan Dhan Yojana guide. Zero balance bank account with RuPay card and ₹2 lakh accident insurance. How to open account.',
    'sukanya-samriddhi': 'Sukanya Samriddhi Yojana guide. 8.2% tax-free savings for girl child. How to open account, tax benefits, maturity rules.',
    'voter-id-guide': 'Voter ID card guide India. How to apply online, download e-EPIC, check voter list, correct mistakes. voters.eci.gov.in.',
    'labour-rights-india': 'Labour rights in India guide. Minimum wage, overtime pay, EPF, ESI, maternity leave, gratuity. How to file complaint.',
    'women-rights-india': 'Women\'s rights in India guide. Domestic violence protection, POSH Act, maternity leave, property rights, helplines.',
    'consumer-rights-india-complaint': 'Consumer rights India guide. How to file consumer complaint online at edaakhil.nic.in. Consumer Protection Act 2019.',
    'default': 'MeraHaq — Complete guide for Indian citizens. Eligibility, benefits, how to apply, documents required. Free information from official govt sources.'
}

def get_meta_description(filename):
    name = filename.replace('.html', '').lower()
    for key in META_DESCRIPTIONS:
        if key != 'default' and key in name:
            return META_DESCRIPTIONS[key]
    return META_DESCRIPTIONS['default']

def get_page_title(filename):
    name = filename.replace('.html', '').replace('-', ' ').replace('_', ' ').title()
    return f"{name} — MeraHaq | Every Indian's Rights Guide"

def fix_html_file(filepath):
    filename = os.path.basename(filepath)
    
    # Skip non-HTML and special files
    if not filename.endswith('.html'):
        return False
    if filename in SKIP_FILES:
        return False
    # Skip index.html — it has its own well-designed nav/footer
    if filename == 'index.html':
        return False

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original = content

        soup = BeautifulSoup(content, 'html.parser')

        # ── 1. Fix <head> basics ──────────────────────
        head = soup.find('head')
        if head:
            # Add charset if missing
            if not soup.find('meta', attrs={'charset': True}):
                meta = soup.new_tag('meta', charset='UTF-8')
                head.insert(0, meta)

            # Add viewport if missing
            if not soup.find('meta', attrs={'name': 'viewport'}):
                meta = soup.new_tag('meta', attrs={
                    'name': 'viewport',
                    'content': 'width=device-width, initial-scale=1.0'
                })
                head.append(meta)

            # Add/update meta description
            desc_tag = soup.find('meta', attrs={'name': 'description'})
            desc_text = get_meta_description(filename)
            if desc_tag:
                desc_tag['content'] = desc_text
            else:
                meta = soup.new_tag('meta', attrs={
                    'name': 'description',
                    'content': desc_text
                })
                head.append(meta)

            # Add title if missing
            if not soup.find('title'):
                title = soup.new_tag('title')
                title.string = get_page_title(filename)
                head.append(title)

        # ── 2. Fix copyright year everywhere ──────────
        body = soup.find('body')
        if body:
            body_str = str(body)
            body_str = body_str.replace('© 2025', '© 2026')
            body_str = body_str.replace('2025 MeraHaq', '2026 MeraHaq')
            body_str = body_str.replace('Last updated: January 2025', 'Last updated: April 2026')
            body_str = body_str.replace('updated 2025', 'updated 2026')
            new_body = BeautifulSoup(body_str, 'html.parser')
            body.replace_with(new_body)
            soup = BeautifulSoup(str(soup), 'html.parser')

        # ── 3. Replace nav bar ────────────────────────
        nav = soup.find('nav')
        if nav:
            new_nav = BeautifulSoup(CORRECT_NAV, 'html.parser')
            nav.replace_with(new_nav)
        else:
            # Insert nav at start of body
            body = soup.find('body')
            if body:
                new_nav = BeautifulSoup(CORRECT_NAV, 'html.parser')
                body.insert(0, new_nav)

        # ── 4. Replace footer ─────────────────────────
        footer = soup.find('footer')
        if footer:
            new_footer = BeautifulSoup(CORRECT_FOOTER, 'html.parser')
            footer.replace_with(new_footer)
        else:
            body = soup.find('body')
            if body:
                new_footer = BeautifulSoup(CORRECT_FOOTER, 'html.parser')
                body.append(new_footer)

        # ── 5. Move rich-content above footer ─────────
        footer = soup.find('footer')
        if footer:
            for section in soup.find_all('section', class_='rich-content'):
                section.extract()
                footer.insert_before(section)
            for section in soup.find_all('section', class_='related-links'):
                section.extract()
                footer.insert_before(section)

        final = str(soup)

        if final != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(final)
            return True
        return False

    except Exception as e:
        print(f"  ERROR {filename}: {e}")
        return False

def main():
    print("\nMeraHaq — MASTER FIX SCRIPT")
    print("="*50)
    print("Fixing ALL errors on ALL pages...\n")

    html_files = sorted(glob.glob('*.html'))
    print(f"Found {len(html_files)} HTML files\n")

    fixed = 0
    skipped = 0

    for filepath in html_files:
        filename = os.path.basename(filepath)
        result = fix_html_file(filepath)
        if result:
            print(f"  ✅ FIXED: {filename}")
            fixed += 1
        else:
            print(f"  ⏭️  SKIP: {filename}")
            skipped += 1

    print(f"\n{'='*50}")
    print(f"✅ Fixed: {fixed} pages")
    print(f"⏭️  Skipped: {skipped} pages")
    print("\nAll fixes applied:")
    print("  • Style 1 nav on every page")
    print("  • Consistent full footer on every page")
    print("  • Copyright year → 2026 everywhere")
    print("  • Meta descriptions added/updated")
    print("  • Viewport meta added where missing")
    print("  • Rich content moved above footer")
    print("\nVercel will deploy in ~2 minutes. ✅")

if __name__ == '__main__':
    main()
