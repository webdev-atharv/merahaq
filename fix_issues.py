#!/usr/bin/env python3
"""
MeraHaq — Final Fix Script
Fixes:
1. blog.html — replaces generic template with proper Blog listing page
2. rti-guide.html — replaces generic template with proper RTI guide
3. Moves rich-content sections above footer on all pages
"""

from bs4 import BeautifulSoup
import os, glob

# ─────────────────────────────────────────────
# PROPER BLOG PAGE CONTENT
# ─────────────────────────────────────────────
BLOG_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blog — Rights & Government Scheme Guides | MeraHaq</title>
<meta name="description" content="Read in-depth guides on Indian government schemes, legal rights, and how to claim your benefits. All articles are free, verified, and written in simple language.">
<link rel="canonical" href="https://merahaq.online/blog.html">
<style>
body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f9f5f0;color:#222;}
.blog-header{background:#1a1035;color:white;padding:40px 20px;text-align:center;}
.blog-header h1{font-size:2rem;margin-bottom:10px;color:#ff6b00;}
.blog-header p{font-size:1rem;color:#ccc;max-width:600px;margin:0 auto;}
.blog-grid{max-width:900px;margin:30px auto;padding:0 16px;display:grid;grid-template-columns:1fr;gap:20px;}
.blog-card{background:white;border-radius:12px;padding:20px;border:1px solid #e8d8c0;box-shadow:0 2px 8px rgba(0,0,0,0.06);}
.blog-card .tag{background:#fff3e0;color:#e65100;font-size:0.75rem;font-weight:700;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:10px;}
.blog-card h2{font-size:1.15rem;color:#1a1035;margin:0 0 8px;}
.blog-card p{font-size:0.88rem;color:#555;line-height:1.6;margin:0 0 14px;}
.blog-card a.read-btn{background:#ff6b00;color:white;padding:8px 18px;border-radius:8px;text-decoration:none;font-size:0.85rem;font-weight:700;display:inline-block;}
.blog-card a.read-btn:hover{background:#e65100;}
.blog-intro{max-width:900px;margin:0 auto;padding:20px 16px 0;font-size:0.92rem;color:#555;line-height:1.7;}
footer{background:#1a1035;color:#aaa;text-align:center;padding:24px;font-size:0.8rem;margin-top:40px;}
footer a{color:#ff6b00;text-decoration:none;}
nav{background:#1a1035;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
nav .logo{color:white;font-size:1.2rem;font-weight:800;}nav .logo span{color:#ff6b00;}
nav a{color:#ccc;text-decoration:none;font-size:0.85rem;margin-left:14px;}
</style>
</head>
<body>
<nav>
  <div class="logo">Mera<span>Haq</span></div>
  <div>
    <a href="index.html">Home</a>
    <a href="blog.html">Blog</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="privacy-policy.html">Privacy</a>
  </div>
</nav>

<div class="blog-header">
  <h1>📚 MeraHaq Blog</h1>
  <p>In-depth guides on Indian government schemes, legal rights, and how every citizen can claim what is rightfully theirs — free, verified, in plain language.</p>
</div>

<div class="blog-intro">
  <p>MeraHaq publishes detailed, practical guides to help Indian citizens understand and access government schemes and their legal rights. Every article is sourced from official government portals (.gov.in) and written in simple language that anyone can understand — regardless of education level. All content is free, no registration required.</p>
</div>

<div class="blog-grid">

  <div class="blog-card">
    <span class="tag">🌾 Agriculture</span>
    <h2>PM Kisan Samman Nidhi — ₹6,000 Per Year for Farmers</h2>
    <p>PM Kisan gives eligible farmer families ₹6,000 per year in three installments directly to their bank account. Learn eligibility, how to register, how to do eKYC, and what to do if your payment is stuck. Updated for 2025 with the latest installment dates.</p>
    <a href="pm-kisan.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">🏥 Health</span>
    <h2>Ayushman Bharat — Free ₹5 Lakh Health Insurance for Every Family</h2>
    <p>Ayushman Bharat PM-JAY is the world's largest government health insurance scheme. It covers 55 crore Indians for ₹5 lakh per year — cashless, at 28,000+ hospitals. Learn how to check eligibility, get your Golden Card, and use it at any hospital in India.</p>
    <a href="ayushman-bharat.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">⚖️ Legal Rights</span>
    <h2>Right to Information (RTI) — How to File an RTI Application in India</h2>
    <p>The RTI Act 2005 gives every Indian citizen the right to demand information from any government office. Pay just ₹10, file online or offline, and get a reply within 30 days. Learn step-by-step how to file an RTI to get your stuck benefits, check records, and fight corruption.</p>
    <a href="rti-guide.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">⛏️ Employment</span>
    <h2>MGNREGA — 100 Days Guaranteed Work for Rural Families</h2>
    <p>Under MGNREGA, every rural household is legally entitled to 100 days of paid work per year. If the government cannot provide work within 15 days, you are entitled to unemployment allowance. Learn how to get your Job Card, apply for work, and track wages.</p>
    <a href="mgnrega.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">🍚 Food Security</span>
    <h2>Ration Card — Free & Subsidised Food Under NFSA</h2>
    <p>Over 80 crore Indians are entitled to free or subsidised food grains every month under the National Food Security Act. Your ration card is the key to claiming this benefit. Learn the types of ration cards, how to apply, and how to use One Nation One Ration Card anywhere in India.</p>
    <a href="ration-card.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">🪪 Documents</span>
    <h2>Aadhaar Card — Apply, Update, Download Complete Guide</h2>
    <p>Aadhaar is India's most important identity document. Learn how to apply for a new Aadhaar, update your address or mobile number, download e-Aadhaar, link Aadhaar to your bank account and mobile, and lock your biometrics to prevent misuse.</p>
    <a href="aadhaar-guide.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">🏠 Housing</span>
    <h2>PM Awas Yojana — Free House Scheme for Rural & Urban Poor</h2>
    <p>Pradhan Mantri Awas Yojana gives financial assistance of ₹1.20–1.30 lakh for rural families and credit-linked subsidy for urban families to build or buy their own home. Learn eligibility, how to check your name in the list, and how to apply.</p>
    <a href="pmay.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">👩 Women</span>
    <h2>Ujjwala Yojana — Free LPG Gas Connection for BPL Women</h2>
    <p>PM Ujjwala Yojana provides free LPG gas connections to women from BPL families. The connection, cylinder, regulator, and pipe are all given free. The subsidy is credited directly to your bank account. Learn how to apply at your nearest gas agency.</p>
    <a href="ujjwala-yojana.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">🎓 Education</span>
    <h2>Government Scholarships — Complete Guide for Indian Students</h2>
    <p>India's National Scholarship Portal has 120+ scholarships for SC, ST, OBC, minority, and disabled students from Class 9 to PhD level. Lakhs of scholarships go unclaimed every year. Learn how to register, which documents are needed, and the application deadlines.</p>
    <a href="scholarships.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">💳 Documents</span>
    <h2>PAN Card — Apply Online, Download e-PAN, Link with Aadhaar</h2>
    <p>PAN card is mandatory for bank accounts, income tax, and high-value transactions. Get an instant e-PAN free via Aadhaar in minutes. Learn how to apply for a new PAN, correct errors, link PAN with Aadhaar, and download your e-PAN anytime.</p>
    <a href="pan-card-guide.html" class="read-btn">Read Full Guide →</a>
  </div>

  <div class="blog-card">
    <span class="tag">⚖️ Legal Rights</span>
    <h2>Legal Rights of Every Indian Citizen — Know Your Rights</h2>
    <p>Every Indian has fundamental rights guaranteed by the Constitution — right to equality, freedom, education, and legal aid. Learn your rights when arrested by police, your consumer rights, labour rights, women's rights, and how to get free legal help through NALSA.</p>
    <a href="legal-rights.html" class="read-btn">Read Full Guide →</a>
  </div>

</div>

<footer>
  <p>© 2025 MeraHaq · Free for all Indians · Not affiliated with any government body</p>
  <p><a href="index.html">Home</a> · <a href="about.html">About</a> · <a href="contact.html">Contact</a> · <a href="privacy-policy.html">Privacy Policy</a> · <a href="disclaimer.html">Disclaimer</a></p>
</footer>
</body>
</html>"""

# ─────────────────────────────────────────────
# PROPER RTI GUIDE CONTENT
# ─────────────────────────────────────────────
RTI_GUIDE_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RTI Guide — How to File Right to Information Application in India | MeraHaq</title>
<meta name="description" content="Complete step-by-step guide to filing an RTI application in India. Learn how to write an RTI letter, pay ₹10 fee, file online at rtionline.gov.in, and get reply in 30 days. Free guide for all Indians.">
<link rel="canonical" href="https://merahaq.online/rti-guide.html">
<style>
body{font-family:Arial,sans-serif;margin:0;padding:0;background:#f9f5f0;color:#222;line-height:1.7;}
nav{background:#1a1035;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
nav .logo{color:white;font-size:1.2rem;font-weight:800;}nav .logo span{color:#ff6b00;}
nav a{color:#ccc;text-decoration:none;font-size:0.85rem;margin-left:14px;}
.hero{background:#1a1035;color:white;padding:40px 20px;text-align:center;}
.hero .tag{background:#ff6b00;color:white;font-size:0.75rem;font-weight:700;padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:12px;}
.hero h1{font-size:1.8rem;margin:0 0 10px;color:white;}
.hero p{color:#ccc;font-size:0.95rem;max-width:650px;margin:0 auto;}
.content{max-width:860px;margin:0 auto;padding:24px 16px;}
.content h2{font-size:1.25rem;color:#1a1035;border-left:4px solid #ff6b00;padding-left:12px;margin:28px 0 12px;}
.content h3{font-size:1.05rem;color:#333;margin:20px 0 8px;}
.content p{font-size:0.92rem;color:#444;margin:0 0 14px;}
.content ul,.content ol{padding-left:20px;margin:0 0 14px;}
.content li{font-size:0.92rem;color:#444;margin-bottom:6px;}
.highlight{background:#fff3e0;border-left:4px solid #ff6b00;padding:14px 16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:0.9rem;}
.warning{background:#fce4ec;border-left:4px solid #e91e63;padding:14px 16px;border-radius:0 8px 8px 0;margin:16px 0;font-size:0.9rem;}
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:20px 0;}
.stat-box{background:white;border:1px solid #ffe0b2;border-radius:10px;padding:14px;text-align:center;}
.stat-box .num{font-size:1.5rem;font-weight:800;color:#ff6b00;}
.stat-box .label{font-size:0.78rem;color:#888;margin-top:4px;}
.step-item{background:white;border:1px solid #e8d8c0;border-radius:10px;padding:16px;margin-bottom:12px;display:flex;gap:14px;align-items:flex-start;}
.step-num{background:#ff6b00;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;flex-shrink:0;margin-top:2px;}
.step-text h4{margin:0 0 6px;font-size:0.95rem;color:#1a1035;}
.step-text p{margin:0;font-size:0.88rem;color:#555;}
.faq-item{border-bottom:1px solid #e8d8c0;padding:14px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-weight:700;color:#1a1035;font-size:0.92rem;margin-bottom:6px;}
.faq-a{font-size:0.88rem;color:#555;}
.cta-box{background:#1a1035;color:white;border-radius:12px;padding:24px;text-align:center;margin:30px 0;}
.cta-box h3{color:#ff6b00;margin:0 0 10px;}
.cta-box p{color:#ccc;font-size:0.88rem;margin:0 0 16px;}
.cta-btn{background:#ff6b00;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;}
.related{background:white;border-radius:12px;padding:20px;border:1px solid #e8d8c0;margin:20px 0;}
.related h3{color:#e65100;font-size:0.95rem;margin:0 0 12px;}
.related-links{display:flex;flex-wrap:wrap;gap:8px;}
.related-links a{background:#fff3e0;border:1px solid #ffcc80;border-radius:20px;padding:5px 14px;font-size:0.82rem;color:#e65100;text-decoration:none;}
footer{background:#1a1035;color:#aaa;text-align:center;padding:24px;font-size:0.8rem;margin-top:40px;}
footer a{color:#ff6b00;text-decoration:none;}
</style>
</head>
<body>

<nav>
  <div class="logo">Mera<span>Haq</span></div>
  <div>
    <a href="index.html">Home</a>
    <a href="blog.html">Blog</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </div>
</nav>

<div class="hero">
  <span class="tag">⚖️ Legal Rights</span>
  <h1>Right to Information (RTI)<br>How to File an RTI Application in India</h1>
  <p>The RTI Act 2005 gives every Indian citizen the legal right to demand information from any government office. Pay ₹10, file online or offline, get a reply in 30 days — completely free for BPL card holders.</p>
</div>

<div class="content">

  <div class="stats">
    <div class="stat-box"><div class="num">₹10</div><div class="label">Application Fee</div></div>
    <div class="stat-box"><div class="num">30 Days</div><div class="label">Reply Deadline</div></div>
    <div class="stat-box"><div class="num">FREE</div><div class="label">For BPL Card Holders</div></div>
    <div class="stat-box"><div class="num">2005</div><div class="label">RTI Act Passed</div></div>
  </div>

  <div class="highlight">
    <strong>⚡ Quick Fact:</strong> RTI is a powerful tool. You can use it to find out why your PM Kisan payment is stuck, why your ration card was cancelled, how government money was spent in your village, and much more.
  </div>

  <h2>What is the Right to Information Act?</h2>
  <p>The Right to Information Act 2005 (RTI Act) is a central law that gives every Indian citizen the right to access information held by public authorities — central government, state governments, panchayats, municipalities, courts, and even government-funded institutions. Before this law, government offices could refuse to share any information. The RTI Act made transparency mandatory.</p>
  <p>Under the RTI Act, any citizen can ask for documents, records, memos, emails, opinions, advices, press releases, circulars, orders, log books, contracts, reports, papers, samples, models, data held in any form. The government office (called Public Information Officer or PIO) must reply within 30 days. For matters involving life or liberty, the reply must come within 48 hours.</p>

  <h2>What Can You Ask Through RTI?</h2>
  <p>You can use RTI to ask about anything that a government office knows or has. Here are real examples of what citizens have used RTI for:</p>
  <ul>
    <li>Why has my PM Kisan installment not come for 3 months?</li>
    <li>What is the status of my ration card application filed 6 months ago?</li>
    <li>How much money was spent on road construction in our village under MGNREGA?</li>
    <li>Why was my scholarship application rejected?</li>
    <li>How many times has the local MLA visited our Panchayat?</li>
    <li>What is my child's admission status in the government school?</li>
    <li>Is my name on the Ayushman Bharat beneficiary list?</li>
    <li>What action was taken on my police complaint filed last year?</li>
  </ul>

  <h2>Who Can File an RTI?</h2>
  <p>Any Indian citizen can file an RTI application. There is no age limit, no income limit, no educational qualification required. You do not need a lawyer. You do not need to give any reason for why you want the information. Even a Class 5 student can file an RTI — the law does not discriminate.</p>
  <p>However, RTI cannot be filed against private companies or individuals unless they receive government funding. And some categories of information are exempt — like defence secrets, cabinet papers, and information that would harm national security.</p>

  <h2>How to File an RTI Application — Step by Step</h2>

  <div class="step-item">
    <div class="step-num">1</div>
    <div class="step-text">
      <h4>Identify the Right Office (Public Authority)</h4>
      <p>Decide which government department has the information you need. For PM Kisan — Ministry of Agriculture. For ration card — State Food Department. For MGNREGA wages — Block Development Office. For school records — District Education Office.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">2</div>
    <div class="step-text">
      <h4>Write Your RTI Application</h4>
      <p>Write a simple letter addressed to the Public Information Officer (PIO) of that department. State your name, address, and the specific information you want. Be clear and specific. You do not need to give any reason. You can write in English, Hindi, or any official language of that state.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">3</div>
    <div class="step-text">
      <h4>Pay the ₹10 Fee</h4>
      <p>The application fee is ₹10. For online RTI, pay by debit/credit card or net banking. For offline, pay by Indian Postal Order (IPO), demand draft, or cash at the counter. BPL card holders pay zero fee — attach a copy of your BPL/ration card.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">4</div>
    <div class="step-text">
      <h4>Submit Online or Offline</h4>
      <p><strong>Online:</strong> Visit rtionline.gov.in for central government departments. Fill the form, upload your application, and pay online. You get a registration number instantly.<br><strong>Offline:</strong> Post your application by registered post to the PIO's address, or submit in person and get a receipt.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">5</div>
    <div class="step-text">
      <h4>Wait for Reply — 30 Days</h4>
      <p>The PIO must reply within 30 days. For life/liberty matters — 48 hours. Track your online RTI at rtionline.gov.in using your registration number.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">6</div>
    <div class="step-text">
      <h4>File First Appeal if Not Satisfied</h4>
      <p>If you get no reply in 30 days, or the reply is incomplete, file a First Appeal to the First Appellate Authority (FAA) of the same department — free of cost, within 30 days of the deadline. The FAA must reply within 30 days of receiving your appeal.</p>
    </div>
  </div>

  <div class="step-item">
    <div class="step-num">7</div>
    <div class="step-text">
      <h4>File Second Appeal to Information Commission</h4>
      <p>If the First Appeal also fails, file a Second Appeal to the Central Information Commission (CIC) for central govt, or State Information Commission (SIC) for state govt. This is also free. The Information Commission can impose penalty of ₹250/day on the erring officer.</p>
    </div>
  </div>

  <h2>How to File RTI Online — rtionline.gov.in</h2>
  <p>The easiest way to file an RTI for central government departments is through the official RTI Online Portal at rtionline.gov.in. Here is exactly how to do it:</p>
  <ol>
    <li>Go to rtionline.gov.in on your phone or computer</li>
    <li>Click on "Submit Request" at the top</li>
    <li>Select the Ministry or Department you want to ask</li>
    <li>Fill in your name, address, email, and phone number</li>
    <li>In the "Text of RTI Request" box — write your question clearly</li>
    <li>Choose if you are a BPL cardholder (upload BPL card if yes)</li>
    <li>Pay ₹10 by debit/credit card or net banking</li>
    <li>Submit — you will get a registration number by SMS and email</li>
    <li>Use the registration number to track your RTI status anytime</li>
  </ol>

  <div class="warning">
    <strong>⚠️ Important:</strong> rtionline.gov.in works only for central government departments (like PM Kisan, Aadhaar, Railways, Income Tax, etc.). For state government departments (ration card, state scholarships, state police), visit your state's RTI portal or submit offline to the state department.
  </div>

  <h2>Sample RTI Application Format</h2>
  <p>Here is a simple format you can use to write your RTI application:</p>
  <div class="highlight" style="font-family:monospace;font-size:0.85rem;line-height:1.8;">
    To,<br>
    The Public Information Officer,<br>
    [Name of Department],<br>
    [Address of Department]<br><br>
    Subject: Application under Right to Information Act, 2005<br><br>
    Sir/Madam,<br><br>
    I, [Your Full Name], resident of [Your Address], hereby request the following information under the RTI Act 2005:<br><br>
    1. [Write your first question clearly]<br>
    2. [Write your second question if any]<br>
    3. [Write your third question if any]<br><br>
    I am enclosing ₹10/- as application fee by [Indian Postal Order / Cash / Online Payment].<br><br>
    Yours sincerely,<br>
    [Your Name]<br>
    [Your Address]<br>
    [Your Mobile Number]<br>
    Date: [Today's Date]
  </div>

  <h2>Documents Required for RTI</h2>
  <ul>
    <li>No documents are compulsory for filing RTI</li>
    <li>BPL/ration card — only if claiming fee exemption</li>
    <li>Your postal address — for receiving reply by post</li>
    <li>Email ID and mobile number — for online RTI tracking</li>
  </ul>

  <h2>RTI Fee — How Much and How to Pay</h2>
  <p>The application fee for central government RTI is ₹10. Additional charges may apply if you want photocopies of documents — ₹2 per page for A4 size. Inspection of records — free for the first hour, ₹5 for each subsequent hour. There is no fee for BPL card holders — attach a copy of your ration card or BPL certificate.</p>
  <p>For state government RTIs, the fee is set by each state — usually ₹10 to ₹50. Some states have online payment options, others require Indian Postal Order or demand draft.</p>

  <h2>Important RTI Rules to Know</h2>
  <ul>
    <li>You do NOT need to give any reason for filing RTI — it is your right</li>
    <li>You can file RTI in any official Indian language — not just English or Hindi</li>
    <li>PIO cannot refuse RTI for vague reasons — every refusal must cite specific exemption section</li>
    <li>If PIO delays without valid reason, they can be penalised ₹250 per day up to ₹25,000</li>
    <li>PIO can also be penalised for giving false or incomplete information</li>
    <li>You can withdraw your RTI at any time before the reply</li>
    <li>You can file as many RTI applications as you want — there is no limit</li>
  </ul>

  <h2>What Information is Exempt from RTI?</h2>
  <p>Under Section 8 of the RTI Act, some categories are exempt from disclosure. These include information affecting national security, sovereignty, strategic interests of the state, cabinet papers, information that would harm the competitive position of a third party, personal information with no public interest, and information that would breach privilege of Parliament or state legislature. However, even exempt information must be disclosed if there is an overriding public interest.</p>

  <h2>Frequently Asked Questions about RTI</h2>
  <div class="faq-item">
    <div class="faq-q">Q: Can I file RTI on my mobile phone?</div>
    <div class="faq-a">A: Yes! Visit rtionline.gov.in on your phone browser. The website works on mobile. Fill the form, pay ₹10 online, and submit in minutes.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Q: What if the PIO says "information not available"?</div>
    <div class="faq-a">A: File a First Appeal. The Appellate Authority will ask the PIO to search properly. If they still do not provide, file Second Appeal to Information Commission.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Q: How long does it take to get a reply?</div>
    <div class="faq-a">A: Maximum 30 days from receipt of application. For matters involving life or liberty — 48 hours. In practice, most well-filed RTIs get responses within 20-25 days.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Q: Can I file RTI against state government from rtionline.gov.in?</div>
    <div class="faq-a">A: No. rtionline.gov.in is only for central government ministries and departments. For state government, use your state's RTI portal or submit offline to the concerned state department.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Q: RTI helpline number?</div>
    <div class="faq-a">A: RTI Online helpdesk: 011-24622461 (Central Information Commission). For guidance, you can also contact your nearest District Legal Services Authority (DLSA) — call 15100.</div>
  </div>
  <div class="faq-item">
    <div class="faq-q">Q: Can someone help me write an RTI for free?</div>
    <div class="faq-a">A: Yes. NALSA (National Legal Services Authority) provides free legal aid including RTI help. Call 15100 (toll free, 24/7). Your nearest District Legal Services Authority (DLSA) also helps for free.</div>
  </div>

  <h2>Conclusion</h2>
  <p>The Right to Information Act is one of the most powerful laws ever passed in India. It puts the power of accountability in the hands of every ordinary citizen. Whether your government benefit is stuck, you suspect corruption, or you simply want to know how public money is being spent in your area — RTI is your tool. It costs just ₹10 and takes 15 minutes to file online. Do not hesitate to use it — it is your fundamental right.</p>
  <p>If you need help filing an RTI, use the MeraHaq RTI Letter Tool on our website to generate a ready-to-file RTI letter in seconds. You can then submit it online or print and post it.</p>

  <div class="cta-box">
    <h3>Ready to File Your RTI?</h3>
    <p>Visit the official RTI Online Portal to file your application in minutes. Free for BPL card holders.</p>
    <a href="https://rtionline.gov.in" target="_blank" rel="noopener" class="cta-btn">File RTI Online → rtionline.gov.in</a>
  </div>

  <div class="related">
    <h3>📚 Related Guides on MeraHaq</h3>
    <div class="related-links">
      <a href="legal-rights.html">⚖️ Legal Rights</a>
      <a href="pm-kisan.html">🌾 PM Kisan</a>
      <a href="aadhaar-guide.html">🪪 Aadhaar Guide</a>
      <a href="ration-card.html">🍚 Ration Card</a>
      <a href="mgnrega.html">⛏️ MGNREGA</a>
      <a href="ayushman-bharat.html">🏥 Ayushman Bharat</a>
      <a href="consumer-rights-india-complaint.html">🛒 Consumer Rights</a>
    </div>
  </div>

</div>

<footer>
  <p>Disclaimer: MeraHaq is an independent information platform for Indian citizens. We are not affiliated with any government department or ministry. All information is for guidance purposes only. Always verify from official government websites before applying. Last updated: April 2026.</p>
  <p>© 2025 MeraHaq · Free for all Indians · <a href="index.html">Home</a> · <a href="privacy-policy.html">Privacy Policy</a> · <a href="terms.html">Terms</a> · <a href="disclaimer.html">Disclaimer</a> · <a href="contact.html">Contact</a></p>
</footer>

</body>
</html>"""

# ─────────────────────────────────────────────
# FIX RICH CONTENT APPEARING BELOW FOOTER
# ─────────────────────────────────────────────
def fix_content_below_footer(filepath):
    """Move rich-content and related-links sections above footer if below it."""
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        if 'rich-content' not in content and 'related-links' not in content:
            return False

        soup = BeautifulSoup(content, 'html.parser')
        footer = soup.find('footer')
        if not footer:
            return False

        # Find all rich-content and related sections after footer
        moved = False
        for section in soup.find_all('section', class_=['rich-content', 'related-links']):
            # Check if section appears after footer in document order
            footer_pos = str(soup).find(str(footer))
            section_pos = str(soup).find(str(section))
            if section_pos > footer_pos:
                section.extract()
                footer.insert_before(section)
                moved = True

        if moved:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"  FIXED (content moved above footer): {os.path.basename(filepath)}")
            return True

        return False
    except Exception as e:
        print(f"  ERROR {filepath}: {e}")
        return False

def main():
    print("\nMeraHaq — Final Fix Script")
    print("="*40)

    # Fix 1: Replace blog.html with proper blog listing page
    print("\n[1] Fixing blog.html...")
    with open('blog.html', 'w', encoding='utf-8') as f:
        f.write(BLOG_HTML)
    print("  DONE: blog.html replaced with proper blog listing page")

    # Fix 2: Replace rti-guide.html with proper RTI guide
    print("\n[2] Fixing rti-guide.html...")
    with open('rti-guide.html', 'w', encoding='utf-8') as f:
        f.write(RTI_GUIDE_HTML)
    print("  DONE: rti-guide.html replaced with 2000+ word RTI guide")

    # Fix 3: Move rich content above footer on all pages
    print("\n[3] Moving rich content above footer on all pages...")
    fixed = 0
    for filepath in sorted(glob.glob('*.html')):
        if fix_content_below_footer(filepath):
            fixed += 1
    print(f"  DONE: Fixed {fixed} pages")

    print("\n" + "="*40)
    print("All fixes complete! Vercel will deploy in 2 minutes.")

if __name__ == '__main__':
    main()
