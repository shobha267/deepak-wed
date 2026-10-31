// DBG Gastro Care - Complete Professional Interactions & Clinical Systems
document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. MOBILE DRAWER NAVIGATION
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 2. SCROLL REVEAL ANIMATIONS
    // -------------------------------------------------------------
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        const windowHeight = window.innerHeight;
        const elementVisible = 60;
        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    // -------------------------------------------------------------
    // 3. COMMON CONCERNS - INTERACTIVE SYMPTOM EXPLORER TABS
    // -------------------------------------------------------------
    const symptomTabs = document.querySelectorAll('.symptom-tab-btn');
    const symptomPanels = document.querySelectorAll('.symptom-panel');

    if (symptomTabs.length > 0) {
        symptomTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                
                // Update active tab
                symptomTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Update active panel
                symptomPanels.forEach(panel => {
                    if (panel.id === `panel-${targetId}`) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------
    // 4. HEALTH INSIGHTS ARTICLE READER MODAL
    // -------------------------------------------------------------
    const insightModal = document.getElementById('insightArticleModal');
    const insightBackdrop = document.getElementById('insightBackdrop');
    const closeInsightBtn = document.getElementById('closeInsightBtn');
    const insightModalTitle = document.getElementById('insightModalTitle');
    const insightArticleContent = document.getElementById('insightArticleContent');

    const articlesData = {
        'gerd': {
            title: 'Understanding Acidity & Acid Reflux: When Heartburn Needs Specialist Attention',
            body: `<p>Occasional acid reflux after a heavy or spicy meal is relatively common. However, when stomach acid frequently washes back into the esophagus—more than twice a week—it is classified clinically as <strong>Gastroesophageal Reflux Disease (GERD)</strong>.</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Key Mechanisms Behind Reflux</h4>
                   <p>The lower esophageal sphincter (LES) functions as a one-way muscular ring preventing gastric juices from flowing upward. Factors like hiatal hernia, delayed stomach emptying, obesity, or specific trigger foods can cause the sphincter to relax inappropriately.</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Why Early Specialist Evaluation Matters</h4>
                   <p>Uncontrolled long-term acid exposure can lead to chronic inflammation (esophagitis), narrowing of the food pipe (strictures), and cellular changes known as Barrett's esophagus. A clinical consultation with Dr. Deepak B G determines whether medication, lifestyle optimization, or Upper GI Endoscopy is indicated.</p>`
        },
        'bloating': {
            title: 'Common Causes of Persistent Bloating: Food Intolerances & Gut Motility',
            body: `<p>Abdominal bloating—the sensation of trapped gas, fullness, or visible distension—is among the most frequent reasons patients visit DBG Gastro Care. Rather than a standalone disease, it is usually a symptom of underlying digestive physiology.</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Primary Contributing Factors</h4>
                   <ul style="padding-left: 20px; margin-bottom: 14px;">
                     <li><strong>Altered Gut Motility:</strong> Sluggish transit of food through the small intestine and colon.</li>
                     <li><strong>Food Intolerances:</strong> Difficulty digesting lactose, fructose, or fermentable carbohydrates (FODMAPs).</li>
                     <li><strong>Visceral Hypersensitivity:</strong> Normal volumes of gas perceived as acutely painful or distended.</li>
                   </ul>
                   <p>Systematic clinical evaluation helps differentiate benign functional bloating from conditions like small intestinal bacterial overgrowth (SIBO) or biliary sluggishness.</p>`
        },
        'bowel': {
            title: 'Maintaining Healthy Bowel Habits: Diet, Fibre & Gut Regularity',
            body: `<p>A healthy digestive transit requires harmony between dietary substrate, microbial fermentation, and colonic muscular propulsion. Normal bowel frequency varies naturally from three times a day to once every three days, provided stools are soft and passed without straining.</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Core Pillars of Bowel Regularity</h4>
                   <p><strong>1. Balance Both Fibres:</strong> Soluble fibre (oats, isabgol, fruits) softens stool and forms a gel; insoluble fibre (whole grains, vegetables) adds necessary bulk.</p>
                   <p><strong>2. Consistent Hydration:</strong> Fibre without adequate water intake can paradoxically cause stool impaction.</p>
                   <p><strong>3. Honor the Gastrocolic Reflex:</strong> Bowel motility peaks naturally 30 minutes after breakfast—establishing an unhurried morning routine supports regularity.</p>`
        },
        'gastritis': {
            title: 'Understanding Gastritis: Acute vs Chronic Stomach Lining Irritation',
            body: `<p>Gastritis refers specifically to inflammation of the stomach mucosal lining. It can occur suddenly (acute gastritis) or persist quietly for months (chronic gastritis).</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Common Etiologies</h4>
                   <p>The two most common clinical causes are <em>Helicobacter pylori</em> bacterial infection and frequent use of non-steroidal anti-inflammatory drugs (NSAIDs / painkillers). Excessive alcohol and severe physiological stress also disrupt the mucus barrier.</p>
                   <p>Healing the stomach lining requires structured medical therapy to suppress excess acidity while simultaneously eliminating the underlying insult. Never ignore dark stools or chronic nausea.</p>`
        },
        'hydration': {
            title: 'The Importance of Hydration & Fibre in Long-term Digestive Wellness',
            body: `<p>Fluid balance is the cornerstone of digestive secretions—from saliva and gastric acid to pancreatic enzymes and bile salts. When the body is dehydrated, the colon compensates by reabsorbing excess water from stool, resulting in hard, difficult-to-pass bowel movements.</p>
                   <h4 style="color: var(--deep-teal); margin: 16px 0 8px;">Practical Daily Guidelines</h4>
                   <p>Aim for 2.5 to 3 liters of fluids throughout the day. Pair high-fibre meals with adequate water so that plant fibres swell properly inside the digestive lumen. Patients with persistent sluggishness should consult for a personalized motility evaluation.</p>`
        },
        'redflags': {
            title: 'Red-Flag Digestive Symptoms: When to Seek Immediate Medical Evaluation',
            body: `<p>While many digestive symptoms respond well to routine outpatient management, certain warning signs demand prompt, in-person clinical assessment by a gastroenterologist or emergency hospital care.</p>
                   <h4 style="color: #C83D75; margin: 16px 0 8px;">Red-Flag Symptoms to Note:</h4>
                   <ul style="padding-left: 20px; margin-bottom: 16px; color: var(--dark-charcoal);">
                     <li><strong>Persistent vomiting</strong> or vomiting blood (hematemesis).</li>
                     <li><strong>Black, tarry bowel movements</strong> (melena) indicating upper GI bleeding.</li>
                     <li><strong>Difficulty or pain swallowing</strong> food (dysphagia).</li>
                     <li><strong>Unexplained rapid weight loss</strong> or progressive loss of appetite.</li>
                     <li><strong>Severe, sudden, or continuous abdominal pain</strong> localized to one quadrant.</li>
                     <li><strong>New jaundice:</strong> Yellowing of eyes or skin with pale stools and dark urine.</li>
                   </ul>
                   <p>If you experience any of these red flags, contact our clinic immediately or proceed to the nearest emergency medical facility.</p>`
        }
    };

    window.openInsightArticle = function(articleId) {
        if (!insightModal || !articlesData[articleId]) return;
        const art = articlesData[articleId];
        insightModalTitle.textContent = art.title;
        insightArticleContent.innerHTML = art.body;

        insightModal.style.display = 'flex';
        void insightModal.offsetWidth;
        insightModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeInsightModal = function() {
        if (!insightModal) return;
        insightModal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            insightModal.style.display = 'none';
        }, 250);
    };

    if (closeInsightBtn) closeInsightBtn.addEventListener('click', closeInsightModal);
    if (insightBackdrop) insightBackdrop.addEventListener('click', closeInsightModal);

    // -------------------------------------------------------------
    // 5. SMART APPOINTMENT MODAL & MULTI-STEP BOOKING
    // -------------------------------------------------------------
    const apptModal = document.getElementById('appointmentModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const consultationSelect = document.getElementById('consultationSelect');
    const selectedServicePillTitle = document.getElementById('selectedServicePillTitle');

    const serviceTitles = {
        'general': 'General Gastroenterology Consultation',
        'gerd': 'Acid Reflux / GERD',
        'gastritis': 'Gastritis and Indigestion',
        'abdominal_pain': 'Abdominal Pain Consultation',
        'ibs': 'IBS and Bowel Health',
        'constipation': 'Constipation and Digestive Health',
        'liver': 'Liver and Digestive Health',
        'followup': 'Follow-up Consultation',
        'endoscopy': 'Endoscopy Enquiry (Requires Confirmation)',
        'colonoscopy': 'Colonoscopy Enquiry (Requires Confirmation)',
        'other': 'Other Digestive Health Concern'
    };

    window.openAppointmentModal = function(serviceKey) {
        if (!apptModal) return;

        apptModal.style.display = 'flex';
        void apptModal.offsetWidth;
        apptModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        if (serviceKey && consultationSelect && serviceTitles[serviceKey]) {
            consultationSelect.value = serviceKey;
            if (selectedServicePillTitle) {
                selectedServicePillTitle.textContent = serviceTitles[serviceKey];
            }
        }

        const apptDateInput = document.getElementById('apptDate');
        if (apptDateInput) {
            const today = new Date().toISOString().split('T')[0];
            apptDateInput.setAttribute('min', today);
            if (!apptDateInput.value) {
                const nextDay = new Date();
                nextDay.setDate(nextDay.getDate() + 1);
                if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1);
                apptDateInput.value = nextDay.toISOString().split('T')[0];
            }
        }

        setTimeout(() => {
            const firstInput = document.getElementById('patientName');
            if (firstInput) firstInput.focus();
        }, 150);
    };

    window.closeAppointmentModal = function() {
        if (!apptModal) return;
        apptModal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            apptModal.style.display = 'none';
            // Reset modal feedback and submit button for next use without storing patient data in localStorage
            if (submissionFeedback) {
                submissionFeedback.style.display = 'none';
                submissionFeedback.innerHTML = '';
            }
            if (submitApptBtn) {
                submitApptBtn.style.display = 'inline-flex';
                submitApptBtn.disabled = false;
            }
            goToModalStep(1);
        }, 250);
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeAppointmentModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeAppointmentModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (apptModal?.classList.contains('show')) closeAppointmentModal();
            if (insightModal?.classList.contains('show')) closeInsightModal();
        }
    });

    // Attach to all appointment buttons
    document.querySelectorAll('.btn-header-appt, a[href="#appointment"], .btn-submit-appt').forEach(el => {
        el.addEventListener('click', (e) => {
            if (el.tagName === 'BUTTON' && el.type === 'submit') return; // let form handle
            e.preventDefault();
            const serviceKey = el.getAttribute('data-service') || 'general';
            openAppointmentModal(serviceKey);
        });
    });

    // Modal Stepper Logic
    let currentStep = 1;
    const stepPanels = document.querySelectorAll('.modal-step-panel');
    const stepIndicators = document.querySelectorAll('.step-indicator');

    function goToModalStep(stepNum) {
        currentStep = stepNum;
        stepPanels.forEach((panel, i) => {
            if (i + 1 === stepNum) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        stepIndicators.forEach((ind, i) => {
            if (i + 1 === stepNum) {
                ind.classList.add('active');
                ind.classList.remove('completed');
            } else if (i + 1 < stepNum) {
                ind.classList.add('active');
                ind.classList.add('completed');
            } else {
                ind.classList.remove('active', 'completed');
            }
        });
    }

    // Step 1 Validation & Next
    const goToStep2Btn = document.getElementById('goToStep2');
    if (goToStep2Btn) {
        goToStep2Btn.addEventListener('click', () => {
            const nameInput = document.getElementById('patientName');
            const phoneInput = document.getElementById('patientPhone');
            const emailInput = document.getElementById('patientEmail');

            const nameError = document.getElementById('nameError');
            const phoneError = document.getElementById('phoneError');
            const emailError = document.getElementById('emailError');

            let valid = true;

            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                nameInput.classList.add('invalid');
                if (nameError) nameError.classList.add('show');
                valid = false;
            } else {
                nameInput.classList.remove('invalid');
                if (nameError) nameError.classList.remove('show');
            }

            const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
            if (phoneClean.length !== 10) {
                phoneInput.classList.add('invalid');
                if (phoneError) phoneError.classList.add('show');
                valid = false;
            } else {
                phoneInput.classList.remove('invalid');
                if (phoneError) phoneError.classList.remove('show');
            }

            if (emailInput.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    emailInput.classList.add('invalid');
                    if (emailError) emailError.classList.add('show');
                    valid = false;
                } else {
                    emailInput.classList.remove('invalid');
                    if (emailError) emailError.classList.remove('show');
                }
            }

            if (valid) goToModalStep(2);
        });
    }

    // Step 2
    const backToStep1Btn = document.getElementById('backToStep1');
    const goToStep3Btn = document.getElementById('goToStep3');
    if (backToStep1Btn) backToStep1Btn.addEventListener('click', () => goToModalStep(1));

    if (consultationSelect) {
        consultationSelect.addEventListener('change', () => {
            const val = consultationSelect.value;
            if (selectedServicePillTitle && serviceTitles[val]) {
                selectedServicePillTitle.textContent = serviceTitles[val];
            }
        });
    }

    const radioChips = document.querySelectorAll('.radio-chip');
    radioChips.forEach(chip => {
        chip.addEventListener('click', () => {
            radioChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const radio = chip.querySelector('input');
            if (radio) radio.checked = true;
        });
    });

    if (goToStep3Btn) {
        goToStep3Btn.addEventListener('click', () => {
            goToModalStep(3);
        });
    }

    // Step 3
    const backToStep2Btn = document.getElementById('backToStep2');
    const goToStep4Btn = document.getElementById('goToStep4');
    const apptDateInput = document.getElementById('apptDate');
    const sundayNotice = document.getElementById('sundayNotice');

    if (backToStep2Btn) backToStep2Btn.addEventListener('click', () => goToModalStep(2));

    if (apptDateInput) {
        apptDateInput.addEventListener('change', () => {
            if (!apptDateInput.value) return;
            const chosenDate = new Date(apptDateInput.value + 'T00:00:00');
            if (chosenDate.getDay() === 0) {
                if (sundayNotice) sundayNotice.style.display = 'block';
                apptDateInput.classList.add('invalid');
            } else {
                if (sundayNotice) sundayNotice.style.display = 'none';
                apptDateInput.classList.remove('invalid');
            }
        });
    }

    if (goToStep4Btn) {
        goToStep4Btn.addEventListener('click', () => {
            const dateVal = apptDateInput?.value;
            const dateError = document.getElementById('dateError');

            if (!dateVal) {
                apptDateInput.classList.add('invalid');
                if (dateError) dateError.classList.add('show');
                return;
            }

            const chosenDate = new Date(dateVal + 'T00:00:00');
            if (chosenDate.getDay() === 0) {
                if (sundayNotice) sundayNotice.style.display = 'block';
                apptDateInput.classList.add('invalid');
                return;
            }

            apptDateInput.classList.remove('invalid');
            if (dateError) dateError.classList.remove('show');
            if (sundayNotice) sundayNotice.style.display = 'none';

            // Populate Step 4 Review Card
            document.getElementById('revName').textContent = document.getElementById('patientName').value.trim();
            document.getElementById('revPhone').textContent = document.getElementById('patientPhone').value.trim();

            const emailVal = document.getElementById('patientEmail').value.trim();
            if (emailVal) {
                document.getElementById('revEmail').textContent = emailVal;
                document.getElementById('revEmailRow').style.display = 'flex';
            } else {
                document.getElementById('revEmailRow').style.display = 'none';
            }

            const selService = consultationSelect.value;
            document.getElementById('revService').textContent = serviceTitles[selService] || selService;

            const modeChecked = document.querySelector('input[name="consultMode"]:checked')?.value;
            document.getElementById('revMode').textContent = modeChecked === 'online' ? 'Online Teleconsultation' : 'In-Person (Mysuru Clinic)';

            const slotVal = document.getElementById('apptTimeSlot').value;
            const dateStr = chosenDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            document.getElementById('revSchedule').textContent = `${dateStr} @ ${slotVal}`;

            goToModalStep(4);
        });
    }

    // Step 4 Submit
    const backToStep3Btn = document.getElementById('backToStep3');
    if (backToStep3Btn) backToStep3Btn.addEventListener('click', () => goToModalStep(3));

    const smartBookingForm = document.getElementById('smartBookingForm');
    const submitApptBtn = document.getElementById('submitApptBtn');
    const submissionFeedback = document.getElementById('submissionFeedback');

    if (smartBookingForm) {
        smartBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate Patient Name
            const nameInput = document.getElementById('patientName');
            const phoneInput = document.getElementById('patientPhone');
            const dateInput = document.getElementById('apptDate');

            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                goToModalStep(1);
                nameInput.focus();
                return;
            }

            const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
            if (phoneClean.length !== 10) {
                goToModalStep(1);
                phoneInput.focus();
                return;
            }

            if (!dateInput.value) {
                goToModalStep(3);
                dateInput.focus();
                return;
            }

            const patientName = nameInput.value.trim();
            const mobileNumber = phoneClean;
            const email = document.getElementById('patientEmail').value.trim() || 'Not Provided';
            const patientTypeVal = document.getElementById('patientType').value;
            const patientType = patientTypeVal === 'returning' ? 'Returning / Follow-up Patient' : 'New Patient (First Visit)';
            
            const selServiceKey = consultationSelect.value;
            const consultationName = serviceTitles[selServiceKey] || selServiceKey;
            
            const modeChecked = document.querySelector('input[name="consultMode"]:checked')?.value;
            const consultationMode = modeChecked === 'online' ? 'Online Teleconsultation' : 'In-Person (Mysuru Clinic)';
            
            const chosenDate = new Date(dateInput.value + 'T00:00:00');
            const dateStr = chosenDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            const timeSlot = document.getElementById('apptTimeSlot').value;
            const reason = document.getElementById('symptomsDesc').value.trim() || 'General Consultation';

            // Verified clinic WhatsApp contact number: +91 90192 70985 -> 919019270985 (without spaces/special chars)
            const clinicWhatsAppNumber = '919019270985';

            // Formatted WhatsApp Message according to clinic specification
            const whatsappMsg = `DBG GASTRO CARE - APPOINTMENT REQUEST
` +
                `Patient Name: ${patientName}
` +
                `Mobile: ${mobileNumber}
` +
                `Email: ${email}
` +
                `Patient Type: ${patientType}
` +
                `Consultation: ${consultationName}
` +
                `Preferred Date: ${dateStr}
` +
                `Preferred Time: ${timeSlot}
` +
                `Consultation Mode: ${consultationMode}
` +
                `Reason for Visit: ${reason}

` +
                `Please confirm the appointment availability.`;

            const whatsappUrl = `https://wa.me/${clinicWhatsAppNumber}?text=${encodeURIComponent(whatsappMsg)}`;

            // Attempt to launch WhatsApp click-to-chat
            window.open(whatsappUrl, '_blank');

            // Display confirmation screen (without claiming fake DB confirmation or fake auto-booking)
            if (submissionFeedback) {
                submissionFeedback.style.display = 'block';
                submissionFeedback.className = 'submission-feedback-box info';
                submissionFeedback.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <i class="fab fa-whatsapp" style="font-size: 1.8rem; color: #25D366;"></i>
                        <h4 style="margin: 0; font-size: 1.15rem; color: #075965;">Your Appointment Request Is Ready!</h4>
                    </div>
                    <p style="margin-bottom: 14px; font-size: 0.92rem; line-height: 1.55; color: #273640;">
                        Your appointment details are ready to send through WhatsApp. Please review the message and press <strong>Send</strong> in WhatsApp. Our clinic reception will contact you to confirm the appointment.
                    </p>
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="display: inline-flex; align-items: center; gap: 8px; background: #25D366; color: #FFFFFF; font-weight: 700; padding: 12px 24px; border-radius: var(--radius-full); text-decoration: none; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35); margin-bottom: 14px;">
                        <i class="fab fa-whatsapp"></i> Send Appointment Request via WhatsApp
                    </a>
                    <div style="font-size: 0.8rem; color: #627480; line-height: 1.45; border-top: 1px solid rgba(7, 89, 101, 0.15); padding-top: 10px; margin-top: 6px;">
                        <em>Please note:</em> The clinic must confirm the requested date and time based on Dr. Deepak B G's availability. Submitting a request does not automatically guarantee or confirm an appointment.
                    </div>
                    <div style="margin-top: 12px; padding: 12px 14px; background: #FAF7F2; border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.84rem;">
                        <strong>Fallback Contact Option:</strong><br>
                        If WhatsApp cannot be opened, please reach out to our clinic directly:<br>
                        <i class="fas fa-phone-alt" style="color: var(--soft-orange); margin-top: 4px;"></i> Call Clinic: <a href="tel:+919019270985" style="font-weight: 700; color: #075965;">+91 – 90192 70985</a> (Mon–Sat, 6:00 PM – 9:00 PM)<br>
                        <i class="fas fa-envelope" style="color: var(--deep-teal);"></i> Email: <a href="mailto:info@dbggastrocare.com" style="font-weight: 700; color: #075965;">info@dbggastrocare.com</a>
                    </div>
                `;
            }

            // Hide the initial submit button once request is prepared
            if (submitApptBtn) {
                submitApptBtn.style.display = 'none';
            }
        });
    }

    // Inline Appointment Form Submission Handler (WhatsApp-Powered)
    const inlineApptForm = document.getElementById('inlineApptForm');
    if (inlineApptForm) {
        inlineApptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('inlineName');
            const phoneInput = document.getElementById('inlinePhone');
            const dateInput = document.getElementById('inlineDate');

            if (!nameInput.value.trim() || !phoneInput.value.trim()) {
                alert('Please enter your full name and 10-digit mobile number.');
                return;
            }

            const chosenDate = dateInput?.value ? new Date(dateInput.value + 'T00:00:00') : new Date();
            if (chosenDate.getDay() === 0) {
                alert('The clinic is closed on Sundays. Visiting hours are Monday to Saturday, 6:00 PM – 9:00 PM. Please select a Monday–Saturday date.');
                return;
            }

            const patientName = nameInput.value.trim();
            const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
            const email = document.getElementById('inlineEmail')?.value.trim() || 'Not Provided';
            const selServiceKey = document.getElementById('inlineService')?.value || 'general';
            const consultationName = serviceTitles[selServiceKey] || selServiceKey;
            const dateStr = chosenDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
            const timeSlot = document.getElementById('inlineTime')?.value || '6:00 PM – 7:00 PM';
            const reason = document.getElementById('inlineSymptoms')?.value.trim() || 'General Consultation';

            const clinicWhatsAppNumber = '919019270985';
            const whatsappMsg = `DBG GASTRO CARE - APPOINTMENT REQUEST
` +
                `Patient Name: ${patientName}
` +
                `Mobile: ${phoneClean}
` +
                `Email: ${email}
` +
                `Patient Type: Appointment Request
` +
                `Consultation: ${consultationName}
` +
                `Preferred Date: ${dateStr}
` +
                `Preferred Time: ${timeSlot}
` +
                `Consultation Mode: In-Person (Mysuru Clinic)
` +
                `Reason for Visit: ${reason}

` +
                `Please confirm the appointment availability.`;

            const whatsappUrl = `https://wa.me/${clinicWhatsAppNumber}?text=${encodeURIComponent(whatsappMsg)}`;
            window.open(whatsappUrl, '_blank');

            let toast = inlineApptForm.parentElement.querySelector('.toast-notice');
            if (!toast) {
                toast = document.createElement('div');
                toast.className = 'toast-notice show';
                inlineApptForm.parentElement.appendChild(toast);
            } else {
                toast.classList.add('show');
            }

            toast.innerHTML = `
                <div style="font-size: 0.95rem; line-height: 1.5;">
                    <strong><i class="fab fa-whatsapp" style="color: #25D366;"></i> Your Appointment Request Is Ready!</strong><br>
                    Please review and click Send in WhatsApp. Our clinic reception will call you to confirm availability.<br>
                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="color: #25D366; font-weight: 800; text-decoration: underline;">Open WhatsApp Directly</a> | Call: <a href="tel:+919019270985" style="color: inherit; font-weight: 700;">+91 – 90192 70985</a>
                </div>
            `;
            inlineApptForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 6. LANGUAGE SELECTION
    // -------------------------------------------------------------
    const dropBtns = document.querySelectorAll('.lang-dropbtn');
    const dropContents = document.querySelectorAll('.lang-dropdown-content');

    dropBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropContents[index]) dropContents[index].classList.toggle('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-dropdown')) {
            // lang dropdown removed
        }
    });

    const langLinks = document.querySelectorAll('.lang-dropdown-content a');
    const langNames = { 'en': 'English', 'kn': 'ಕನ್ನಡ', 'hi': 'हिन्दी' };
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';

    function changeLanguage(langCode) {
        document.querySelectorAll('.lang-dropbtn span').forEach(span => {
            span.textContent = langNames[langCode] || 'English';
        });

        if (typeof translations !== 'undefined') {
            const transObj = translations[langCode] || translations['en'];
            document.querySelectorAll('[data-key]').forEach(elem => {
                const key = elem.getAttribute('data-key');
                if (transObj[key]) {
                    if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                        elem.placeholder = transObj[key];
                    } else {
                        elem.innerHTML = transObj[key];
                    }
                }
            });
        }
        localStorage.setItem('preferredLanguage', langCode);
        document.documentElement.lang = langCode;
    }

    if (typeof translations !== 'undefined') {
        changeLanguage(savedLang);
    }

    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.getAttribute('data-lang');
            // lang dropdown removed
            changeLanguage(langCode);
        });
    });

    // -------------------------------------------------------------
    // 7. SMOOTH SCROLLING FOR HASH LINKS
    // -------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#appointment') {
                e.preventDefault();
                openAppointmentModal('general');
                return;
            }
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // -------------------------------------------------------------
    // AUTOMATIC CONTINUOUS PATIENT JOURNEY ANIMATION CONTROLLER
    // -------------------------------------------------------------
    const journeySection = document.getElementById('approach');
    const journeySteps = document.querySelectorAll('.journey-step-item');
    const timelineBeam = document.getElementById('journeyTimelineBeam');
    let currentJourneyStep = 0;
    const totalJourneySteps = journeySteps.length;
    let journeyInterval = null;
    let isJourneyUserHovered = false;

    function updateActiveJourneyStep(stepIndex) {
        if (!journeySteps || journeySteps.length === 0) return;
        currentJourneyStep = (stepIndex + totalJourneySteps) % totalJourneySteps;

        journeySteps.forEach((step, idx) => {
            if (idx === currentJourneyStep) {
                step.classList.add('active');
                step.setAttribute('aria-current', 'step');
            } else {
                step.classList.remove('active');
                step.removeAttribute('aria-current');
            }
        });

        // Animate Timeline Beam
        if (timelineBeam) {
            const isMobile = window.innerWidth <= 768;
            const progress = (currentJourneyStep / (totalJourneySteps - 1));
            
            if (isMobile) {
                // Vertical motion from top to bottom
                timelineBeam.style.top = `${progress * 75}%`;
                timelineBeam.style.left = '0';
            } else {
                // Horizontal motion from left to right
                timelineBeam.style.left = `${progress * 75}%`;
                timelineBeam.style.top = '0';
            }
        }
    }

    function startJourneyAutoCycle() {
        stopJourneyAutoCycle();
        journeyInterval = setInterval(() => {
            if (!isJourneyUserHovered) {
                updateActiveJourneyStep(currentJourneyStep + 1);
            }
        }, 2400); // Smooth 2.4s staggered cycle per step
    }

    function stopJourneyAutoCycle() {
        if (journeyInterval) {
            clearInterval(journeyInterval);
            journeyInterval = null;
        }
    }

    if (journeySection && journeySteps.length > 0) {
        // Start from step 1
        updateActiveJourneyStep(0);

        // IntersectionObserver: automatically start animation when section enters viewport; pause when out of view
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startJourneyAutoCycle();
                } else {
                    stopJourneyAutoCycle();
                }
            });
        }, { threshold: 0.2 });

        journeyObserver.observe(journeySection);

        // Interaction without requiring interaction:
        // Hover/focus temporarily highlights that step and pauses timer
        journeySteps.forEach((step, idx) => {
            step.addEventListener('mouseenter', () => {
                isJourneyUserHovered = true;
                updateActiveJourneyStep(idx);
            });

            step.addEventListener('mouseleave', () => {
                isJourneyUserHovered = false;
            });

            step.addEventListener('focus', () => {
                isJourneyUserHovered = true;
                updateActiveJourneyStep(idx);
            });

            step.addEventListener('blur', () => {
                isJourneyUserHovered = false;
            });

            step.addEventListener('click', () => {
                updateActiveJourneyStep(idx);
            });
        });

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateActiveJourneyStep(currentJourneyStep);
        });
    }


    // -------------------------------------------------------------
    // DYNAMIC ANIMATED DIGESTIVE ANATOMY SENTENCE TICKER
    // -------------------------------------------------------------
    const tickerSentences = document.querySelectorAll('.ticker-sentence');
    const tickerIndicator = document.getElementById('tickerIndicator');
    const tickerProgressBar = document.getElementById('tickerProgressBar');
    const anatomyPointItems = document.querySelectorAll('.anatomy-point-item');
    const anatomyTickerCard = document.getElementById('anatomyTicker');

    let currentTickerIndex = 0;
    const totalTickerSentences = tickerSentences.length;
    let tickerTimer = null;
    let isTickerHovered = false;

    function resetProgressBar() {
        if (!tickerProgressBar) return;
        tickerProgressBar.style.transition = 'none';
        tickerProgressBar.style.width = '0%';
        void tickerProgressBar.offsetWidth; // force reflow
        tickerProgressBar.style.transition = 'width 3.5s linear';
        tickerProgressBar.style.width = '100%';
    }

    function updateActiveTicker(index) {
        if (!tickerSentences || totalTickerSentences === 0) return;
        currentTickerIndex = (index + totalTickerSentences) % totalTickerSentences;

        tickerSentences.forEach((sentence, idx) => {
            if (idx === currentTickerIndex) {
                sentence.classList.add('active');
            } else {
                sentence.classList.remove('active');
            }
        });

        if (tickerIndicator) {
            tickerIndicator.textContent = `${currentTickerIndex + 1} of ${totalTickerSentences}`;
        }

        // Highlight matching anatomy point item
        anatomyPointItems.forEach((point) => {
            const zone = parseInt(point.getAttribute('data-zone'), 10);
            if (zone === currentTickerIndex || (currentTickerIndex === 1 && zone === 2)) {
                point.classList.add('active-zone');
            } else {
                point.classList.remove('active-zone');
            }
        });

        resetProgressBar();
    }

    function startTickerCycle() {
        stopTickerCycle();
        resetProgressBar();
        tickerTimer = setInterval(() => {
            if (!isTickerHovered) {
                updateActiveTicker(currentTickerIndex + 1);
            }
        }, 3600); // cycle every 3.6 seconds
    }

    function stopTickerCycle() {
        if (tickerTimer) {
            clearInterval(tickerTimer);
            tickerTimer = null;
        }
    }

    if (tickerSentences.length > 0) {
        updateActiveTicker(0);
        startTickerCycle();

        if (anatomyTickerCard) {
            anatomyTickerCard.addEventListener('mouseenter', () => {
                isTickerHovered = true;
            });
            anatomyTickerCard.addEventListener('mouseleave', () => {
                isTickerHovered = false;
            });
        }

        // Click on points sets that sentence directly
        anatomyPointItems.forEach((point) => {
            point.addEventListener('click', () => {
                const zone = parseInt(point.getAttribute('data-zone'), 10);
                updateActiveTicker(zone);
            });
        });
    }


    // =============================================================
    // 11. INTERACTIVE CURSOR-STEERED & DRAGGABLE HEALTH INSIGHTS SHOWCASE
    // =============================================================
    (function initInteractiveEditorialFlow() {
        const flowTrack = document.getElementById('flowTrack');
        const flowViewport = document.getElementById('flowViewport');
        const flowToggleBtn = document.getElementById('flowToggleBtn');
        const flowToggleIcon = document.getElementById('flowToggleIcon');
        const flowPrevBtn = document.getElementById('flowPrevBtn');
        const flowNextBtn = document.getElementById('flowNextBtn');
        const flowStatusLabel = document.getElementById('flowStatusLabel');

        if (!flowTrack || !flowViewport) return;

        // Position & physics state
        let currentX = 0;
        let singleSetWidth = 0;
        let isPointerDown = false;
        let startPointerX = 0;
        let startTrackX = 0;
        let lastPointerX = 0;
        let lastPointerTime = performance.now();
        let inertiaVelocity = 0;
        let hasDragged = false;
        let isHovering = false;
        let hoverSpeed = 0;
        let cruiseSpeed = -0.75; // Default cruising speed (flowing left)
        let activeSpeed = -0.75;
        let isPausedByUser = false;
        let animationFrameId = null;

        // Calculate dimensions dynamically
        function recalculateDimensions() {
            const panels = flowTrack.querySelectorAll('.editorial-panel');
            if (panels.length >= 6) {
                // A single set consists of 6 panels
                let setWidth = 0;
                for (let i = 0; i < 6; i++) {
                    setWidth += panels[i].offsetWidth;
                }
                setWidth += 6 * 30; // 30px gap per panel
                singleSetWidth = setWidth;
                
                // Initialize in the middle set (Set 2) if first run
                if (currentX === 0 && singleSetWidth > 0) {
                    currentX = -singleSetWidth;
                }
            }
        }

        recalculateDimensions();
        window.addEventListener('resize', recalculateDimensions);

        // Check prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            isPausedByUser = true;
            if (flowToggleIcon) flowToggleIcon.className = 'fas fa-play';
            if (flowStatusLabel) flowStatusLabel.textContent = 'Reduced motion mode • Drag or use arrows to steer';
        }

        // Steer direction based on cursor position relative to viewport
        function handleCursorSteer(clientX) {
            const rect = flowViewport.getBoundingClientRect();
            if (rect.width <= 0) return;

            const ratio = (clientX - rect.left) / rect.width; // 0.0 to 1.0

            // Left Zone (< 0.35): Move cards to the RIGHT so earlier/left cards appear
            if (ratio < 0.35) {
                const strength = (0.35 - ratio) / 0.35; // 0 to 1
                hoverSpeed = strength * 5.0; // Positive velocity moves right
                flowViewport.classList.add('steer-left');
                flowViewport.classList.remove('steer-right');
                if (flowStatusLabel && !isPausedByUser) {
                    flowStatusLabel.textContent = 'Steering Left • Revealing earlier articles';
                }
            }
            // Right Zone (> 0.65): Move cards to the LEFT so subsequent/right cards appear
            else if (ratio > 0.65) {
                const strength = (ratio - 0.65) / 0.35; // 0 to 1
                hoverSpeed = -strength * 5.0; // Negative velocity moves left
                flowViewport.classList.add('steer-right');
                flowViewport.classList.remove('steer-left');
                if (flowStatusLabel && !isPausedByUser) {
                    flowStatusLabel.textContent = 'Steering Right • Revealing subsequent articles';
                }
            }
            // Center Zone (0.35 to 0.65): Rest / Slow Zone for comfortable reading
            else {
                hoverSpeed = 0;
                flowViewport.classList.remove('steer-left', 'steer-right');
                if (flowStatusLabel && !isPausedByUser) {
                    flowStatusLabel.textContent = 'Reading Focus • Drag or steer to navigate';
                }
            }
        }

        // Pointer Enter & Move
        flowViewport.addEventListener('pointerenter', (e) => {
            isHovering = true;
            if (!isPointerDown) {
                handleCursorSteer(e.clientX);
            }
        });

        flowViewport.addEventListener('pointermove', (e) => {
            if (isPointerDown) {
                // Active Dragging
                const deltaX = e.clientX - startPointerX;
                if (Math.abs(deltaX) > 4) {
                    hasDragged = true;
                    flowViewport.classList.add('is-dragging');
                }
                currentX = startTrackX + deltaX;

                const now = performance.now();
                const dt = now - lastPointerTime;
                if (dt > 0) {
                    inertiaVelocity = (e.clientX - lastPointerX) / dt * 16; // px per frame
                }
                lastPointerX = e.clientX;
                lastPointerTime = now;
            } else {
                // Hover steering
                handleCursorSteer(e.clientX);
            }
        });

        flowViewport.addEventListener('pointerleave', () => {
            isHovering = false;
            flowViewport.classList.remove('steer-left', 'steer-right');
            if (flowStatusLabel && !isPausedByUser && !isPointerDown) {
                flowStatusLabel.textContent = 'Interactive Clinical Showcase • Move cursor or drag left / right to steer';
            }
        });

        // Pointer Down (Drag Start)
        flowViewport.addEventListener('pointerdown', (e) => {
            // Only primary button
            if (e.button !== 0) return;
            isPointerDown = true;
            hasDragged = false;
            startPointerX = e.clientX;
            startTrackX = currentX;
            lastPointerX = e.clientX;
            lastPointerTime = performance.now();
            inertiaVelocity = 0;
            flowViewport.setPointerCapture(e.pointerId);
        });

        // Pointer Up & Cancel (Drag End)
        function endDrag(e) {
            if (!isPointerDown) return;
            isPointerDown = false;
            flowViewport.classList.remove('is-dragging');
            try {
                flowViewport.releasePointerCapture(e.pointerId);
            } catch (err) {}

            // Cap inertia to smooth bounds
            inertiaVelocity = Math.max(-16, Math.min(16, inertiaVelocity));
        }

        flowViewport.addEventListener('pointerup', endDrag);
        flowViewport.addEventListener('pointercancel', endDrag);

        // Prevent accidental card button clicks when dragging
        flowViewport.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);

        // Prev & Next Step Buttons (Nudge left/right by 1 card)
        function nudgeStep(direction) {
            inertiaVelocity = direction * 14;
            if (isPausedByUser) {
                setPause(false);
            }
        }

        if (flowPrevBtn) {
            flowPrevBtn.addEventListener('click', () => nudgeStep(1)); // Move right to reveal prev
        }

        if (flowNextBtn) {
            flowNextBtn.addEventListener('click', () => nudgeStep(-1)); // Move left to reveal next
        }

        // Pause/Play Toggle Button
        function setPause(paused) {
            isPausedByUser = paused;
            if (paused) {
                if (flowToggleIcon) flowToggleIcon.className = 'fas fa-play';
                if (flowStatusLabel) flowStatusLabel.textContent = 'Flow paused • Click play or drag to navigate';
            } else {
                if (flowToggleIcon) flowToggleIcon.className = 'fas fa-pause';
                if (flowStatusLabel) flowStatusLabel.textContent = 'Interactive Clinical Showcase • Move cursor or drag left / right to steer';
            }
        }

        if (flowToggleBtn) {
            flowToggleBtn.addEventListener('click', () => {
                setPause(!isPausedByUser);
            });
        }

        // Main RAF Physics & Render Loop
        function renderLoop() {
            if (!isPointerDown) {
                // 1. Inertia deceleration after drag or arrow click
                if (Math.abs(inertiaVelocity) > 0.08) {
                    currentX += inertiaVelocity;
                    inertiaVelocity *= 0.92; // Friction damping
                } else {
                    inertiaVelocity = 0;

                    // 2. Cursor hover steering
                    if (isHovering && !isPausedByUser) {
                        activeSpeed += (hoverSpeed - activeSpeed) * 0.12;
                        currentX += activeSpeed;
                    } 
                    // 3. Default idle cruise
                    else if (!isPausedByUser) {
                        activeSpeed += (cruiseSpeed - activeSpeed) * 0.08;
                        currentX += activeSpeed;
                    }
                }
            }

            // 4. Infinite Toroidal Seamless Wrap (Both Left AND Right)
            if (singleSetWidth > 0) {
                // If moved too far left, wrap to middle set
                if (currentX <= -2 * singleSetWidth) {
                    currentX += singleSetWidth;
                    startTrackX += singleSetWidth;
                }
                // If moved too far right, wrap to middle set
                else if (currentX >= -singleSetWidth / 2) {
                    currentX -= singleSetWidth;
                    startTrackX -= singleSetWidth;
                }
            }

            // 5. Apply GPU Transform
            flowTrack.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

            animationFrameId = requestAnimationFrame(renderLoop);
        }

        // Start render loop
        animationFrameId = requestAnimationFrame(renderLoop);
    })();



    // =============================================================
    // 12. ROBUST ACTIVE NAVIGATION SCROLL SPY & CLICK HIGHLIGHTER
    // =============================================================
    (function initActiveNavigation() {
        const navContainer = document.getElementById('navLinks');
        if (!navContainer) return;
        const navLinksList = Array.from(navContainer.querySelectorAll('a[href^="#"]'));
        if (navLinksList.length === 0) return;

        // Visual sections mapped to corresponding header navigation links
        const sectionMappings = [
            { id: 'hero', navHash: '#hero' },
            { id: 'understand-gut', navHash: '#services' },
            { id: 'services', navHash: '#services' },
            { id: 'approach', navHash: '#procedures' },
            { id: 'procedures', navHash: '#procedures' },
            { id: 'about', navHash: '#about' },
            { id: 'insights', navHash: '#insights' },
            { id: 'appointment', navHash: '#appointment' },
            { id: 'contact', navHash: '#contact' }
        ];

        let isManualClickScrolling = false;
        let manualScrollTimer = null;

        function setActiveNav(targetHash) {
            navLinksList.forEach(link => {
                if (link.getAttribute('href') === targetHash) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
            });
        }

        function calculateActiveSection() {
            if (isManualClickScrolling) return;

            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // 1. Top of page (within first 140px) -> Always Home
            if (scrollY < 140) {
                setActiveNav('#hero');
                return;
            }

            // 2. Near bottom of page or footer visible -> Always Contact
            if (windowHeight + scrollY >= docHeight - 80) {
                setActiveNav('#contact');
                return;
            }

            // 3. Scan sections with fixed header offset (110px)
            const headerOffset = 110;
            let currentActiveHash = null;

            for (let i = sectionMappings.length - 1; i >= 0; i--) {
                const item = sectionMappings[i];
                const sectionEl = document.getElementById(item.id);
                if (sectionEl) {
                    const rect = sectionEl.getBoundingClientRect();
                    if (rect.top <= headerOffset && rect.bottom > headerOffset) {
                        currentActiveHash = item.navHash;
                        break;
                    }
                }
            }

            // Fallback: pick the closest section above headerOffset
            if (!currentActiveHash) {
                for (let i = sectionMappings.length - 1; i >= 0; i--) {
                    const item = sectionMappings[i];
                    const sectionEl = document.getElementById(item.id);
                    if (sectionEl) {
                        const rect = sectionEl.getBoundingClientRect();
                        if (rect.top <= headerOffset) {
                            currentActiveHash = item.navHash;
                            break;
                        }
                    }
                }
            }

            if (currentActiveHash) {
                setActiveNav(currentActiveHash);
            }
        }

        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Handle navigation link clicks
        navLinksList.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetHash = this.getAttribute('href');
                if (targetHash && targetHash.startsWith('#')) {
                    isManualClickScrolling = true;
                    setActiveNav(targetHash);

                    if (manualScrollTimer) clearTimeout(manualScrollTimer);
                    manualScrollTimer = setTimeout(() => {
                        isManualClickScrolling = false;
                        calculateActiveSection();
                    }, 850);
                }
            });
        });

        // Initialize on load or URL hash
        if (window.location.hash && navLinksList.some(l => l.getAttribute('href') === window.location.hash)) {
            setActiveNav(window.location.hash);
        } else {
            calculateActiveSection();
        }
    })();

});
