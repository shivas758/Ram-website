// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
    updateActiveNav();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== ACTIVE NAV LINK ==========
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-btn)');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== POPUP (5 seconds delay) ==========
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');
const popupBook = document.getElementById('popupBook');

let popupShown = false;

setTimeout(() => {
    if (!popupShown && !sessionStorage.getItem('popupClosed')) {
        popupOverlay.classList.add('active');
        popupShown = true;
    }
}, 5000);

function closePopup() {
    popupOverlay.classList.remove('active');
    sessionStorage.setItem('popupClosed', 'true');
}

popupClose.addEventListener('click', closePopup);
popupBook.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
    setTimeout(() => {
        document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closePopup();
});

// ========== DOCTOR PROFILE MODAL ==========
const doctorProfiles = {
    'rohith-bg': {
        photo: 'Doctors images/Rohith B.G.jpeg',
        photoAlt: 'Dr. Rohith B.G.',
        tag: 'Consultant Neurologist',
        name: 'Dr. Rohith B.G.',
        credentials: 'MD (General Medicine) · DM Neurology · FSVN',
        quickfacts: [
            { icon: 'fa-graduation-cap', text: "St. John's Medical College" },
            { icon: 'fa-award', text: 'AIIMS Cochin Fellowship' },
            { icon: 'fa-map-marker-alt', text: 'Adoni · Kurnool' }
        ],
        sections: [
            {
                type: 'about', badge: 'About',
                heading: 'A Specialist in Complex & Rare Neurological Care',
                intro: 'Dr. Rohith B.G. is a highly skilled consultant neurologist focused on the diagnosis and management of complex and rare neurological conditions. With deep expertise in stroke and vascular neurology, he has been at the forefront of advanced neurological care — delivering evidence-based outcomes and handling rare and critical cases.'
            },
            {
                type: 'education', badge: 'Education & Qualifications',
                items: [
                    { icon: 'fa-user-md', title: 'MD — General Medicine', sub: 'Foundational training in internal medicine' },
                    { icon: 'fa-brain', title: 'DM — Neurology', sub: "St. John's Medical College" },
                    { icon: 'fa-award', title: 'FSVN — Stroke & Vascular Neurology', sub: 'Fellowship at AIIMS Cochin' }
                ]
            },
            {
                type: 'cards', badge: 'Areas of Expertise',
                items: [
                    { icon: 'fa-heartbeat', title: 'Stroke & Vascular Neurology', text: 'Advanced treatment for ischemic and hemorrhagic strokes, with a focus on rapid recovery and prevention.' },
                    { icon: 'fa-brain', title: 'Complex Neurological Disorders', text: 'Comprehensive management of intricate nervous system conditions.' },
                    { icon: 'fa-search', title: 'Undiagnosed Conditions', text: 'Expertise in evaluating challenging, difficult-to-diagnose neurological cases.' },
                    { icon: 'fa-microscope', title: 'Advanced Neuro Diagnostics', text: 'Cutting-edge diagnostic technologies for accurate neurological assessment.' },
                    { icon: 'fa-bolt', title: 'Critical Neurology Care', text: 'Specialized intensive care for acute neurological emergencies.' }
                ]
            },
            {
                type: 'stats', badge: 'Experience',
                items: [
                    { number: '3-4+', label: 'Years managing complex & rare cases' },
                    { number: '100%', label: 'Evidence-based clinical approach' },
                    { number: '24/7', label: 'Critical neurology emergency care' }
                ],
                note: 'Pioneer in managing rare and complex neurological cases, with extensive experience in high-risk and technically challenging scenarios.'
            },
            {
                type: 'locations', badge: 'Clinical Locations',
                items: [
                    { tag: 'Primary', primary: true, icon: 'fa-hospital', title: 'RR Hospitals', text: 'Kurnool, Andhra Pradesh' },
                    { tag: 'Visiting', primary: false, icon: 'fa-clinic-medical', title: 'Adoni Neuro Care', text: 'Available every Friday at GK Clinics, Adoni' }
                ]
            }
        ],
        cta: {
            heading: 'Consult Dr. Rohith B.G.',
            text: 'Book an appointment or reach out directly for urgent neurology care.',
            phone: '+918309166593', phoneLabel: '+91 83091 66593',
            bookValue: 'Dr. Rohith B.G.'
        }
    },

    'deepak': {
        photo: 'Doctors images/C. Deepak.jpeg',
        photoAlt: 'Dr. C. Deepak',
        tag: 'Consultant Medical Gastroenterologist',
        name: 'Dr. C. Deepak',
        credentials: 'MD (General Medicine) · DM (Gastroenterology)',
        quickfacts: [
            { icon: 'fa-user-md', text: 'MD General Medicine' },
            { icon: 'fa-stethoscope', text: 'DM Gastroenterology' },
            { icon: 'fa-map-marker-alt', text: 'GK Clinics, Adoni' }
        ],
        sections: [
            {
                type: 'about', badge: 'About',
                heading: 'Comprehensive Digestive, Liver & Pancreatic Care',
                intro: "Dr. C. Deepak is a highly qualified Medical Gastroenterologist specializing in the diagnosis, treatment, and prevention of diseases affecting the digestive system, liver, pancreas, and biliary tract. With advanced training in Gastroenterology and a patient-centered approach, Dr. Deepak is committed to providing comprehensive, evidence-based care for a wide range of gastrointestinal disorders. His expertise includes the management of complex digestive diseases, liver disorders, inflammatory bowel diseases, gastrointestinal bleeding, pancreatic disorders, and therapeutic endoscopic procedures."
            },
            {
                type: 'categories', badge: 'Services Offered',
                heading: 'Conditions & Treatments',
                items: [
                    { icon: 'fa-notes-medical', title: 'Gastrointestinal Disorders', list: ['Acid reflux (GERD)', 'Gastritis and peptic ulcer disease', 'Irritable bowel syndrome (IBS)', 'Chronic diarrhea and constipation', 'Gastrointestinal infections', 'Gastrointestinal bleeding'] },
                    { icon: 'fa-disease', title: 'Liver Diseases', list: ['Fatty liver disease (MASLD / NAFLD)', 'Viral hepatitis (Hepatitis B & C)', 'Alcohol-related liver disease', 'Cirrhosis and its complications', 'Autoimmune liver diseases'] },
                    { icon: 'fa-virus', title: 'Inflammatory Bowel Disease', list: ['Ulcerative colitis', "Crohn's disease"] },
                    { icon: 'fa-droplet', title: 'Pancreatic & Biliary Disorders', list: ['Acute and chronic pancreatitis', 'Gallstone-related diseases', 'Bile duct disorders'] },
                    { icon: 'fa-microscope', title: 'Endoscopic Procedures', list: ['Upper GI Endoscopy', 'Colonoscopy', 'Polypectomy', 'Endoscopic management of GI bleeding', 'Diagnostic and therapeutic endoscopic procedures'] }
                ]
            },
            {
                type: 'checklist', badge: 'Why Choose Dr. C. Deepak?',
                items: ['Expertise in advanced gastroenterology care', 'Comprehensive evaluation and personalized treatment plans', 'Evidence-based clinical practice', 'Compassionate and patient-focused approach', 'Focus on preventive digestive healthcare']
            },
            {
                type: 'checklist', badge: 'Conditions Commonly Treated',
                items: ['Abdominal pain', 'Bloating and indigestion', 'Heartburn and acid reflux', 'Difficulty swallowing', 'Blood in stools', 'Chronic diarrhea', 'Chronic constipation', 'Liver disease', 'Jaundice', 'Weight loss of gastrointestinal origin']
            }
        ],
        cta: {
            heading: 'Consult Dr. C. Deepak',
            text: 'Book an appointment for expert gastroenterology, liver and endoscopy care.',
            phone: '+919700949414', phoneLabel: '+91 97009 49414',
            bookValue: 'Dr. C. Deepak'
        }
    },

    'siddharth-herur': {
        photo: 'Doctors images/Siddharth Herur.jpeg',
        photoAlt: 'Dr. Siddharth Herur',
        tag: 'Consultant Nephrologist & Renal Transplant Physician',
        name: 'Dr. Siddharth Herur',
        credentials: 'MD (General Medicine) · DM (Nephrology) · DrNB (Nephrology) · MRCP-SCE (UK)',
        quickfacts: [
            { icon: 'fa-graduation-cap', text: 'DM Nephrology, NIMS Hyderabad' },
            { icon: 'fa-award', text: 'Best Senior Resident, NIMS 2022' },
            { icon: 'fa-map-marker-alt', text: 'Adoni · Kurnool' }
        ],
        sections: [
            {
                type: 'about', badge: 'About',
                heading: 'Three Degrees in Nephrology & 10+ Years in Renal Transplant',
                intro: "Dr. Siddharth Herur is a Consultant Nephrologist and Renal Transplant Physician — the only doctor in Rayalaseema holding three degrees in Nephrology, with over 10 years of experience in nephrology and renal transplantation. He started the kidney transplant programme in Kurnool and at Medicover Hospital. Trained at the prestigious NIMS, Hyderabad — among the best kidney hospitals in South India — he has worked across leading nephrology departments at Manipal (KMC, Mangalore), St. John's (Bengaluru), NIMS Hyderabad, and Citizens Hospital, Hyderabad."
            },
            {
                type: 'education', badge: 'Education & Qualifications',
                items: [
                    { icon: 'fa-user-md', title: 'MD — General Medicine', sub: 'Manipal University' },
                    { icon: 'fa-droplet', title: 'DM — Nephrology', sub: 'NIMS, Hyderabad' },
                    { icon: 'fa-certificate', title: 'DrNB — Nephrology', sub: 'National Board of Examinations' },
                    { icon: 'fa-award', title: 'MRCP — SCE (UK)', sub: 'Royal College of Physicians, UK' }
                ]
            },
            {
                type: 'cards', badge: 'Expertise & Skills',
                items: [
                    { icon: 'fa-syringe', title: 'Renal Biopsy', text: 'Image-guided native and transplant kidney biopsy.' },
                    { icon: 'fa-hospital-user', title: 'Renal Transplantation', text: 'Live-related, cadaver, ABO-incompatible and HLA-incompatible transplants.' },
                    { icon: 'fa-droplet', title: 'Dialysis (Hemodialysis)', text: 'Maintenance and acute hemodialysis support.' },
                    { icon: 'fa-arrows-rotate', title: 'CRRT', text: 'Continuous renal replacement therapy for critically ill patients.' },
                    { icon: 'fa-house-medical', title: 'Peritoneal Dialysis', text: 'PD initiation, training and peritoneal dialysis catheter insertion.' },
                    { icon: 'fa-disease', title: 'Lupus Nephritis', text: 'Diagnosis and management of lupus and other glomerular diseases.' },
                    { icon: 'fa-heart-pulse', title: 'CKD & AKI', text: 'Chronic kidney disease and acute kidney injury management.' },
                    { icon: 'fa-child', title: 'Pediatric Nephrology', text: 'Kidney care for children.' },
                    { icon: 'fa-stethoscope', title: 'Interventional Nephrology', text: 'Dialysis catheter and permacath insertion.' }
                ]
            },
            {
                type: 'checklist', badge: 'Conditions Treated',
                items: ['Chronic kidney disease', 'Leg swelling (edema)', 'Dialysis', 'Kidney biopsy', 'Kidney transplant', 'Urinary problems', 'Diabetes & BP-related kidney disease', 'Kidney stones', 'Kidney infections', 'Flank / side pain', 'Burning urination']
            },
            {
                type: 'cards', badge: 'Memberships & Recognition',
                items: [
                    { icon: 'fa-id-badge', title: 'ISN', text: 'Member, Indian Society of Nephrology.' },
                    { icon: 'fa-id-badge', title: 'ISOT', text: 'Member, Indian Society of Organ Transplantation.' },
                    { icon: 'fa-trophy', title: 'Best Senior Resident', text: 'Outgoing Senior Resident Award, NIMS Hyderabad — 2022.' },
                    { icon: 'fa-book-open', title: '5 Publications', text: 'National and international peer-reviewed publications.' }
                ]
            },
            {
                type: 'stats', badge: 'Experience',
                items: [
                    { number: '10+', label: 'Years in nephrology & transplant' },
                    { number: '3', label: 'Postgraduate nephrology degrees' },
                    { number: '5', label: 'National & international publications' }
                ],
                note: 'Started the kidney transplant programme in Kurnool and at Medicover Hospital, bringing advanced renal transplant care to the region.'
            },
            {
                type: 'education', badge: 'Career Journey',
                items: [
                    { icon: 'fa-hospital', title: 'Senior Resident — Nephrology', sub: 'KMC, Mangalore (Manipal University) · 2015–18' },
                    { icon: 'fa-hospital', title: 'Senior Resident — Nephrology', sub: "St. John's, Bengaluru · 2018–19" },
                    { icon: 'fa-graduation-cap', title: 'DM Nephrology Resident', sub: 'NIMS, Hyderabad · 2019–22' },
                    { icon: 'fa-chalkboard-user', title: 'Assistant Professor', sub: 'NIMS, Hyderabad · 2022–23' },
                    { icon: 'fa-user-doctor', title: 'Consultant Nephrologist', sub: 'Citizens Hospital, Hyderabad · 2023–24' },
                    { icon: 'fa-hospital-user', title: 'Consultant Nephrologist & Transplant Physician', sub: 'Medicover Hospital · 2024 – Present' }
                ]
            }
        ],
        cta: {
            heading: 'Consult Dr. Siddharth Herur',
            text: 'One stop solution for all your kidney problems — book an appointment or call directly.',
            phone: '+919700949414', phoneLabel: '+91 97009 49414',
            bookValue: 'Dr. Siddharth Herur'
        }
    }
};

const profileOverlay = document.getElementById('profileOverlay');
const profileClose = document.getElementById('profileClose');
const profileContent = document.getElementById('profileContent');

function renderProfileSection(s) {
    let block = '';
    if (s.type === 'education') {
        block = '<div class="profile-education">' + s.items.map(it => `
                        <div class="education-item">
                            <div class="education-icon"><i class="fas ${it.icon}"></i></div>
                            <div>
                                <h4>${it.title}</h4>
                                <p>${it.sub}</p>
                            </div>
                        </div>`).join('') + '</div>';
    } else if (s.type === 'cards') {
        block = '<div class="expertise-grid">' + s.items.map(it => `
                        <div class="expertise-card">
                            <div class="expertise-icon"><i class="fas ${it.icon}"></i></div>
                            <h4>${it.title}</h4>
                            ${it.text ? `<p>${it.text}</p>` : ''}
                        </div>`).join('') + '</div>';
    } else if (s.type === 'categories') {
        block = '<div class="expertise-grid">' + s.items.map(it => `
                        <div class="expertise-card">
                            <div class="expertise-icon"><i class="fas ${it.icon}"></i></div>
                            <h4>${it.title}</h4>
                            <ul class="profile-list">${it.list.map(li => `<li>${li}</li>`).join('')}</ul>
                        </div>`).join('') + '</div>';
    } else if (s.type === 'stats') {
        block = '<div class="profile-stats">' + s.items.map(it => `
                        <div class="profile-stat">
                            <span class="profile-stat-number">${it.number}</span>
                            <span class="profile-stat-label">${it.label}</span>
                        </div>`).join('') + '</div>' + (s.note ? `<p>${s.note}</p>` : '');
    } else if (s.type === 'locations') {
        block = '<div class="locations-grid">' + s.items.map(it => `
                        <div class="location-card">
                            <div class="location-tag ${it.primary ? 'primary' : ''}">${it.tag}</div>
                            <h4><i class="fas ${it.icon}"></i> ${it.title}</h4>
                            <p>${it.text}</p>
                        </div>`).join('') + '</div>';
    } else if (s.type === 'checklist') {
        block = '<ul class="profile-checklist">' + s.items.map(li => `<li><i class="fas fa-circle-check"></i> ${li}</li>`).join('') + '</ul>';
    }
    return `<div class="profile-section">
                    ${s.badge ? `<span class="profile-section-badge">${s.badge}</span>` : ''}
                    ${s.heading ? `<h3>${s.heading}</h3>` : ''}
                    ${s.intro ? `<p>${s.intro}</p>` : ''}
                    ${block}
                </div>`;
}

function renderProfile(p) {
    return `
            <div class="profile-header">
                <div class="profile-header-bg">
                    <div class="profile-header-shape shape-a"></div>
                    <div class="profile-header-shape shape-b"></div>
                </div>
                <div class="profile-header-inner">
                    <div class="profile-photo">
                        <img src="${p.photo}" alt="${p.photoAlt}">
                    </div>
                    <div class="profile-heading">
                        <span class="profile-tag"><i class="fas fa-stethoscope"></i> ${p.tag}</span>
                        <h2 id="profileName">${p.name}</h2>
                        <p class="profile-credentials">${p.credentials}</p>
                        <div class="profile-quickfacts">
                            ${p.quickfacts.map(q => `<span><i class="fas ${q.icon}"></i> ${q.text}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-body">
                ${p.sections.map(renderProfileSection).join('')}
                <div class="profile-cta">
                    <div class="profile-cta-text">
                        <h3>${p.cta.heading}</h3>
                        <p>${p.cta.text}</p>
                    </div>
                    <div class="profile-cta-actions">
                        <a href="tel:${p.cta.phone}" class="btn btn-outline-dark"><i class="fas fa-phone-alt"></i> ${p.cta.phoneLabel}</a>
                        <a href="#appointment" class="btn btn-primary" id="profileBook"><i class="fas fa-calendar-check"></i> Book Appointment</a>
                    </div>
                </div>
            </div>`;
}

function openProfile(key) {
    if (!profileOverlay || !profileContent) return;
    const data = doctorProfiles[key];
    if (!data) return;
    profileContent.innerHTML = renderProfile(data);
    profileOverlay.classList.add('active');
    profileOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('profile-open');
    profileContent.scrollTop = 0;

    const profileBook = document.getElementById('profileBook');
    if (profileBook) {
        profileBook.addEventListener('click', (e) => {
            e.preventDefault();
            closeProfile();
            setTimeout(() => {
                const doctorSelect = document.getElementById('doctor');
                if (doctorSelect) doctorSelect.value = data.cta.bookValue;
                document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
            }, 250);
        });
    }
}

function closeProfile() {
    if (!profileOverlay) return;
    profileOverlay.classList.remove('active');
    profileOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('profile-open');
}

document.querySelectorAll('.doctor-card.has-profile').forEach(card => {
    const key = card.getAttribute('data-doctor');
    card.addEventListener('click', (e) => {
        if (e.target.closest('a.btn')) return;
        openProfile(key);
    });
    card.addEventListener('keydown', (e) => {
        if (e.target.closest('a.btn')) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProfile(key);
        }
    });
});

if (profileClose) {
    profileClose.addEventListener('click', closeProfile);
}

if (profileOverlay) {
    profileOverlay.addEventListener('click', (e) => {
        if (e.target === profileOverlay) closeProfile();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileOverlay && profileOverlay.classList.contains('active')) {
        closeProfile();
    }
});

// ========== SCROLL REVEAL FOR DOCTOR CARDS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.doctor-card').forEach(card => {
    observer.observe(card);
});

// ========== FILE UPLOAD ==========
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('reports');
const fileList = document.getElementById('fileList');
let uploadedFiles = [];

fileUploadArea.addEventListener('click', () => fileInput.click());

fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragover');
});

fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragover');
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
            uploadedFiles.push(file);
            renderFileList();
        }
    });
}

function renderFileList() {
    fileList.innerHTML = '';
    uploadedFiles.forEach((file, index) => {
        const icon = file.type === 'application/pdf' ? 'fa-file-pdf' : 'fa-file-image';
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <span><i class="fas ${icon}" style="color: var(--primary); margin-right: 8px;"></i>${file.name}</span>
            <button type="button" data-index="${index}" aria-label="Remove file">&times;</button>
        `;
        item.querySelector('button').addEventListener('click', () => {
            uploadedFiles.splice(index, 1);
            renderFileList();
        });
        fileList.appendChild(item);
    });
}

// ========== APPOINTMENT FORM SUBMISSION ==========
const appointmentForm = document.getElementById('appointmentForm');
const WEB3FORMS_KEY = 'd9a7e3c9-e764-4620-b4c4-05fec546bdac';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEEObtySciqde1zdmX8G1UYZJe1wJ-FCr368XQuK2e_9uC1IrBba0uMlhpxAUNiTim3A/exec';

// Convert file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Upload a single file to Google Drive
async function uploadToDrive(file, patientName) {
    const base64Data = await fileToBase64(file);
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
            fileName: `${patientName} - ${file.name}`,
            fileType: file.type,
            fileData: base64Data
        })
    });
    return response.json();
}

appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = appointmentForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;

    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const doctor = document.getElementById('doctor').value;

    try {
        // Step 1: Upload files to Google Drive (if any)
        let fileLinks = [];
        if (uploadedFiles.length > 0) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading reports...';
            const uploadPromises = uploadedFiles.map(file => uploadToDrive(file, name));
            const results = await Promise.all(uploadPromises);

            for (const result of results) {
                if (result.success) {
                    fileLinks.push(`${result.fileName}: ${result.fileUrl}`);
                }
            }
        }

        // Step 2: Send email via Web3Forms
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking appointment...';

        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_KEY);
        formData.append('subject', 'New Appointment Request - GK Clinics');
        formData.append('from_name', 'GK Clinics Website');
        formData.append('Full Name', name);
        formData.append('Phone Number', phone);
        formData.append('Address', address);
        formData.append('Doctor', doctor);

        if (fileLinks.length > 0) {
            formData.append('Medical Reports', fileLinks.join('\n'));
        } else {
            formData.append('Medical Reports', 'No reports attached');
        }

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            appointmentForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Appointment Request Submitted!</h3>
                    <p>Thank you, <strong>${name}</strong>. Our admin will review your details with <strong>${doctor}</strong> and contact you shortly at <strong>${phone}</strong>.</p>
                    ${fileLinks.length > 0 ? '<p style="margin-top: 10px;"><i class="fas fa-check-circle" style="color: green;"></i> Your medical reports have been uploaded successfully.</p>' : ''}
                    <br>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-redo"></i> Book Another
                    </button>
                </div>
            `;

            document.getElementById('appointment').scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        alert('Something went wrong. Please try again or call us at 9700949414.');
    }
});

// ========== AI CHATBOT ==========
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatOptions = document.getElementById('chatOptions');

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Chat responses
const chatResponses = {
    appointment: {
        text: "You can book an appointment by filling out the form on our website. Let me take you there!",
        action: () => {
            setTimeout(() => {
                document.querySelector('#appointment').scrollIntoView({ behavior: 'smooth' });
                chatbotWindow.classList.remove('active');
            }, 1500);
        }
    },
    doctors: {
        text: "We have 10 expert specialists:\n\n• Dr. Rohith B.G. - Neurologist\n• Dr. Siddharth Herur - Nephrologist\n• Dr. Adithya Kumar - Emergency Care Specialist\n• Dr. C. Deepak - Gastroenterologist\n• Dr. Raghavendra Cheruku - Cardiologist\n• Dr. Varaprasad Kuruva - Pulmonologist\n• Dr. Anusha Nagral - Dermatologist\n• Dr. Rajashekhar I - Dental Specialist\n• Dr. G.K. Veeresh - Physiotherapist\n• Dr. Veedika Sai - Physiotherapist"
    },
    services: {
        text: "We offer a wide range of services including:\n\n• Kidney & Renal Care\n• Cardiology & Heart Procedures\n• Neurology & Stroke Management\n• Pulmonology & Chest Medicine\n• Gastroenterology & Liver Care\n• Dental & Implant Surgery\n• Dermatology & Skin Care\n• Specialized Physiotherapy (Home Visits Available)"
    },
    contact: {
        text: "You can reach us at:\n\n📞 9700949414\n📞 9966962535\n📞 9701241253\n\n📍 GK Clinics, Adoni\n\nWe're available 24/7 for your health needs!"
    },
    hours: {
        text: "GK Clinics provides 24/7 support. Our specialists are available by appointment. Call us at 9700949414 to check specific doctor availability."
    }
};

// Handle chat option clicks
document.querySelectorAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const response = btn.dataset.response;
        addUserMessage(btn.textContent);

        if (chatOptions) chatOptions.style.display = 'none';

        setTimeout(() => {
            addBotMessage(chatResponses[response].text);
            if (chatResponses[response].action) {
                chatResponses[response].action();
            }
            showQuickOptions();
        }, 600);
    });
});

// Handle text input
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    setTimeout(() => {
        const reply = getSmartReply(text);
        addBotMessage(reply);
        showQuickOptions();
    }, 800);
}

function getSmartReply(input) {
    const lower = input.toLowerCase();

    if (lower.includes('appointment') || lower.includes('book') || lower.includes('schedule')) {
        return chatResponses.appointment.text;
    }
    if (lower.includes('doctor') || lower.includes('specialist')) {
        return chatResponses.doctors.text;
    }
    if (lower.includes('service') || lower.includes('treatment')) {
        return chatResponses.services.text;
    }
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('call')) {
        return chatResponses.contact.text;
    }
    if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('available')) {
        return chatResponses.hours.text;
    }
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        return "Hello! Welcome to GK Clinics. How can I help you today? You can ask about our doctors, services, or book an appointment.";
    }
    if (lower.includes('thank')) {
        return "You're welcome! If you need any further assistance, feel free to ask. Stay healthy! 😊";
    }
    if (lower.includes('emergency')) {
        return "For emergencies, please call us immediately at 9700949414. Our team is available 24/7.";
    }
    if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
        return "We are located at GK Clinics, Adoni. Call us at 9700949414 for directions.";
    }

    return "Thank you for your message. For specific queries, please call us at 9700949414 or use the options below. Our team will be happy to help!";
}

function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.innerHTML = `<p>${escapeHTML(text)}</p>`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message bot';
    msg.innerHTML = `<p>${escapeHTML(text).replace(/\n/g, '<br>')}</p>`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showQuickOptions() {
    const options = document.createElement('div');
    options.className = 'chat-options';
    options.innerHTML = `
        <button class="chat-option" data-response="appointment">Book Appointment</button>
        <button class="chat-option" data-response="doctors">Our Doctors</button>
        <button class="chat-option" data-response="contact">Contact Info</button>
    `;
    chatbotMessages.appendChild(options);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    options.querySelectorAll('.chat-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const response = btn.dataset.response;
            addUserMessage(btn.textContent);
            options.remove();
            setTimeout(() => {
                addBotMessage(chatResponses[response].text);
                if (chatResponses[response].action) {
                    chatResponses[response].action();
                }
                showQuickOptions();
            }, 600);
        });
    });
}

// ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
