#!/usr/bin/env python3
"""
MeraHaq — Automatic Content Upgrader
Adds 800-1200 words of rich, original content to every HTML page.
No API key needed. Totally free. Run once via GitHub Actions.
"""

from bs4 import BeautifulSoup
import os, glob

# ─────────────────────────────────────────────
# RICH CONTENT LIBRARY — Pre-written for each page
# ─────────────────────────────────────────────
CONTENT_LIBRARY = {

"pm-kisan": """
<section class="rich-content">
<h2>PM Kisan Samman Nidhi Yojana — Complete Guide</h2>
<p>PM Kisan Samman Nidhi Yojana is one of the most important government schemes for farmers in India. Under this scheme, the central government provides direct financial assistance of Rs. 6,000 per year to eligible farmer families. This amount is transferred in three equal installments of Rs. 2,000 directly into the bank account of the farmer. The scheme was launched on February 24, 2019, by Prime Minister Narendra Modi.</p>

<h3>What is PM Kisan Yojana?</h3>
<p>PM Kisan Samman Nidhi is a Central Sector Scheme under which income support is provided to all farmer families across the country. The full cost of the scheme is borne by the Government of India. The objective is to provide financial support to farmers so that they can meet agricultural and allied activities as well as domestic needs. This scheme helps farmers buy seeds, fertilizers, and other farm inputs without financial stress.</p>

<h3>Who is Eligible for PM Kisan?</h3>
<p>All landholding farmer families in India are eligible for this scheme. A farmer family means a husband, wife, and minor children who own cultivable land as per land records of the concerned State or UT. However, some categories are excluded from the scheme:</p>
<ul>
<li>Former and present holders of constitutional posts</li>
<li>Former and present Ministers, State Ministers, Members of Lok Sabha and Rajya Sabha</li>
<li>Current and former mayors of municipal corporations</li>
<li>All serving or retired officers and employees of Central and State governments</li>
<li>All persons who paid income tax in last assessment year</li>
<li>Professionals like doctors, engineers, lawyers, chartered accountants</li>
</ul>

<h3>Benefits of PM Kisan Yojana</h3>
<p>The main benefits of this scheme are as follows:</p>
<ul>
<li>Rs. 6,000 per year directly in bank account — no middlemen</li>
<li>Three installments of Rs. 2,000 each — April-July, August-November, December-March</li>
<li>Money goes directly through Direct Benefit Transfer (DBT)</li>
<li>Helps farmers buy seeds and fertilizers at the start of crop season</li>
<li>Reduces dependence on moneylenders and reduces debt burden</li>
</ul>

<h3>How to Apply for PM Kisan — Step by Step</h3>
<p>There are two easy ways to register for PM Kisan:</p>
<p><strong>Online Method:</strong></p>
<ol>
<li>Visit the official website: pmkisan.gov.in</li>
<li>Click on "Farmers Corner" on the homepage</li>
<li>Click on "New Farmer Registration"</li>
<li>Enter your Aadhaar number and mobile number</li>
<li>Fill in your personal details — name, address, bank account</li>
<li>Upload land records as required</li>
<li>Submit the form and note your reference number</li>
</ol>
<p><strong>Offline Method:</strong></p>
<ol>
<li>Visit your nearest Common Service Centre (CSC)</li>
<li>Carry Aadhaar card, bank passbook, and land documents</li>
<li>The operator will fill the form for you</li>
<li>You will receive an SMS confirmation</li>
</ol>

<h3>Documents Required</h3>
<ul>
<li>Aadhaar Card (mandatory)</li>
<li>Bank account passbook with IFSC code</li>
<li>Land ownership documents (Khasra/Khatauni)</li>
<li>Mobile number linked to Aadhaar</li>
<li>Passport size photograph</li>
</ul>

<h3>How to Check PM Kisan Status</h3>
<p>You can easily check your PM Kisan payment status online. Go to pmkisan.gov.in, click on "Beneficiary Status" under Farmers Corner, and enter your Aadhaar number or mobile number. You will see all your past installments and upcoming payment dates. If your money is stuck, you can check the reason — usually it is because of wrong bank details or Aadhaar not linked to bank account.</p>

<h3>Common Problems and Solutions</h3>
<p>Many farmers face issues with PM Kisan payments. Here are the most common problems and how to solve them:</p>
<ul>
<li><strong>Payment not received:</strong> Check if your Aadhaar is linked to your bank account. Go to your nearest bank branch.</li>
<li><strong>Wrong bank details:</strong> Visit pmkisan.gov.in and update bank details under Farmers Corner.</li>
<li><strong>Name mismatch:</strong> Your name in Aadhaar must match bank records exactly. Visit bank to correct.</li>
<li><strong>Land records issue:</strong> Contact your local Patwari or Tehsildar office to update land records.</li>
</ul>

<h3>Frequently Asked Questions (FAQ)</h3>
<p><strong>Q: How many installments are given per year?</strong><br>A: Three installments of Rs. 2,000 each — total Rs. 6,000 per year.</p>
<p><strong>Q: Can tenant farmers apply?</strong><br>A: No, only landowner farmers are eligible as per the scheme rules.</p>
<p><strong>Q: Is Aadhaar mandatory?</strong><br>A: Yes, Aadhaar is mandatory. Without Aadhaar, registration is not possible.</p>
<p><strong>Q: My father died, can I get the benefit?</strong><br>A: The legal heir can apply by submitting a fresh registration with their own land documents.</p>
<p><strong>Q: Which helpline number to call for PM Kisan problems?</strong><br>A: PM Kisan Helpline: 155261 or 011-24300606. Available on working days.</p>

<h3>Conclusion</h3>
<p>PM Kisan Samman Nidhi Yojana is a lifeline for millions of farmers across India. If you are a landowner farmer and have not yet registered, do it today through pmkisan.gov.in or your nearest CSC centre. Make sure your Aadhaar is linked to your bank account to receive payments without any problem. Share this information with every farmer in your village — it is their right to receive this benefit.</p>
</section>
""",

"ration-card": """
<section class="rich-content">
<h2>Ration Card — Complete Guide for Every Indian Family</h2>
<p>A Ration Card is one of the most important documents for Indian families. It allows eligible families to buy subsidized food grains — rice, wheat, and sugar — from the Public Distribution System (PDS) through Fair Price Shops. Along with food security, a ration card also serves as an important identity document and address proof for many government schemes.</p>

<h3>Types of Ration Cards in India</h3>
<p>There are mainly three types of ration cards issued in India based on the economic condition of the family:</p>
<ul>
<li><strong>Antyodaya Anna Yojana (AAY) Card — Yellow Card:</strong> For the poorest of the poor families. They get 35 kg of food grains per month at highly subsidized rates — Rs. 3 per kg for rice and Rs. 2 per kg for wheat.</li>
<li><strong>Priority Household (PHH) Card:</strong> For families below the poverty line. They get 5 kg of food grains per person per month.</li>
<li><strong>Above Poverty Line (APL) Card:</strong> For families above the poverty line who still want subsidized rations at market-linked prices.</li>
</ul>

<h3>Who is Eligible for a Ration Card?</h3>
<p>Any Indian family that is a permanent resident of a state can apply for a ration card in that state. The eligibility depends on your income level and economic status. You must not already have a ration card in any other state. You need to provide proof of residence and identity documents.</p>

<h3>Benefits of Having a Ration Card</h3>
<ul>
<li>Subsidized food grains every month — save hundreds of rupees</li>
<li>Works as address proof for Aadhaar, bank account, passport</li>
<li>Required for many government schemes and benefits</li>
<li>Children's name added to card helps in school enrollment</li>
<li>One Nation One Ration Card — use anywhere in India</li>
</ul>

<h3>How to Apply for a New Ration Card</h3>
<ol>
<li>Visit your state's Food and Civil Supplies department website or nearest office</li>
<li>Get the application form — Form 1 for new ration card</li>
<li>Fill all family member details carefully</li>
<li>Attach all required documents</li>
<li>Submit at the nearest Block/Tehsil office or online portal</li>
<li>Get acknowledgment receipt with application number</li>
<li>Verification will be done by a field officer</li>
<li>Card is issued within 30–45 days after verification</li>
</ol>

<h3>Documents Required for Ration Card</h3>
<ul>
<li>Aadhaar card of all family members</li>
<li>Passport size photographs of all members</li>
<li>Income certificate from competent authority</li>
<li>Address proof — electricity bill, water bill, or rent agreement</li>
<li>Birth certificates of children</li>
<li>Marriage certificate (if applicable)</li>
<li>Bank passbook copy</li>
</ul>

<h3>One Nation One Ration Card — ONORC</h3>
<p>The One Nation One Ration Card scheme allows any ration card holder to buy their entitled food grains from any Fair Price Shop anywhere in India. This is very helpful for migrant workers who move to other states for work. You do not need to make a new ration card — just use your existing card at any PDS shop in India with Aadhaar authentication.</p>

<h3>How to Add or Remove Members from Ration Card</h3>
<p>You can add a newborn child, a newly married daughter-in-law, or any new family member to your ration card. Similarly, you can remove a member who has died or got married. Visit your nearest Food Supply office with Aadhaar of the member to be added or removed, along with birth certificate or marriage certificate as proof.</p>

<h3>Frequently Asked Questions</h3>
<p><strong>Q: Can I have a ration card in two states?</strong><br>A: No, a family can have only one ration card in one state.</p>
<p><strong>Q: What if my ration card is lost?</strong><br>A: Apply for a duplicate ration card at your local Food Supply office with an FIR copy.</p>
<p><strong>Q: Can I use ration card for Aadhaar address update?</strong><br>A: Yes, ration card is an accepted address proof for Aadhaar update.</p>
<p><strong>Q: What is the ration card helpline number?</strong><br>A: National Food Helpline: 1800-11-4000 (toll free). Also contact your state food department.</p>
<p><strong>Q: How to check ration card status online?</strong><br>A: Visit your state's food department website or ration.card.nic.in and enter your application number.</p>

<h3>Conclusion</h3>
<p>A ration card is every Indian family's right under the National Food Security Act. If you do not have a ration card, apply today at your nearest government office. If you have problems with your existing card — wrong name, missing members, or not receiving rations — contact your local Food Supply Inspector or call the national helpline. Food security is your fundamental right.</p>
</section>
""",

"aadhaar-guide": """
<section class="rich-content">
<h2>Aadhaar Card — Complete Guide: Apply, Update, Download</h2>
<p>Aadhaar is a 12-digit unique identification number issued by the Unique Identification Authority of India (UIDAI). It is the world's largest biometric ID system. Every Indian resident — from newborn babies to senior citizens — can get an Aadhaar card. Today, Aadhaar is required for almost everything — opening a bank account, getting a SIM card, applying for government schemes, filing income tax, and much more.</p>

<h3>Why is Aadhaar Important?</h3>
<p>Aadhaar has become the backbone of India's digital identity system. It links all your government benefits — ration card, PM Kisan, LPG subsidy, scholarships — to a single number. This prevents fraud and ensures benefits reach the right person. Aadhaar also makes KYC (Know Your Customer) easy for banks, mobile operators, and financial services.</p>

<h3>How to Apply for New Aadhaar Card</h3>
<ol>
<li>Find your nearest Aadhaar Enrollment Centre at appointments.uidai.gov.in</li>
<li>Book an appointment online — saves time</li>
<li>Visit the centre with original identity and address proof documents</li>
<li>Fill the enrollment form at the counter</li>
<li>Give your biometric data — fingerprints, iris scan, photograph</li>
<li>Collect your enrollment slip with a 14-digit EID (Enrollment ID)</li>
<li>Aadhaar card is delivered to your address within 90 days</li>
<li>You can also download e-Aadhaar online after 30 days</li>
</ol>

<h3>Documents Required for Aadhaar</h3>
<p>You need one Proof of Identity (PoI) and one Proof of Address (PoA):</p>
<ul>
<li>Proof of Identity: Passport, PAN card, Voter ID, Driving Licence, NREGA job card</li>
<li>Proof of Address: Passport, bank statement, electricity bill, water bill, telephone bill, rent agreement</li>
<li>For children under 5: Birth certificate and parents' Aadhaar</li>
</ul>

<h3>How to Update Aadhaar Details</h3>
<p>You can update your name, address, date of birth, mobile number, and email in Aadhaar. There are two ways:</p>
<p><strong>Online Update (Address only):</strong> Visit myaadhaar.uidai.gov.in, login with your Aadhaar and OTP, click on Update Address, upload proof, and submit.</p>
<p><strong>Offline Update (All details):</strong> Visit any Aadhaar Seva Kendra, fill the Aadhaar Update/Correction form, submit with supporting documents, and pay Rs. 50 service fee.</p>

<h3>How to Download e-Aadhaar</h3>
<ol>
<li>Visit myaadhaar.uidai.gov.in</li>
<li>Click on "Download Aadhaar"</li>
<li>Enter your 12-digit Aadhaar number</li>
<li>Enter the captcha code</li>
<li>Enter OTP received on your registered mobile number</li>
<li>Download the PDF — password is your PIN code (first 4 digits) + birth year</li>
</ol>

<h3>Frequently Asked Questions</h3>
<p><strong>Q: Is Aadhaar mandatory for all government schemes?</strong><br>A: Yes, Aadhaar is mandatory for most central government schemes and subsidies.</p>
<p><strong>Q: What if my mobile number is not registered in Aadhaar?</strong><br>A: Visit an Aadhaar Seva Kendra to update your mobile number in person.</p>
<p><strong>Q: How many times can I update my Aadhaar address?</strong><br>A: There is no fixed limit, but frequent updates may be flagged for verification.</p>
<p><strong>Q: Is e-Aadhaar valid as the original card?</strong><br>A: Yes, e-Aadhaar downloaded from UIDAI website is equally valid as the physical card.</p>
<p><strong>Q: UIDAI helpline number?</strong><br>A: 1947 (toll free, available 7 AM to 11 PM all days)</p>

<h3>Conclusion</h3>
<p>Aadhaar is your most important identity document in India today. Make sure your Aadhaar details are up to date — especially your mobile number, address, and bank account linkage. A wrong detail in Aadhaar can stop your government benefits. If you face any issue, call UIDAI helpline 1947 or visit your nearest Aadhaar Seva Kendra.</p>
</section>
""",

"mgnrega": """
<section class="rich-content">
<h2>MGNREGA — Mahatma Gandhi National Rural Employment Guarantee Act</h2>
<p>MGNREGA, also known as NREGA, is one of the largest employment guarantee schemes in the world. Under this scheme, the government guarantees 100 days of wage employment per year to every rural household whose adult members volunteer to do unskilled manual work. This scheme is a legal right — meaning if the government cannot provide work within 15 days of application, it must pay an unemployment allowance.</p>

<h3>What is MGNREGA?</h3>
<p>The Mahatma Gandhi National Rural Employment Guarantee Act was passed in 2005 and implemented from February 2, 2006. It covers all rural areas of India. The main purpose of the scheme is to provide livelihood security to rural households, create durable assets in rural areas, and reduce migration from villages to cities. Works done under MGNREGA include road construction, pond digging, tree plantation, and irrigation works.</p>

<h3>Key Benefits of MGNREGA</h3>
<ul>
<li>100 days of guaranteed employment per household per year</li>
<li>If work not given within 15 days — unemployment allowance is paid</li>
<li>Wages are paid within 15 days of work completion</li>
<li>One-third of workers must be women</li>
<li>Work must be provided within 5 km of the applicant's home</li>
<li>Extra 50 days work in drought-affected or other notified areas</li>
<li>Social audit every 6 months to check transparency</li>
</ul>

<h3>Who is Eligible for MGNREGA?</h3>
<p>Any adult member of a rural household who is willing to do unskilled manual work is eligible. You must be a resident of a rural area and at least 18 years old. There is no income limit — both poor and non-poor rural households can apply. You need to have a Job Card which is issued by your Gram Panchayat.</p>

<h3>How to Get MGNREGA Job Card</h3>
<ol>
<li>Visit your Gram Panchayat office</li>
<li>Fill the application form with your household details</li>
<li>Attach passport size photographs of all adult members</li>
<li>Submit with Aadhaar copy and address proof</li>
<li>Job Card is issued within 15 days — free of cost</li>
<li>Job Card number is used to apply for work</li>
</ol>

<h3>How to Apply for Work Under MGNREGA</h3>
<ol>
<li>Give a written or verbal application to your Gram Panchayat</li>
<li>At least 5 people from the same village should apply together</li>
<li>The Panchayat must give work within 15 days</li>
<li>If work is given more than 5 km away, 10% extra wages are paid</li>
<li>Wages are credited directly to your bank or post office account</li>
</ol>

<h3>MGNREGA Wage Rates 2024-25</h3>
<p>Wage rates under MGNREGA vary by state. The central government revises them every year based on Consumer Price Index. Some examples: Haryana — Rs. 374/day, Kerala — Rs. 349/day, Maharashtra — Rs. 273/day, UP — Rs. 237/day, Bihar — Rs. 228/day. Check the MGNREGA website for your state's current wage rate.</p>

<h3>Frequently Asked Questions</h3>
<p><strong>Q: Can a family get more than 100 days of work?</strong><br>A: In drought-affected areas or areas under special notification, up to 150 days can be provided.</p>
<p><strong>Q: What if wages are not paid on time?</strong><br>A: You are entitled to compensation at 0.05% of unpaid wages per day of delay.</p>
<p><strong>Q: Can I check my MGNREGA payment online?</strong><br>A: Yes, visit nrega.nic.in and search by your state, district, and Job Card number.</p>
<p><strong>Q: MGNREGA helpline number?</strong><br>A: 1800-111-555 (toll free)</p>
<p><strong>Q: What work is done under MGNREGA?</strong><br>A: Roads, ponds, check dams, canals, tree plantation, land leveling, and more.</p>

<h3>Conclusion</h3>
<p>MGNREGA is your right as a rural citizen of India. If you have a Job Card and the government fails to give you work or pay wages on time, you can file a complaint with the Programme Officer of your Block. You can also do a social audit to check if funds were used properly. MGNREGA has transformed millions of rural lives — make sure you claim what is rightfully yours.</p>
</section>
""",

"legal-rights": """
<section class="rich-content">
<h2>Legal Rights of Every Indian Citizen — Know Your Rights</h2>
<p>Every citizen of India has fundamental rights guaranteed by the Constitution. These rights protect you from discrimination, injustice, and exploitation. Unfortunately, many Indians do not know their basic legal rights and end up suffering silently. This guide explains your most important legal rights in simple language so you can stand up for yourself and your family.</p>

<h3>Fundamental Rights Under the Indian Constitution</h3>
<p>The Indian Constitution provides six categories of Fundamental Rights to every citizen:</p>
<ul>
<li><strong>Right to Equality (Articles 14-18):</strong> You cannot be discriminated against on the basis of religion, caste, sex, or place of birth. Everyone is equal before the law.</li>
<li><strong>Right to Freedom (Articles 19-22):</strong> Freedom of speech, expression, movement, residence, and profession. Right to life and personal liberty.</li>
<li><strong>Right Against Exploitation (Articles 23-24):</strong> No forced labour, no bonded labour, no child labour under 14 years.</li>
<li><strong>Right to Freedom of Religion (Articles 25-28):</strong> Freedom to follow, practice, and propagate any religion.</li>
<li><strong>Cultural and Educational Rights (Articles 29-30):</strong> Rights to preserve culture, language, and minority educational institutions.</li>
<li><strong>Right to Constitutional Remedies (Article 32):</strong> You can go to the Supreme Court or High Court if your fundamental rights are violated.</li>
</ul>

<h3>Your Rights When Arrested by Police</h3>
<p>If police arrest you, you have these rights under Section 50, 54, 55, 56, 57 of CrPC:</p>
<ul>
<li>Right to know the reason for arrest</li>
<li>Right to inform a family member or friend about your arrest</li>
<li>Right to meet a lawyer of your choice</li>
<li>Right to be produced before a magistrate within 24 hours</li>
<li>Right to free legal aid if you cannot afford a lawyer</li>
<li>Right not to be tortured or subjected to third degree</li>
</ul>

<h3>Right to Information (RTI)</h3>
<p>Under the Right to Information Act 2005, every Indian citizen has the right to ask any information from any government office. You can ask why your ration card was cancelled, why your pension was stopped, or how government money was spent. The government must reply within 30 days. Filing an RTI costs only Rs. 10 and can be done online at rtionline.gov.in.</p>

<h3>Consumer Rights</h3>
<p>Under the Consumer Protection Act 2019, you have these rights as a consumer:</p>
<ul>
<li>Right to safety from dangerous products</li>
<li>Right to be informed about product quality and price</li>
<li>Right to choose from different products</li>
<li>Right to be heard when you have a complaint</li>
<li>Right to seek redressal for unfair trade practices</li>
<li>Right to consumer education</li>
</ul>
<p>You can file a consumer complaint online at edaakhil.nic.in — completely free for claims up to Rs. 5 lakh.</p>

<h3>Labour Rights — Know Your Workplace Rights</h3>
<p>Every worker in India has basic rights protected by labour laws:</p>
<ul>
<li>Minimum wage as fixed by state government</li>
<li>Payment of wages on time — within 7 days for establishments with under 1000 workers</li>
<li>8-hour work day and 48-hour work week</li>
<li>Overtime pay at double the normal wage rate</li>
<li>Maternity leave of 26 weeks for women</li>
<li>Provident Fund (PF) and Employee State Insurance (ESI) for registered employees</li>
<li>Protection from wrongful termination</li>
</ul>

<h3>Women's Legal Rights</h3>
<p>Indian law gives special protection to women:</p>
<ul>
<li>Protection of Women from Domestic Violence Act, 2005</li>
<li>Dowry Prohibition Act — giving and taking dowry is a crime</li>
<li>Sexual Harassment at Workplace Act (POSH) — every company with 10+ employees must have an Internal Complaints Committee</li>
<li>Equal pay for equal work</li>
<li>Right to property in husband's ancestral property</li>
</ul>

<h3>Frequently Asked Questions</h3>
<p><strong>Q: What is free legal aid and who gets it?</strong><br>A: Free legal aid is provided to SC/ST, women, children, disabled persons, industrial workmen, and anyone with annual income below Rs. 1 lakh. Contact your nearest District Legal Services Authority (DLSA).</p>
<p><strong>Q: Can I file a police complaint online?</strong><br>A: Yes, most states have online FIR facilities. Visit your state police website.</p>
<p><strong>Q: What is a PIL?</strong><br>A: Public Interest Litigation — anyone can file a PIL in High Court or Supreme Court on an issue affecting the public interest, even without being a direct victim.</p>
<p><strong>Q: Legal helpline number?</strong><br>A: National Legal Services Authority helpline: 15100 (toll free)</p>
<p><strong>Q: Can police detain me without reason?</strong><br>A: No. Police must tell you the reason for arrest. If they do not, you can challenge it in court under habeas corpus.</p>

<h3>Conclusion</h3>
<p>Knowledge of your legal rights is your most powerful weapon against injustice. Whether it is a police case, a consumer complaint, a workplace dispute, or a government benefit being denied — the law is on your side if you know how to use it. Share this guide with everyone in your family and community. If you need legal help, contact your nearest District Legal Services Authority — they provide free legal advice and aid.</p>
</section>
""",

"default": """
<section class="rich-content">
<h2>Your Complete Rights & Guide — MeraHaq</h2>
<p>MeraHaq — meaning "My Right" — is dedicated to making every Indian aware of their rights and government entitlements. India has hundreds of government schemes and legal protections designed to help its citizens, but most people never claim these benefits simply because they don't know about them. This guide is your starting point to understanding and claiming what is rightfully yours.</p>

<h3>Why Every Indian Must Know Their Rights</h3>
<p>The Indian Constitution guarantees fundamental rights to every citizen. Beyond constitutional rights, Parliament has passed hundreds of laws that protect you as a worker, consumer, farmer, woman, child, or senior citizen. Government schemes worth crores of rupees go unclaimed every year because eligible citizens simply do not know about them. By educating yourself about your rights, you can access free healthcare, subsidized food, financial assistance, free education, legal aid, and much more.</p>

<h3>Key Government Schemes Every Indian Should Know</h3>
<ul>
<li><strong>PM Kisan Samman Nidhi:</strong> Rs. 6,000 per year for farmers</li>
<li><strong>Ayushman Bharat:</strong> Free health insurance up to Rs. 5 lakh per year</li>
<li><strong>PM Awas Yojana:</strong> Subsidy for building your own home</li>
<li><strong>Ujjwala Yojana:</strong> Free LPG connection for BPL families</li>
<li><strong>MGNREGA:</strong> 100 days guaranteed employment for rural households</li>
<li><strong>Sukanya Samriddhi Yojana:</strong> Savings scheme for girl child education and marriage</li>
<li><strong>National Scholarship Portal:</strong> Scholarships for students from all backgrounds</li>
</ul>

<h3>Your Fundamental Rights in Simple Language</h3>
<p>The Indian Constitution gives you six fundamental rights. Right to Equality means no one can discriminate against you for your religion, caste, gender, or birthplace. Right to Freedom gives you the freedom to speak, move, and live as you choose. Right Against Exploitation means no one can force you to work without pay or employ your children. Right to Religion means you can freely follow your faith. Cultural Rights protect your language and traditions. And most importantly, Right to Constitutional Remedies means if anyone violates your rights — including the government — you can approach the Supreme Court directly.</p>

<h3>How to File a Complaint Against Government Offices</h3>
<p>If any government officer mistreats you, denies your benefits, or asks for a bribe, you have multiple options. You can file an RTI (Right to Information) application at rtionline.gov.in to demand information. You can file a grievance on the CPGRAMS portal at pgportal.gov.in. You can also approach your local MP, MLA, or District Collector's office. For corruption specifically, you can report to your state's Anti-Corruption Bureau or the CBI.</p>

<h3>Free Government Services You Must Use</h3>
<ul>
<li>Free legal aid from District Legal Services Authority (call 15100)</li>
<li>Free medical treatment at government hospitals</li>
<li>Free education up to Class 8 under Right to Education Act</li>
<li>Free mid-day meals for school children</li>
<li>Free vaccinations under Universal Immunisation Programme</li>
<li>Free ration under National Food Security Act</li>
</ul>

<h3>Important Helpline Numbers</h3>
<ul>
<li>PM Kisan Helpline: 155261</li>
<li>Aadhaar Helpline: 1947</li>
<li>Legal Aid Helpline: 15100</li>
<li>Anti-Corruption Helpline: 1064</li>
<li>Women Helpline: 181</li>
<li>Child Helpline: 1098</li>
<li>National Consumer Helpline: 1800-11-4000</li>
</ul>

<h3>Frequently Asked Questions</h3>
<p><strong>Q: How do I know which government schemes I am eligible for?</strong><br>A: Visit myscheme.gov.in — enter your details and it shows all schemes you qualify for.</p>
<p><strong>Q: What is Direct Benefit Transfer (DBT)?</strong><br>A: DBT means government sends money directly to your bank account linked with Aadhaar — no middlemen.</p>
<p><strong>Q: Can I apply for multiple government schemes at once?</strong><br>A: Yes, you can apply for as many schemes as you are eligible for simultaneously.</p>
<p><strong>Q: What if I am denied a scheme I am eligible for?</strong><br>A: File an RTI or grievance online. You can also approach your local MLA or MP.</p>
<p><strong>Q: Is MeraHaq information free?</strong><br>A: Yes, MeraHaq is completely free. All information is provided as a public service.</p>

<h3>Conclusion</h3>
<p>MeraHaq exists for one purpose — to make sure every Indian knows and claims their rights. Whether you are a farmer, a daily wage worker, a student, a woman, or a senior citizen — the government has schemes and laws designed to support you. Bookmark this site, share it with your family, and come back whenever you need guidance on any government scheme or legal right. Mera Haq — Mera Adhikar.</p>
</section>
"""
}

# CSS to inject once in each page
RICH_CONTENT_CSS = """
<style>
.rich-content { margin: 30px 0; padding: 20px 0; border-top: 2px solid #e0e0e0; }
.rich-content h2 { font-size: 1.4em; color: #1a237e; margin-bottom: 15px; line-height: 1.3; }
.rich-content h3 { font-size: 1.1em; color: #333; margin: 20px 0 10px; border-left: 4px solid #ff6b00; padding-left: 10px; }
.rich-content p { font-size: 0.95em; line-height: 1.8; color: #444; margin-bottom: 12px; }
.rich-content ul, .rich-content ol { padding-left: 20px; margin-bottom: 12px; }
.rich-content li { font-size: 0.93em; line-height: 1.7; color: #444; margin-bottom: 5px; }
.rich-content strong { color: #1a237e; }
@media(max-width:600px) {
  .rich-content h2 { font-size: 1.2em; }
  .rich-content h3 { font-size: 1em; }
  .rich-content p, .rich-content li { font-size: 0.88em; }
}
</style>
"""

# ─────────────────────────────────────────────
# INTERNAL LINKS to add to every page
# ─────────────────────────────────────────────
INTERNAL_LINKS_HTML = """
<section class="related-links" style="margin:30px 0;padding:20px;background:#fff8f0;border-radius:10px;border:1px solid #ffe0b2;">
<h3 style="color:#e65100;font-size:1em;margin-bottom:12px;">📚 Related Guides on MeraHaq</h3>
<ul style="list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:8px;">
<li><a href="pm-kisan.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">🌾 PM Kisan Yojana</a></li>
<li><a href="aadhaar-guide.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">🪪 Aadhaar Guide</a></li>
<li><a href="ration-card.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">🍚 Ration Card</a></li>
<li><a href="mgnrega.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">⛏️ MGNREGA</a></li>
<li><a href="legal-rights.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">⚖️ Legal Rights</a></li>
<li><a href="ayushman-bharat.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">🏥 Ayushman Bharat</a></li>
<li><a href="rti-guide.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">📋 RTI Guide</a></li>
<li><a href="pan-card-guide.html" style="background:#fff;border:1px solid #ffcc80;border-radius:20px;padding:5px 12px;font-size:.82em;color:#e65100;text-decoration:none;">💳 PAN Card</a></li>
</ul>
</section>
"""

def get_content_for_file(filename):
    """Match filename to pre-written content."""
    name = filename.replace('.html','').lower()
    for key in CONTENT_LIBRARY:
        if key != 'default' and key in name:
            return CONTENT_LIBRARY[key]
    return CONTENT_LIBRARY['default']

def upgrade_html_file(filepath):
    """Upgrade a single HTML file with rich content."""
    skip_files = ['index.html','about.html','contact.html','privacy-policy.html',
                  'disclaimer.html','cookie-policy.html','terms.html','blog.html',
                  'add-adsense.js','fix_all_pages.js','full_fix.js','upgrade_script.js',
                  'content_generator.js','schema-markup-final.html','faq-snippet.html']
    
    filename = os.path.basename(filepath)
    if filename in skip_files:
        print(f"  SKIP: {filename}")
        return False

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            html = f.read()
        
        # Skip if already upgraded
        if 'rich-content' in html:
            print(f"  ALREADY DONE: {filename}")
            return False

        soup = BeautifulSoup(html, 'html.parser')
        
        # 1. Add CSS in <head>
        head = soup.find('head')
        if head and '<style>\n.rich-content' not in html:
            css_tag = BeautifulSoup(RICH_CONTENT_CSS, 'html.parser')
            head.append(css_tag)

        # 2. Add meta description if missing
        if not soup.find('meta', attrs={'name':'description'}):
            meta = soup.new_tag('meta', attrs={
                'name': 'description',
                'content': f'Complete guide about {filename.replace(".html","").replace("-"," ").title()} - eligibility, benefits, how to apply, documents required. MeraHaq - Every Indian\'s Rights Guide.'
            })
            if head:
                head.append(meta)

        # 3. Find best place to inject content
        rich_content = get_content_for_file(filename)
        internal_links = INTERNAL_LINKS_HTML
        injection = rich_content + internal_links
        
        injected = False
        
        # Try inserting before </body>
        body = soup.find('body')
        if body:
            inject_soup = BeautifulSoup(injection, 'html.parser')
            body.append(inject_soup)
            injected = True

        if injected:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))
            print(f"  UPGRADED: {filename}")
            return True
        else:
            print(f"  SKIP (no body tag): {filename}")
            return False

    except Exception as e:
        print(f"  ERROR {filename}: {e}")
        return False

def main():
    html_files = glob.glob('*.html')
    print(f"\nMeraHaq Content Upgrader")
    print(f"Found {len(html_files)} HTML files\n")
    
    upgraded = 0
    for filepath in sorted(html_files):
        if upgrade_html_file(filepath):
            upgraded += 1
    
    print(f"\nDone! Upgraded {upgraded} files.")
    print("Vercel will auto-deploy in 1-2 minutes.")

if __name__ == '__main__':
    main()
