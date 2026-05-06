import os
import re

files = ["index.html", "about.html", "services.html", "procedures.html", "contact.html"]

def replace_all(text, replacements):
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Scripts update
    content = content.replace('<div id="google_translate_element"></div>\n    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>', '<script src="translations.js"></script>')
    if '<script src="translations.js"></script>' not in content:
        content = content.replace('<script src="script.js"></script>', '<script src="translations.js"></script>\n    <script src="script.js"></script>')

    reps = {
        # Nav
        '<a href="index.html" class="active">Home</a>': '<a href="index.html" class="active" data-key="nav_home">Home</a>',
        '<a href="index.html">Home</a>': '<a href="index.html" data-key="nav_home">Home</a>',
        '<a href="about.html" class="active">About</a>': '<a href="about.html" class="active" data-key="nav_about">About</a>',
        '<a href="about.html">About</a>': '<a href="about.html" data-key="nav_about">About</a>',
        '<a href="services.html" class="active">Services</a>': '<a href="services.html" class="active" data-key="nav_services">Services</a>',
        '<a href="services.html">Services</a>': '<a href="services.html" data-key="nav_services">Services</a>',
        '<a href="procedures.html" class="active">Procedures</a>': '<a href="procedures.html" class="active" data-key="nav_procedures">Procedures</a>',
        '<a href="procedures.html">Procedures</a>': '<a href="procedures.html" data-key="nav_procedures">Procedures</a>',
        '<a href="contact.html" class="active">Contact</a>': '<a href="contact.html" class="active" data-key="nav_contact">Contact</a>',
        '<a href="contact.html">Contact</a>': '<a href="contact.html" data-key="nav_contact">Contact</a>',
        
        # Hero
        '<h1>Expert Care for a <span>Healthier Gut</span></h1>': '<h1 data-key="hero_title_1">Expert Care for a <span data-key="hero_title_2">Healthier Gut</span></h1>',
        '<p>Advanced Gastro Care by Dr. Deepak B G, a distinguished surgical gastroenterologist based in Mysore.</p>': '<p data-key="hero_desc">Advanced Gastro Care by Dr. Deepak B G, a distinguished surgical gastroenterologist based in Mysore.</p>',
        '<a href="contact.html" class="btn btn-primary">Book Appointment</a>': '<a href="contact.html" class="btn btn-primary" data-key="btn_book_appt">Book Appointment</a>',
        '<a href="services.html" class="btn btn-outline">Our Services</a>': '<a href="services.html" class="btn btn-outline" data-key="btn_our_services">Our Services</a>',

        # Highlights
        '<h2>Our Expertise</h2>': '<h2 data-key="expertise_title">Our Expertise</h2>',
        '<p>Comprehensive management of complex gastrointestinal disorders</p>': '<p data-key="expertise_subtitle">Comprehensive management of complex gastrointestinal disorders</p>',
        '<h3>Gastro Treatment</h3>': '<h3 data-key="gastro_title">Gastro Treatment</h3>',
        '<p>Expert diagnosis and treatment for all your gastrointestinal problems.</p>': '<p data-key="gastro_desc">Expert diagnosis and treatment for all your gastrointestinal problems.</p>',
        '<h3>GI Oncology</h3>': '<h3 data-key="oncology_title">GI Oncology</h3>',
        '<p>Over 1000 successful GI oncology surgeries performed with precision.</p>': '<p data-key="oncology_desc">Over 1000 successful GI oncology surgeries performed with precision.</p>',
        '<h3>Advanced Laparoscopy</h3>': '<h3 data-key="laparoscopy_title">Advanced Laparoscopy</h3>',
        '<p>More than 500 advanced laparoscopic procedures for faster recovery.</p>': '<p data-key="laparoscopy_desc">More than 500 advanced laparoscopic procedures for faster recovery.</p>',

        # Doctor
        '<h2>Dr. Deepak B G</h2>': '<h2 data-key="doc_name">Dr. Deepak B G</h2>',
        '<p style="color: var(--primary-green); font-weight: bold; margin-bottom: 5px;">MS from JIPMER, MCh from GB Pant Institute</p>': '<p style="color: var(--primary-green); font-weight: bold; margin-bottom: 5px;" data-key="doc_degree">MS from JIPMER, MCh from GB Pant Institute</p>',
        '<p style="font-weight: bold; margin-bottom: 15px;">A surgical gastroenterologist</p>': '<p style="font-weight: bold; margin-bottom: 15px;" data-key="doc_specialty">A surgical gastroenterologist</p>',
        '<p>"Dr. Deepak B, a distinguished surgical gastroenterologist based in Mysore, boasts a decade of valuable experience in the field. His educational background includes an MS in Surgery from the prestigious JIPMER and an MCh in Surgical Gastroenterology from the renowned GB Pant Institute in Delhi."</p>': '<p data-key="doc_desc_1">Dr. Deepak B, a distinguished surgical gastroenterologist based in Mysore, boasts a decade of valuable experience in the field. His educational background includes an MS in Surgery from the prestigious JIPMER and an MCh in Surgical Gastroenterology from the renowned GB Pant Institute in Delhi.</p>',
        '<p>Dr. Deepak B, a distinguished surgical gastroenterologist based in Mysore, boasts a decade of valuable experience in the field. His educational background includes an MS in Surgery from the prestigious JIPMER and an MCh in Surgical Gastroenterology from the renowned GB Pant Institute in Delhi.</p>': '<p data-key="doc_desc_1">Dr. Deepak B, a distinguished surgical gastroenterologist based in Mysore, boasts a decade of valuable experience in the field. His educational background includes an MS in Surgery from the prestigious JIPMER and an MCh in Surgical Gastroenterology from the renowned GB Pant Institute in Delhi.</p>',
        '<p>He is specialized in complex gastrointestinal surgeries and has a proven track record of successful outcomes in oncology and laparoscopic procedures.</p>': '<p data-key="doc_desc_2">He is specialized in complex gastrointestinal surgeries and has a proven track record of successful outcomes in oncology and laparoscopic procedures.</p>',
        '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> Over 1000 successful GI oncology surgeries</li>': '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> <span data-key="doc_bullet_1">Over 1000 successful GI oncology surgeries</span></li>',
        '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> More than 500 advanced laparoscopic procedures</li>': '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> <span data-key="doc_bullet_2">More than 500 advanced laparoscopic procedures</span></li>',
        '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> Numerous intricate hepato-pancreatico-biliary surgeries</li>': '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> <span data-key="doc_bullet_3">Numerous intricate hepato-pancreatico-biliary surgeries</span></li>',
        '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> Challenging redo and revision surgeries</li>': '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> <span data-key="doc_bullet_4">Challenging redo and revision surgeries</span></li>',
        '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> Comprehensive management of complex gastrointestinal disorders</li>': '<li><i class="fas fa-check-circle" style="color: var(--primary-green); margin-right: 8px;"></i> <span data-key="doc_bullet_5">Comprehensive management of complex gastrointestinal disorders</span></li>',
        '<a href="about.html" class="btn btn-outline">Read Full Profile</a>': '<a href="about.html" class="btn btn-outline" data-key="btn_read_profile">Read Full Profile</a>',

        # Procedures
        '<h2>Our Procedures</h2>': '<h2 data-key="proc_title">Our Procedures</h2>',
        '<p>Advanced diagnostic and therapeutic procedures performed with precision and care</p>': '<p data-key="proc_subtitle">Advanced diagnostic and therapeutic procedures performed with precision and care</p>',
        '<h4>Capsule Endoscopy</h4>': '<h4 data-key="capsule_title">Capsule Endoscopy</h4>',
        '<p>A swallowable capsule camera to visualize the small intestine in detail.</p>': '<p data-key="capsule_desc">A swallowable capsule camera to visualize the small intestine in detail.</p>',
        '<h4>Barium Study</h4>': '<h4 data-key="barium_title">Barium Study</h4>',
        '<p>Imaging technique to examine the digestive tract using barium contrast.</p>': '<p data-key="barium_desc">Imaging technique to examine the digestive tract using barium contrast.</p>',
        '<h4>Sigmoidoscopy</h4>': '<h4 data-key="sigmoidoscopy_title">Sigmoidoscopy</h4>',
        '<p>Examination of the lower large intestine to detect abnormalities.</p>': '<p data-key="sigmoidoscopy_desc">Examination of the lower large intestine to detect abnormalities.</p>',
        '<h4>ERCP</h4>': '<h4 data-key="ercp_title">ERCP</h4>',
        '<p>Procedure to diagnose and treat problems in the liver, gallbladder and bile ducts.</p>': '<p data-key="ercp_desc">Procedure to diagnose and treat problems in the liver, gallbladder and bile ducts.</p>',
        '<h4>Colonoscopy</h4>': '<h4 data-key="colonoscopy_title">Colonoscopy</h4>',
        '<p>Visual examination of the entire large intestine and distal small intestine.</p>': '<p data-key="colonoscopy_desc">Visual examination of the entire large intestine and distal small intestine.</p>',
        '<h4>Upper GI Endoscopy</h4>': '<h4 data-key="uppergi_title">Upper GI Endoscopy</h4>',
        '<p>Examination of the esophagus, stomach and the first part of the small intestine.</p>': '<p data-key="uppergi_desc">Examination of the esophagus, stomach and the first part of the small intestine.</p>',

        # Footer
        '<h3>DBG Gastro Care</h3>': '<h3 data-key="footer_clinic_name">DBG Gastro Care</h3>',
        '<p>Expert Care for a Healthier Gut. Advanced surgical gastroenterology in Mysore.</p>': '<p data-key="footer_clinic_desc">Expert Care for a Healthier Gut. Advanced surgical gastroenterology in Mysore.</p>',
        '<h3>Quick Links</h3>': '<h3 data-key="footer_quick_links">Quick Links</h3>',
        '<a href="about.html">About Us</a>': '<a href="about.html" data-key="nav_about">About Us</a>',
        '<h3>Visiting Hours</h3>': '<h3 data-key="footer_visiting_hours">Visiting Hours</h3>',
        '<span>Mon - Fri:</span>': '<span data-key="footer_mon_fri">Mon - Fri:</span>',
        '<span>6:00 pm - 9:00 pm</span>': '<span data-key="footer_time">6:00 pm - 9:00 pm</span>',
        '<span>Saturday:</span>': '<span data-key="footer_sat">Saturday:</span>',
        '<span>Sunday:</span>': '<span data-key="footer_sun">Sunday:</span>',
        '<span>Holiday</span>': '<span data-key="footer_holiday">Holiday</span>',
        '<h3>Contact Info</h3>': '<h3 data-key="footer_contact_info">Contact Info</h3>',
        '<p><i class="fas fa-map-marker-alt"></i> Mysore, Karnataka</p>': '<p><i class="fas fa-map-marker-alt"></i> <span data-key="contact_location">Mysore, Karnataka</span></p>',
        '<p>&copy; 2026 DBG Gastro Care. All Rights Reserved.</p>': '<p data-key="footer_copyright">&copy; 2026 DBG Gastro Care. All Rights Reserved.</p>',

        # About
        '<h1>About Us</h1>': '<h1 data-key="about_header_title">About Us</h1>',
        '<p>Dedicated to providing the highest quality gastrointestinal surgical care in Mysore.</p>': '<p data-key="about_header_desc">Dedicated to providing the highest quality gastrointestinal surgical care in Mysore.</p>',
        '<h3 class="vision-banner-title">Our Vision</h3>': '<h3 class="vision-banner-title" data-key="vision_title">Our Vision</h3>',
        '<p class="vision-banner-text">At DBG Gastro Care, we are committed to delivering advanced, compassionate, and comprehensive gastroenterology and surgical care. Led by Dr. Deepak B, our center is dedicated to providing world-class treatment solutions with a patient-first approach. We strive to ensure every patient receives individualized treatment plans, guided by ethical medical practices and the latest advancements in gastroenterology.</p>': '<p class="vision-banner-text" data-key="vision_desc">At DBG Gastro Care, we are committed to delivering advanced, compassionate, and comprehensive gastroenterology and surgical care. Led by Dr. Deepak B, our center is dedicated to providing world-class treatment solutions with a patient-first approach. We strive to ensure every patient receives individualized treatment plans, guided by ethical medical practices and the latest advancements in gastroenterology.</p>',
        '<div class="vision-pillar-label">Patient First</div>': '<div class="vision-pillar-label" data-key="patient_first">Patient First</div>',
        '<p class="vision-pillar-desc">Every decision is driven by patient safety, comfort, and well-being above all else.</p>': '<p class="vision-pillar-desc" data-key="patient_first_desc">Every decision is driven by patient safety, comfort, and well-being above all else.</p>',
        '<div class="vision-pillar-label">Advanced Technology</div>': '<div class="vision-pillar-label" data-key="adv_tech">Advanced Technology</div>',
        '<p class="vision-pillar-desc">Combining cutting-edge medical tools with precision for accurate diagnosis & treatment.</p>': '<p class="vision-pillar-desc" data-key="adv_tech_desc">Combining cutting-edge medical tools with precision for accurate diagnosis & treatment.</p>',
        '<div class="vision-pillar-label">Compassionate Care</div>': '<div class="vision-pillar-label" data-key="comp_care">Compassionate Care</div>',
        '<p class="vision-pillar-desc">Providing empathetic, personalized care in a comfortable and supportive environment.</p>': '<p class="vision-pillar-desc" data-key="comp_care_desc">Providing empathetic, personalized care in a comfortable and supportive environment.</p>',

        # Services
        '<h1>Our Services</h1>': '<h1 data-key="services_header_title">Our Services</h1>',
        '<p>Comprehensive gastroenterology and surgical services tailored to your needs.</p>': '<p data-key="services_header_desc">Comprehensive gastroenterology and surgical services tailored to your needs.</p>',
        '<h3>GI Surgery</h3>': '<h3 data-key="gi_surgery_title">GI Surgery</h3>',
        '<p>Advanced surgical interventions for complex gastrointestinal tract conditions.</p>': '<p data-key="gi_surgery_desc">Advanced surgical interventions for complex gastrointestinal tract conditions.</p>',
        '<h3>Diagnostic Endoscopy</h3>': '<h3 data-key="diag_endo_title">Diagnostic Endoscopy</h3>',
        '<p>State-of-the-art endoscopic evaluations for accurate diagnosis.</p>': '<p data-key="diag_endo_desc">State-of-the-art endoscopic evaluations for accurate diagnosis.</p>',
        '<h3>Liver Care</h3>': '<h3 data-key="liver_care_title">Liver Care</h3>',
        '<p>Specialized treatment and management of liver diseases and disorders.</p>': '<p data-key="liver_care_desc">Specialized treatment and management of liver diseases and disorders.</p>',
        '<h3>Pancreatic Surgery</h3>': '<h3 data-key="pancreatic_title">Pancreatic Surgery</h3>',
        '<p>Expert surgical care for pancreatic conditions and tumors.</p>': '<p data-key="pancreatic_desc">Expert surgical care for pancreatic conditions and tumors.</p>',
        '<h3>Colorectal Surgery</h3>': '<h3 data-key="colorectal_title">Colorectal Surgery</h3>',
        '<p>Minimally invasive and traditional surgical approaches for colorectal issues.</p>': '<p data-key="colorectal_desc">Minimally invasive and traditional surgical approaches for colorectal issues.</p>',
        '<h3>Weight Loss Surgery</h3>': '<h3 data-key="weight_loss_title">Weight Loss Surgery</h3>',
        '<p>Comprehensive bariatric surgical solutions for sustainable weight management.</p>': '<p data-key="weight_loss_desc">Comprehensive bariatric surgical solutions for sustainable weight management.</p>',

        # Contact
        '<h1>Contact Us</h1>': '<h1 data-key="contact_header_title">Contact Us</h1>',
        '<p>Get in touch with us for appointments and inquiries.</p>': '<p data-key="contact_header_desc">Get in touch with us for appointments and inquiries.</p>',
        '<h3>Address</h3>': '<h3 data-key="address_title">Address</h3>',
        '<h3>Phone</h3>': '<h3 data-key="phone_title">Phone</h3>',
        '<h3>Email</h3>': '<h3 data-key="email_title">Email</h3>',
        '<h3>Send us a Message</h3>': '<h3 data-key="send_msg_title">Send us a Message</h3>',
        'placeholder="Full Name"': 'placeholder="Full Name" data-key="form_name"',
        'placeholder="Phone Number"': 'placeholder="Phone Number" data-key="form_phone"',
        'placeholder="Your Message"': 'placeholder="Your Message" data-key="form_message"',
        '<button type="submit" class="btn btn-primary">Send Message</button>': '<button type="submit" class="btn btn-primary" data-key="btn_send_msg">Send Message</button>',
    }

    content = replace_all(content, reps)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done updating HTML files.")
