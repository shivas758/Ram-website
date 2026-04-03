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
popupBook.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) closePopup();
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
        text: "We have 8 expert specialists:\n\n• Dr. Rohit B.J. - Neurologist\n• Dr. Raghavendra Cheruku - Cardiologist\n• Dr. Vara Prasad Kuruva - Pulmonologist\n• Dr. Rajashekar V. - Dental Specialist\n• Dr. Siddharth Haroor - Nephrologist\n• Dr. C. Deepak - Gastroenterologist\n• Dr. Anusha Nagral - Dermatologist\n• Dr. M. Vedhika Sai - Physiotherapist"
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
