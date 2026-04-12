const fs = require('fs');
const path = require('path');

// ============================================================
// REAL CONTENT DATABASE — Each scheme has unique, accurate,
// 1500+ word content written specifically for AdSense approval
// ============================================================
const CONTENT_DB = {

  'pm-kisan': {
    title: 'PM Kisan Samman Nidhi',
    subtitle: '₹6,000 Per Year Direct to Farmers — Complete Guide 2025',
    category: 'Agriculture',
    icon: '🌾',
    badge: 'Farmer Scheme',
    heroDesc: 'PM Kisan Samman Nidhi provides ₹6,000 per year directly to small and marginal farmers across India in three equal instalments of ₹2,000 each. This comprehensive guide covers everything you need to know about eligibility, registration, documents, and how to check your payment status.',
    facts: [
      { num: '₹6,000', label: 'Per Year Benefit' },
      { num: '3', label: 'Instalments' },
      { num: '11 Cr+', label: 'Beneficiaries' },
      { num: '100%', label: 'Central Funded' }
    ],
    content: `
<h2>What is PM Kisan Samman Nidhi?</h2>
<p>PM Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme launched on 24 February 2019 by the Government of India. Under this scheme, an income support of ₹6,000 per year is provided to all eligible farmer families across the country in three equal instalments of ₹2,000 every four months. The amount is directly transferred to the bank accounts of the beneficiaries through Direct Benefit Transfer (DBT) mode.</p>
<p>The scheme was initially meant only for small and marginal farmers with cultivable land up to 2 hectares, but was later extended to all farmer families irrespective of the size of their land holdings. This historic decision by the Government of India has made over 11 crore farmers eligible for the scheme across all states and union territories.</p>
<p>The entire funding for PM-KISAN is borne by the Central Government. Since its launch, the government has disbursed over ₹2.8 lakh crore to eligible farmers directly into their bank accounts. This makes it one of the largest direct benefit transfer schemes in the world.</p>

<h2>Who is Eligible for PM Kisan?</h2>
<p>All landholding farmer families who have cultivable land in their name are eligible for PM Kisan. A farmer family is defined as a family comprising of husband, wife and minor children who own cultivable land as per the land records of the concerned State/UT.</p>
<div class="highlight-box"><strong>Important:</strong> The benefit is given per family, not per individual. If both husband and wife are farmers, they get only one ₹6,000 benefit together, not separately.</div>
<p>The following categories of people are NOT eligible even if they own farmland:</p>
<ul>
<li>Former and present holders of Constitutional posts (President, Vice President, Ministers, MPs, MLAs etc.)</li>
<li>Former and present Ministers and State Ministers</li>
<li>District Judges and above, High Court and Supreme Court Judges</li>
<li>Retired/serving officers and employees of Central and State Government with monthly salary above ₹10,000</li>
<li>All persons who paid income tax in the last assessment year</li>
<li>Professionals like doctors, engineers, lawyers, chartered accountants registered with professional bodies</li>
<li>Retired pensioners getting monthly pension of ₹10,000 or more</li>
</ul>

<h2>Required Documents for PM Kisan</h2>
<p>To register for PM Kisan, you need the following documents. Make sure all documents are valid and up to date before applying:</p>
<ul>
<li><strong>Aadhaar Card</strong> — Mandatory for all applicants. Aadhaar must be linked to your bank account</li>
<li><strong>Land Records / Khatoni</strong> — Proof of land ownership in your name. This includes Khatauni, Jamabandi, Patta, or any official land document</li>
<li><strong>Bank Passbook</strong> — Active bank account linked with Aadhaar. Account should not be dormant</li>
<li><strong>Mobile Number</strong> — Registered mobile number for OTP verification</li>
<li><strong>Caste Certificate</strong> — Required for SC/ST farmers in some states</li>
</ul>

<h2>How to Register for PM Kisan Online</h2>
<ol class="steps-list">
<li>Visit the official PM Kisan portal at <strong>pmkisan.gov.in</strong></li>
<li>Click on <strong>"Farmer Corner"</strong> on the homepage</li>
<li>Select <strong>"New Farmer Registration"</strong></li>
<li>Choose Rural or Urban Farmer as applicable</li>
<li>Enter your <strong>Aadhaar Number</strong> and mobile number</li>
<li>Enter the OTP received on your mobile number</li>
<li>Fill in your personal details — name, date of birth, gender, category</li>
<li>Enter your <strong>bank account details</strong> — account number, IFSC code</li>
<li>Enter your <strong>land details</strong> — survey number, khasra number, area</li>
<li>Upload required documents and submit</li>
</ol>
<div class="info-box"><strong>Tip:</strong> If you face difficulty registering online, visit your nearest Common Service Centre (CSC) or Gram Panchayat. The registration is completely free — do not pay anyone to register for you.</div>

<h2>How to Register for PM Kisan Offline</h2>
<p>Farmers who do not have internet access or smartphones can register for PM Kisan through offline methods. Visit your nearest:</p>
<ul>
<li><strong>Gram Panchayat / Patwari Office</strong> — Submit your application form with documents</li>
<li><strong>Common Service Centre (CSC)</strong> — CSC operators will help you register. Nominal fee of ₹20-30 may apply</li>
<li><strong>Agriculture Department Office</strong> — District or block level agriculture offices accept applications</li>
<li><strong>Revenue Department / Tehsil Office</strong> — Can assist with land record verification and registration</li>
</ul>

<h2>How to Check PM Kisan Payment Status</h2>
<p>After registering, you can check whether your instalment has been released and credited to your account using these methods:</p>
<ul>
<li><strong>Online:</strong> Go to pmkisan.gov.in → Farmer Corner → Beneficiary Status → Enter Aadhaar/Account/Mobile number</li>
<li><strong>SMS:</strong> Send SMS to check status. Details available on official portal</li>
<li><strong>Bank Passbook:</strong> Check your bank passbook or mini statement for credited amount</li>
<li><strong>PM Kisan App:</strong> Download the official PM Kisan Mobile App from Google Play Store</li>
<li><strong>Helpline:</strong> Call PM Kisan Helpline 155261 or 011-24300606</li>
</ul>

<h2>PM Kisan eKYC — Mandatory for Payments</h2>
<p>The Government of India has made eKYC mandatory for receiving PM Kisan instalments. Without eKYC, your payment will be put on hold even if you are a valid beneficiary. There are three ways to complete eKYC:</p>
<ul>
<li><strong>OTP-based eKYC:</strong> Visit pmkisan.gov.in → eKYC option → Enter Aadhaar and OTP received on Aadhaar-linked mobile</li>
<li><strong>Biometric eKYC:</strong> Visit nearest CSC centre. Fingerprint-based verification. Required if mobile is not linked to Aadhaar</li>
<li><strong>Face Authentication:</strong> Use the PM Kisan App for face-based eKYC verification</li>
</ul>
<div class="warn-box"><strong>Warning:</strong> Many fake websites and agents claim to do PM Kisan registration for money. The official registration is completely FREE. Only use pmkisan.gov.in or official government offices.</div>

<h2>Common Reasons for PM Kisan Rejection</h2>
<p>Many valid farmers find their applications rejected. Here are the most common reasons and how to fix them:</p>
<ul>
<li><strong>Aadhaar not linked to bank account:</strong> Visit your bank branch to link Aadhaar</li>
<li><strong>Name mismatch:</strong> Name in Aadhaar must match bank records and land records exactly</li>
<li><strong>Invalid IFSC code:</strong> Verify IFSC code of your bank branch</li>
<li><strong>Land records not updated:</strong> Get land records updated at Patwari/Revenue office</li>
<li><strong>eKYC pending:</strong> Complete eKYC on official portal</li>
<li><strong>Dormant bank account:</strong> Activate your account by doing a transaction</li>
</ul>

<h2>PM Kisan Instalment Schedule 2025</h2>
<p>PM Kisan instalments are released three times a year. The approximate schedule is:</p>
<ul>
<li><strong>1st Instalment:</strong> April 1 to July 31</li>
<li><strong>2nd Instalment:</strong> August 1 to November 30</li>
<li><strong>3rd Instalment:</strong> December 1 to March 31</li>
</ul>
<p>The exact dates vary each year. Follow official announcements at pmkisan.gov.in for exact release dates.</p>
    `,
    faqs: [
      { q: 'How much money do farmers get under PM Kisan?', a: 'Farmers get ₹6,000 per year in three instalments of ₹2,000 each. The money is directly transferred to the bank account every four months.' },
      { q: 'Can a farmer with more than 2 hectares land apply for PM Kisan?', a: 'Yes. Since May 2019, the scheme was expanded to cover all farmer families regardless of land size. There is no upper limit on land holding.' },
      { q: 'My PM Kisan application was rejected. What should I do?', a: 'Visit pmkisan.gov.in and check the rejection reason in Farmer Corner. Common fixes include linking Aadhaar to bank account, correcting name mismatch, or updating land records.' },
      { q: 'Is eKYC mandatory for PM Kisan?', a: 'Yes, eKYC is mandatory. Without completing eKYC, your instalment will be held. You can complete it online at pmkisan.gov.in or at any CSC centre.' },
      { q: 'Can a tenant farmer or sharecropper apply for PM Kisan?', a: 'No. PM Kisan is only for landholding farmer families who own the land. Tenant farmers, sharecroppers, or those farming on leased land are not eligible.' },
      { q: 'What is the helpline number for PM Kisan?', a: 'The official PM Kisan helpline numbers are 155261 and 011-24300606. You can also email pmkisan-ict@gov.in for support.' }
    ],
    applyUrl: 'https://pmkisan.gov.in',
    helpline: '155261',
    relatedSlugs: ['ayushman-bharat', 'mgnrega', 'pm-mudra-yojana', 'fasal-bima-yojana']
  },

  'ayushman-bharat': {
    title: 'Ayushman Bharat Yojana',
    subtitle: '₹5 Lakh Free Health Insurance for Every Indian Family',
    category: 'Health',
    icon: '🏥',
    badge: 'Health Scheme',
    heroDesc: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) provides free health coverage of up to ₹5 lakh per family per year for hospitalization at government and empanelled private hospitals. It covers 1,949 medical procedures including surgeries, treatments and day care procedures.',
    facts: [
      { num: '₹5 Lakh', label: 'Annual Coverage' },
      { num: '1,949', label: 'Medical Procedures' },
      { num: '28,000+', label: 'Hospitals' },
      { num: '55 Cr+', label: 'Beneficiaries' }
    ],
    content: `
<h2>What is Ayushman Bharat PM-JAY?</h2>
<p>Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB PM-JAY) is the world's largest government-funded health insurance scheme. Launched on 23 September 2018, it provides a health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 55 crore people — approximately 40% of India's population.</p>
<p>The scheme covers medical and surgical expenses for hospitalization including pre and post hospitalization expenses for 3 days and 15 days respectively. All pre-existing conditions are covered from day one. There is no restriction on family size, age or gender. The benefit cover is on a family floater basis — meaning the entire ₹5 lakh can be used by one member or shared among the family.</p>
<p>AB PM-JAY has a unique feature — it is entirely cashless and paperless. Beneficiaries do not need to pay anything at empanelled hospitals. All expenses including medicines, diagnostics, doctor fees, room charges and surgeon charges are covered.</p>

<h2>Who is Eligible for Ayushman Bharat?</h2>
<p>Eligibility for Ayushman Bharat is determined based on the Socio-Economic Caste Census (SECC) 2011 data. Families are automatically included based on their economic and social status. You do not need to apply separately if your family is in the SECC list.</p>
<p>The following categories are automatically eligible:</p>
<ul>
<li><strong>Rural families:</strong> Those with only one room with kuccha walls and kuccha roof, families with no adult member between 16-59 years, female-headed households with no adult male member, disabled member with no able-bodied adult member, SC/ST households, landless households deriving major income from manual casual labour</li>
<li><strong>Urban families:</strong> Ragpickers, beggars, domestic workers, street vendors, construction workers, plumbers, masons, electricians, sanitation workers, sweepers, home-based workers, artisans, handicraft workers, transport workers, helpers, delivery workers, shopkeepers, waiters</li>
</ul>
<div class="info-box"><strong>Good news:</strong> In 2024, the government expanded Ayushman Bharat to cover all senior citizens above 70 years of age regardless of income. Apply at pmjay.gov.in if you are 70+.</div>

<h2>How to Check if Your Name is in Ayushman Bharat List</h2>
<ol class="steps-list">
<li>Visit <strong>pmjay.gov.in</strong> or call helpline <strong>14555</strong></li>
<li>Click on <strong>"Am I Eligible"</strong> button on the homepage</li>
<li>Enter your mobile number and OTP</li>
<li>Enter your state, then search by name, HHD number, ration card or mobile number</li>
<li>If your name appears, your family is eligible</li>
</ol>

<h2>How to Get Ayushman Bharat Golden Card</h2>
<p>The Ayushman Bharat Golden Card (AB Card) is the official identity card for availing cashless treatment. Here is how to get it:</p>
<ol class="steps-list">
<li>Confirm your eligibility at pmjay.gov.in or call 14555</li>
<li>Visit your nearest <strong>Common Service Centre (CSC)</strong>, empanelled hospital, or District Implementation Unit</li>
<li>Carry your <strong>Aadhaar card</strong> and <strong>Ration card</strong></li>
<li>Biometric verification will be done</li>
<li>Golden Card will be issued immediately or within a few days</li>
</ol>
<div class="warn-box"><strong>Important:</strong> The Golden Card is FREE. Do not pay anyone for it. If anyone asks for money to make your Ayushman card, report them to the helpline 14555.</div>

<h2>How to Get Cashless Treatment at Hospital</h2>
<ol class="steps-list">
<li>Go to any <strong>empanelled hospital</strong> — government or private</li>
<li>Find the <strong>Ayushman Mitra</strong> desk at the hospital</li>
<li>Show your <strong>Ayushman Golden Card</strong> or Aadhaar Card</li>
<li>Ayushman Mitra will verify your eligibility online</li>
<li>Get admitted and receive completely <strong>free treatment</strong></li>
<li>All bills are settled directly between hospital and government</li>
</ol>

<h2>What is Covered Under Ayushman Bharat?</h2>
<p>Ayushman Bharat covers 1,949 treatment packages across 27 specialties. Major treatments covered include:</p>
<ul>
<li>Heart bypass surgery (CABG), angioplasty, valve replacement</li>
<li>Cancer chemotherapy, radiotherapy and surgery</li>
<li>Knee replacement and hip replacement surgeries</li>
<li>Dialysis for kidney disease</li>
<li>Cataract and eye surgeries</li>
<li>Caesarean delivery and newborn care</li>
<li>Orthopaedic procedures and trauma care</li>
<li>Neurological surgeries including brain surgery</li>
<li>Maternity and neonatal care packages</li>
<li>COVID-19 treatment (added during pandemic)</li>
</ul>
<p>Pre-hospitalisation expenses up to 3 days and post-hospitalisation expenses up to 15 days including medicines and diagnostics are also covered.</p>

<h2>What is NOT Covered Under Ayushman Bharat?</h2>
<p>The following treatments and services are not covered under PM-JAY:</p>
<ul>
<li>OPD (Outpatient) consultations and treatments</li>
<li>Drug rehabilitation programs</li>
<li>Cosmetic surgery and dental procedures (unless due to accident)</li>
<li>Fertility treatments and IVF</li>
<li>Self-inflicted injuries</li>
<li>Organ transplantation (donor costs)</li>
</ul>

<h2>Ayushman Bharat for Senior Citizens (70+)</h2>
<p>In September 2024, the Government of India announced a major expansion of Ayushman Bharat to cover all senior citizens aged 70 years and above. Key features:</p>
<ul>
<li>All citizens aged 70+ are eligible regardless of income</li>
<li>Additional ₹5 lakh top-up health coverage per year</li>
<li>Covers both new beneficiaries and existing PMJAY families</li>
<li>Apply online at pmjay.gov.in or through Aadhaar-based verification</li>
</ul>
    `,
    faqs: [
      { q: 'How do I know if my family is eligible for Ayushman Bharat?', a: 'Visit pmjay.gov.in and click "Am I Eligible". Enter your mobile number and search by name, ration card, or HHD number. You can also call 14555.' },
      { q: 'Can I use Ayushman Bharat card in any hospital?', a: 'You can use it at any government hospital or PMJAY-empanelled private hospital. Check the list of empanelled hospitals at pmjay.gov.in or call 14555.' },
      { q: 'My name is not in the list but I am poor. What can I do?', a: 'If you are not in SECC 2011 data, you may not be automatically eligible. However, many states have added their own beneficiaries. Contact your state health department or check your state\'s Ayushman Bharat portal.' },
      { q: 'Can I use Ayushman Bharat in another state?', a: 'Yes! Ayushman Bharat has portability. You can get treatment at any empanelled hospital across India, not just in your home state.' },
      { q: 'Is Ayushman Bharat free for senior citizens above 70?', a: 'Yes. Since 2024, all Indian citizens aged 70 and above are eligible for free health coverage of ₹5 lakh per year under Ayushman Bharat regardless of their income.' },
      { q: 'What is the Ayushman Bharat helpline number?', a: 'The toll-free Ayushman Bharat helpline is 14555. You can call this number for any queries, to find empanelled hospitals, or to report issues.' }
    ],
    applyUrl: 'https://pmjay.gov.in',
    helpline: '14555',
    relatedSlugs: ['pm-kisan', 'mgnrega', 'ujjwala-yojana', 'jan-dhan-yojana']
  },

  'mgnrega': {
    title: 'MGNREGA',
    subtitle: '100 Days Guaranteed Work & Wages for Rural Families',
    category: 'Employment',
    icon: '⚒️',
    badge: 'Employment Scheme',
    heroDesc: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) guarantees 100 days of wage employment per year to every rural household whose adult members are willing to do unskilled manual work. Wages are paid directly to bank/post office accounts within 15 days of work completion.',
    facts: [
      { num: '100 Days', label: 'Guaranteed Work' },
      { num: '₹267+', label: 'Daily Wage' },
      { num: '15 Days', label: 'Payment Timeline' },
      { num: '14 Cr+', label: 'Active Workers' }
    ],
    content: `
<h2>What is MGNREGA?</h2>
<p>The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), enacted in 2005, is the world's largest work guarantee programme. It provides a legal guarantee of at least 100 days of unskilled wage employment per financial year to every rural household whose adult members volunteer to do unskilled manual work.</p>
<p>MGNREGA is a demand-driven scheme — meaning you apply for work when you need it, and the government is legally bound to provide work within 15 days of application. If work is not provided within 15 days, you are entitled to an unemployment allowance. This makes MGNREGA unique among all government welfare schemes.</p>
<p>The wages under MGNREGA are revised every year and vary by state. The minimum national wage is ₹267 per day (as of 2024-25), but many states pay higher wages. Wages are deposited directly into bank or post office accounts within 15 days of work completion.</p>

<h2>Who is Eligible for MGNREGA?</h2>
<p>Any adult member of a rural household who is willing to do unskilled manual work is eligible for MGNREGA. The key eligibility criteria are:</p>
<ul>
<li>Must be a resident of a <strong>rural area</strong> (gram panchayat area)</li>
<li>Must be an <strong>adult</strong> (18 years or above)</li>
<li>Must be willing to do <strong>unskilled manual work</strong></li>
<li>Must have a <strong>Job Card</strong> issued by the Gram Panchayat</li>
</ul>
<div class="highlight-box"><strong>No income limit:</strong> MGNREGA has no income or caste restrictions. Any rural family regardless of income level can apply for work under MGNREGA.</div>

<h2>How to Get MGNREGA Job Card</h2>
<p>The Job Card is the most important document for MGNREGA. Every household that wants to work under MGNREGA must have a Job Card. Here is how to get one:</p>
<ol class="steps-list">
<li>Visit your <strong>Gram Panchayat office</strong></li>
<li>Submit a written application for Job Card registration</li>
<li>Provide details of all adult members who want to work</li>
<li>Attach <strong>passport size photos</strong> of all applicants</li>
<li>Provide address proof and Aadhaar numbers</li>
<li>Job Card must be issued within <strong>15 days</strong> of application</li>
<li>The Job Card is <strong>completely free</strong></li>
</ol>

<h2>How to Apply for MGNREGA Work</h2>
<ol class="steps-list">
<li>Submit a written application to the <strong>Gram Panchayat</strong> requesting work</li>
<li>Mention the number of days of work required</li>
<li>Government must provide work within <strong>15 days</strong> of application</li>
<li>If work is not provided within 15 days, you are entitled to <strong>unemployment allowance</strong></li>
<li>Work will be provided within 5 km of your residence (if farther, 10% extra wage)</li>
<li>After completing work, wages are deposited in 15 days</li>
</ol>

<h2>Types of Work Done Under MGNREGA</h2>
<p>MGNREGA focuses on creating durable assets in rural areas. The types of work include:</p>
<ul>
<li>Water conservation and water harvesting — ponds, check dams, wells</li>
<li>Drought proofing including afforestation and tree plantation</li>
<li>Irrigation canals including micro and minor irrigation works</li>
<li>Provision of irrigation facility to land owned by SC/ST or BPL families</li>
<li>Renovation of traditional water bodies</li>
<li>Land development and flood control works</li>
<li>Rural connectivity — construction of roads within villages</li>
<li>Construction of Anganwadi centres, school buildings, toilets under Swachh Bharat</li>
</ul>

<h2>MGNREGA Wages by State 2024-25</h2>
<p>MGNREGA wages are revised annually and vary by state. Here are wages for major states:</p>
<div class="compare-table-wrap" style="overflow-x:auto">
<table class="compare-table">
<tr><th>State</th><th>Daily Wage (₹)</th></tr>
<tr><td>Haryana</td><td>₹374</td></tr>
<tr><td>Kerala</td><td>₹333</td></tr>
<tr><td>Karnataka</td><td>₹349</td></tr>
<tr><td>Maharashtra</td><td>₹273</td></tr>
<tr><td>Uttar Pradesh</td><td>₹237</td></tr>
<tr><td>Bihar</td><td>₹228</td></tr>
<tr><td>Rajasthan</td><td>₹255</td></tr>
<tr><td>Madhya Pradesh</td><td>₹221</td></tr>
<tr><td>West Bengal</td><td>₹250</td></tr>
<tr><td>Tamil Nadu</td><td>₹294</td></tr>
</table>
</div>

<h2>How to Check MGNREGA Payment Status</h2>
<ul>
<li><strong>Online:</strong> Visit nrega.nic.in → State → District → Block → Panchayat → Job Card</li>
<li><strong>Mobile App:</strong> Download UMANG app and search for MGNREGA</li>
<li><strong>Bank Passbook:</strong> Check your bank or post office account</li>
<li><strong>Gram Panchayat:</strong> Ask at the Gram Panchayat office for your payment details</li>
</ul>
    `,
    faqs: [
      { q: 'How many days of work does MGNREGA guarantee?', a: 'MGNREGA guarantees minimum 100 days of wage employment per financial year per household. In some states and for certain categories like SC/ST and women, additional days may be provided.' },
      { q: 'What happens if the government does not give work within 15 days?', a: 'You are legally entitled to an unemployment allowance. For the first 30 days it is 1/4th of the wage rate, and for remaining days it is 1/2 of the wage rate. Claim it at your Gram Panchayat.' },
      { q: 'Can a woman apply for MGNREGA work?', a: 'Yes, and it is actively encouraged. At least 1/3rd of MGNREGA workers must be women. Women are given priority in work allocation and equal wages.' },
      { q: 'Is there any minimum education required for MGNREGA?', a: 'No. MGNREGA is for unskilled manual work. There is no education or skill requirement. Any adult rural resident can participate.' },
      { q: 'Can urban residents apply for MGNREGA?', a: 'No. MGNREGA is only for rural areas. Urban residents are not eligible. However, if you live in a Gram Panchayat area that was recently included in urban limits, check with your local authority.' },
      { q: 'How do I get my MGNREGA payment if I do not have a bank account?', a: 'You must open a bank account or post office account to receive MGNREGA wages. Visit your nearest bank with Aadhaar and Job Card to open a zero-balance Jan Dhan account.' }
    ],
    applyUrl: 'https://nrega.nic.in',
    helpline: '1800-111-555',
    relatedSlugs: ['pm-kisan', 'jan-dhan-yojana', 'ration-card', 'ujjwala-yojana']
  }

};

// ============================================================
// CSS — Mobile-first, professional design
// ============================================================
const CSS = `*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;background:#f8f3eb;color:#111;-webkit-font-smoothing:antialiased}
nav{background:#1a1a2e;position:sticky;top:0;z-index:999;border-bottom:3px solid #e05c1a;padding:0 2rem;height:58px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;color:#fff;display:flex;align-items:center;gap:8px;text-decoration:none}
.logo span{color:#e05c1a}
.nav-links{display:flex;gap:1.2rem;align-items:center}
.nav-links a{color:rgba(255,255,255,0.85);font-size:0.85rem;font-weight:700;text-decoration:none;padding:10px 4px;min-height:44px;display:inline-flex;align-items:center;transition:color 0.2s}
.nav-links a:hover{color:#f2a900}
.nav-btn{background:#e05c1a;color:#fff;border:none;padding:10px 18px;border-radius:6px;font-weight:800;font-size:0.82rem;cursor:pointer;font-family:'Nunito',sans-serif;min-height:44px;text-decoration:none;display:inline-flex;align-items:center}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:10px;background:none;border:none;min-height:44px;min-width:44px;justify-content:center;align-items:center}
.hamburger span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all 0.25s}
.mobile-menu{display:none;position:fixed;top:58px;left:0;right:0;background:#1a1a2e;border-top:2px solid #e05c1a;z-index:998;padding:1rem 1.5rem;flex-direction:column;gap:0.75rem;box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.mobile-menu.open{display:flex}
.mobile-menu a{color:rgba(255,255,255,0.75);font-size:0.95rem;font-weight:700;padding:0.75rem 0;border-bottom:1px solid rgba(255,255,255,0.08);text-decoration:none;min-height:44px;display:flex;align-items:center}
.hero{background:linear-gradient(135deg,#1a1a2e 0%,#2d2d5e 60%,#1a1a2e 100%);padding:3rem 2rem 2.5rem;text-align:center}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(242,169,0,0.15);border:1px solid rgba(242,169,0,0.4);color:#f2a900;padding:7px 18px;border-radius:100px;font-size:0.75rem;font-weight:700;margin-bottom:1.5rem;font-family:'JetBrains Mono',monospace;letter-spacing:0.5px}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,3rem);color:#fff;line-height:1.15;margin-bottom:1.2rem;font-weight:900}
.hero h1 em{color:#e05c1a;font-style:italic}
.hero-sub{font-size:1rem;color:rgba(255,255,255,0.87);max-width:700px;margin:0 auto 1.5rem;line-height:1.8}
.breadcrumb{display:flex;align-items:center;gap:8px;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:rgba(255,255,255,0.4);margin-bottom:1.5rem;flex-wrap:wrap}
.breadcrumb a{color:rgba(255,255,255,0.55);text-decoration:none}
.ad-slot{background:#fff;border:1px solid #e8e0d5;border-radius:12px;padding:0.5rem;margin:2rem auto;text-align:center;max-width:900px;overflow:hidden}
.ad-label{font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:#bbb;margin-bottom:4px;display:block}
.content-sec{padding:2.5rem 2rem;max-width:900px;margin:0 auto}
.content-sec h2{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#1a1a2e;margin:2.5rem 0 0.85rem;padding-top:1.5rem;border-top:2px solid #e8e0d5}
.content-sec h2:first-child{border-top:none;padding-top:0;margin-top:0}
.content-sec h3{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#1a1a2e;margin:1.5rem 0 0.5rem}
.content-sec p{font-size:0.97rem;color:#333;line-height:1.85;margin-bottom:1.1rem}
.content-sec ul,.content-sec ol{margin:0.5rem 0 1.2rem 1.5rem;font-size:0.97rem;color:#333;line-height:1.85}
.content-sec li{margin-bottom:0.55rem}
.highlight-box{background:#fff5f0;border-left:4px solid #e05c1a;border-radius:0 12px 12px 0;padding:1.25rem 1.5rem;margin:1.75rem 0;font-size:0.96rem;color:#1a1a2e;line-height:1.8}
.highlight-box strong{color:#e05c1a}
.info-box{background:#f0faf6;border-left:4px solid #22a876;border-radius:0 12px 12px 0;padding:1.25rem 1.5rem;margin:1.75rem 0;font-size:0.96rem;color:#1a1a2e;line-height:1.8}
.info-box strong{color:#1a7f5a}
.warn-box{background:#fffbf0;border-left:4px solid #f2a900;border-radius:0 12px 12px 0;padding:1.25rem 1.5rem;margin:1.75rem 0;font-size:0.96rem;color:#1a1a2e;line-height:1.8}
.warn-box strong{color:#b37e00}
.key-facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem;margin:1.5rem 0}
.fact-card{background:#fff;border:2px solid #e8e0d5;border-radius:12px;padding:1.25rem;text-align:center}
.fact-card .num{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:#e05c1a;margin-bottom:0.25rem}
.fact-card .label{font-size:0.8rem;color:#666;font-weight:700}
.steps-list{counter-reset:steps;list-style:none;margin-left:0}
.steps-list li{counter-increment:steps;display:flex;gap:1rem;margin-bottom:1.25rem;align-items:flex-start}
.steps-list li::before{content:counter(steps);background:#e05c1a;color:#fff;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:0.8rem;min-width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.compare-table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.9rem}
.compare-table th{background:#1a1a2e;color:#fff;padding:0.75rem 1rem;text-align:left;font-family:'JetBrains Mono',monospace;font-size:0.8rem}
.compare-table td{padding:0.75rem 1rem;border-bottom:1px solid #e8e0d5;color:#333;line-height:1.7}
.compare-table tr:nth-child(even) td{background:#fdf8f4}
.faq-section{background:#fff;border-radius:16px;border:2px solid #e8e0d5;overflow:hidden;margin:2rem 0}
.faq-head{background:#1a1a2e;padding:1.25rem 1.5rem}
.faq-head h3{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#fff}
.faq-head p{font-size:0.8rem;color:rgba(255,255,255,0.6);margin-top:3px;font-family:'JetBrains Mono',monospace}
.faq-item{border-bottom:1px solid #f0e8de;overflow:hidden}
.faq-item:last-child{border-bottom:none}
.faq-q{display:flex;justify-content:space-between;align-items:center;padding:1.1rem 1.5rem;cursor:pointer;gap:1rem;background:#fff;transition:background 0.18s}
.faq-q:hover{background:#fdf8f4}
.faq-q-text{font-weight:700;font-size:0.9rem;color:#1a1a2e;line-height:1.4}
.faq-icon{font-size:1.1rem;color:#e05c1a;flex-shrink:0;transition:transform 0.2s;font-weight:900}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-a{display:none;padding:0 1.5rem 1.1rem;font-size:0.88rem;color:#555;line-height:1.85;background:#fdf8f4}
.faq-item.open .faq-a{display:block}
.apply-bar{background:#1a1a2e;padding:2.5rem 2rem;text-align:center}
.apply-bar h3{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:#fff;margin-bottom:0.5rem}
.apply-bar p{font-size:0.9rem;color:rgba(255,255,255,0.7);margin-bottom:1.5rem}
.apply-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.apply-btn{padding:12px 28px;border-radius:8px;font-weight:800;font-size:0.9rem;cursor:pointer;font-family:'Nunito',sans-serif;text-decoration:none;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px}
.apply-btn.primary{background:#e05c1a;color:#fff;border:2px solid #e05c1a}
.apply-btn.primary:hover{background:#ff6b35}
.apply-btn.secondary{background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.3)}
.apply-btn.secondary:hover{border-color:#fff}
.related-sec{padding:3rem 2rem;background:#f0e9de}
.related-sec-inner{max-width:900px;margin:0 auto}
.sec-mono{font-family:'JetBrains Mono',monospace;font-size:0.7rem;letter-spacing:3px;text-transform:uppercase;color:#a03a08;margin-bottom:0.75rem}
.sec-title{font-family:'Playfair Display',serif;font-weight:900;font-size:1.6rem;color:#1a1a2e;margin-bottom:1.5rem}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}
.rel-card{background:#fff;border:2px solid #e8e0d5;border-radius:12px;padding:1.25rem;text-decoration:none;display:block;transition:all 0.2s}
.rel-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(26,26,46,0.1);border-color:#e05c1a}
.rel-icon{font-size:1.5rem;margin-bottom:0.6rem}
.rel-title{font-family:'Playfair Display',serif;font-weight:700;font-size:0.95rem;color:#1a1a2e;margin-bottom:0.4rem;line-height:1.3}
footer{background:#1a1a2e;padding:3rem 2rem}
.foot-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem}
.foot-logo{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:#fff;margin-bottom:0.75rem}
.foot-logo span{color:#e05c1a}
.foot-tag{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:rgba(255,255,255,0.6);line-height:1.9}
.foot-col-title{font-size:0.85rem;font-weight:800;color:rgba(255,255,255,0.9);margin-bottom:1rem}
.foot-col a{display:flex;align-items:center;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:rgba(255,255,255,0.6);margin-bottom:0.5rem;text-decoration:none;min-height:44px;transition:color 0.2s}
.foot-col a:hover{color:#f2a900}
.foot-bottom{max-width:1200px;margin:2rem auto 0;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;font-family:'JetBrains Mono',monospace;font-size:0.64rem;color:rgba(255,255,255,0.6)}
.foot-bottom .green{color:#4ade80}
.disclaimer{background:#fff;border-top:2px solid #e8e0d5;padding:1.5rem 2rem;text-align:center}
.disc{font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#aaa;line-height:1.9;max-width:900px;margin:0 auto}
@media(max-width:768px){
  html,body{overflow-x:hidden!important;width:100%!important}
  *{box-sizing:border-box}
  nav{padding:0 1rem!important;height:54px!important}
  .nav-btn{display:none!important}
  .nav-links{display:none!important}
  .hamburger{display:flex!important}
  .logo{font-size:1.15rem!important}
  .hero{padding:2rem 1rem 1.5rem!important}
  .hero h1{font-size:1.55rem!important;line-height:1.2!important}
  .hero-sub{font-size:0.9rem!important;line-height:1.65!important;text-align:left!important}
  .content-sec{padding:1.25rem 1rem!important}
  .content-sec p{line-height:1.75!important;text-align:left!important}
  .key-facts{grid-template-columns:1fr 1fr!important}
  .compare-table{display:block!important;overflow-x:auto!important;font-size:0.8rem!important}
  .highlight-box,.info-box,.warn-box{padding:0.9rem 1rem!important;font-size:0.88rem!important}
  .ad-slot{min-height:0!important;padding:0.25rem!important;margin:0.75rem 0!important}
  .apply-btns{flex-direction:column!important;align-items:stretch!important}
  .apply-btn{width:100%!important;justify-content:center!important}
  .faq-q{padding:0.85rem 1rem!important}
  .related-grid{grid-template-columns:1fr!important}
  .foot-inner{grid-template-columns:1fr!important;gap:1.5rem!important}
  .foot-bottom{flex-direction:column!important;text-align:center!important}
  footer{padding:2rem 1rem!important}
}
@media(max-width:480px){
  .hero h1{font-size:1.35rem!important}
  .key-facts{grid-template-columns:1fr!important}
}`;

const PUBLISHER_ID = 'ca-pub-7633997088146449';

function adSlot() {
  return `<div class="ad-slot">
  <span class="ad-label">Advertisement</span>
  <ins class="adsbygoogle" style="display:block" data-ad-client="${PUBLISHER_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
  <script>(adsbygoogle=window.adsbygoogle||[]).push({});<\/script>
</div>`;
}

function buildPage(slug, data) {
  const faqItems = data.faqs.map((f, i) => `
  <div class="faq-item" id="faq${i}">
    <div class="faq-q" onclick="toggleFaq(${i})">
      <span class="faq-q-text">${f.q}</span>
      <span class="faq-icon">+</span>
    </div>
    <div class="faq-a">${f.a}</div>
  </div>`).join('');

  const factCards = data.facts.map(f => `
  <div class="fact-card">
    <div class="num">${f.num}</div>
    <div class="label">${f.label}</div>
  </div>`).join('');

  const relatedCards = (data.relatedSlugs || []).map(s => {
    const r = CONTENT_DB[s];
    if (!r) return '';
    return `<a href="/${s}.html" class="rel-card">
    <div class="rel-icon">${r.icon}</div>
    <div class="rel-title">${r.title}</div>
    <div style="font-size:0.8rem;color:#666;line-height:1.5">${r.subtitle}</div>
  </a>`;
  }).join('');

  const today = new Date().toISOString().split('T')[0];

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${data.title} 2025 – ${data.subtitle} | MeraHaq</title>
<meta name="description" content="${data.heroDesc.substring(0,155)}"/>
<meta name="keywords" content="${data.title}, ${data.title} 2025, eligibility, how to apply, documents, benefits, India, MeraHaq"/>
<meta name="author" content="MeraHaq"/>
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large"/>
<link rel="canonical" href="https://merahaq.online/${slug}.html"/>
<link rel="icon" type="image/png" href="/favicon.png"/>
<meta property="og:type" content="article"/>
<meta property="og:url" content="https://merahaq.online/${slug}.html"/>
<meta property="og:title" content="${data.title} 2025 – ${data.subtitle} | MeraHaq"/>
<meta property="og:description" content="${data.heroDesc.substring(0,155)}"/>
<meta property="og:locale" content="en_IN"/>
<meta property="og:site_name" content="MeraHaq"/>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${data.title} 2025 – ${data.subtitle}",
  "description": "${data.heroDesc.substring(0,155)}",
  "url": "https://merahaq.online/${slug}.html",
  "dateModified": "${today}",
  "publisher": {
    "@type": "Organization",
    "name": "MeraHaq",
    "url": "https://merahaq.online"
  }
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}" crossorigin="anonymous"></script>
<style>${CSS}</style>
</head>
<body>

<nav>
  <a href="/" class="logo">Mera<span>Haq</span></a>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/#schemes">Schemes</a>
    <a href="/#rights">Rights</a>
    <a href="/#helplines">Helplines</a>
    <a href="/#rti">RTI Tool</a>
  </div>
  <button class="hamburger" id="ham" onclick="toggleMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mob">
  <a href="/">🏠 Home</a>
  <a href="/#schemes">📋 Schemes</a>
  <a href="/#rights">⚖️ Rights</a>
  <a href="/#helplines">📞 Helplines</a>
  <a href="/#rti">📜 RTI Tool</a>
</div>

<div class="hero">
  <div class="breadcrumb">
    <a href="/">MeraHaq</a> › <span>${data.title}</span>
  </div>
  <div class="hero-badge">${data.icon} ${data.badge}</div>
  <h1>${data.title}<br><em>${data.subtitle}</em></h1>
  <p class="hero-sub">${data.heroDesc}</p>
</div>

${adSlot()}

<div class="content-sec">
  <div class="key-facts">${factCards}</div>
  ${data.content}
</div>

${adSlot()}

<div class="content-sec" style="padding-top:0">
  <div class="faq-section">
    <div class="faq-head">
      <h3>Frequently Asked Questions</h3>
      <p>Common questions about ${data.title} — verified and updated 2025</p>
    </div>
    ${faqItems}
  </div>
</div>

<div class="apply-bar">
  <h3>Apply for ${data.title} Now</h3>
  <p>Visit the official government portal to apply. It is completely free.</p>
  <div class="apply-btns">
    <a href="${data.applyUrl}" target="_blank" rel="noopener" class="apply-btn primary">Apply on Official Portal →</a>
    <a href="tel:${data.helpline}" class="apply-btn secondary">📞 Helpline: ${data.helpline}</a>
  </div>
</div>

${relatedCards ? `<div class="related-sec">
  <div class="related-sec-inner">
    <div class="sec-mono">Also Explore</div>
    <div class="sec-title">Related Schemes & Benefits</div>
    <div class="related-grid">${relatedCards}</div>
  </div>
</div>` : ''}

${adSlot()}

<div class="disclaimer">
  <p class="disc"><strong>Disclaimer:</strong> MeraHaq is an independent information platform. We are not affiliated with any government department. All information is for guidance only. Always verify from official government websites. Last updated: ${today}.</p>
</div>

<footer>
  <div class="foot-inner">
    <div>
      <div class="foot-logo">Mera<span>Haq</span></div>
      <div class="foot-tag">Your rights. Your schemes.<br>Free. Always.</div>
    </div>
    <div>
      <div class="foot-col-title">Schemes</div>
      <a href="/pm-kisan.html">PM-KISAN</a>
      <a href="/ayushman-bharat.html">Ayushman Bharat</a>
      <a href="/mgnrega.html">MGNREGA</a>
      <a href="/jan-dhan-yojana.html">Jan Dhan</a>
    </div>
    <div>
      <div class="foot-col-title">Rights</div>
      <a href="/legal-rights.html">Legal Rights</a>
      <a href="/labour-rights-india.html">Labour Rights</a>
      <a href="/women-rights-india.html">Women Rights</a>
    </div>
    <div>
      <div class="foot-col-title">Tools</div>
      <a href="/#rti">RTI Generator</a>
      <a href="/#helplines">Helplines</a>
      <a href="/#schemes">Scheme Finder</a>
    </div>
  </div>
  <div class="foot-bottom">
    <span>© 2025 MeraHaq. Free for all Indians.</span>
    <span class="green">● merahaq.online</span>
  </div>
</footer>

<script>
function toggleMenu(){
  document.getElementById('ham').classList.toggle('open');
  document.getElementById('mob').classList.toggle('open');
}
function toggleFaq(i){
  document.getElementById('faq'+i).classList.toggle('open');
}
document.addEventListener('click',function(e){
  const mob=document.getElementById('mob');
  const ham=document.getElementById('ham');
  if(mob&&ham&&mob.classList.contains('open')&&!mob.contains(e.target)&&!ham.contains(e.target)){
    mob.classList.remove('open');
    ham.classList.remove('open');
  }
});
</script>
</body>
</html>`;
}

// ── MAIN ────────────────────────────────────────────────
const keys = Object.keys(CONTENT_DB);
let built = 0;
for (const slug of keys) {
  const html = buildPage(slug, CONTENT_DB[slug]);
  fs.writeFileSync(`${slug}.html`, html, 'utf8');
  const words = html.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').split(' ').length;
  console.log(`✅ Built: ${slug}.html (~${words} words)`);
  built++;
}
console.log(`\n🎉 Done! Built ${built} high-quality pages.`);
