function toggleData() {
    const container = document.getElementById('profileData');
    const pdfContainer = document.getElementById('pdfContainer');
    const btn = document.querySelector('.btn');
    
    // Close PDF if open
    pdfContainer.classList.remove('open');
    
    // Close all sections smoothly to focus on Data
    ['aboutSection', 'skillsSection', 'educationSection', 'projectsSection', 'contactSection'].forEach(id => closeSection(id));

    container.classList.toggle('open');
    btn.innerText = container.classList.contains('open') ? "Close Details" : "View My Data";
}

function togglePdf() {
    const pdfContainer = document.getElementById('pdfContainer');
    const profileData = document.getElementById('profileData');
    const btn = document.querySelector('.btn');

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    // Close profile data if open
    if (profileData && profileData.classList.contains('open')) {
        profileData.classList.remove('open');
        if (btn) btn.innerText = "View My Data";
    }

    // Close all sections smoothly to focus on PDF
    ['aboutSection', 'skillsSection', 'educationSection', 'projectsSection', 'contactSection'].forEach(id => closeSection(id));

    pdfContainer.classList.toggle('open');
}

function closePdfModal(event) {
    if (event.target.id === 'pdfContainer') {
        togglePdf();
    }
}

// Generic function to handle smooth toggling of sections
function toggleSection(event, sectionId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const section = document.getElementById(sectionId);
    const allSections = ['aboutSection', 'skillsSection', 'educationSection', 'projectsSection', 'contactSection'];
    const pdfContainer = document.getElementById('pdfContainer');
    const profileData = document.getElementById('profileData');
    const btn = document.querySelector('.btn');
    
    // Close PDF if open
    pdfContainer.classList.remove('open');

    // Close profile data if open to focus on the Section
    if (profileData && profileData.classList.contains('open')) {
        profileData.classList.remove('open');
        if (btn) btn.innerText = "View My Data";
    }
    
    // Check if we are closing the currently active section
    const isClosing = section.classList.contains('visible');

    // Hide all other sections immediately to prevent layout jumps
    allSections.forEach(id => {
        if (id !== sectionId) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('visible');
                el.style.display = 'none';
            }
        }
    });

    if (isClosing) {
        // Animate out
        section.classList.remove('visible');
        document.body.classList.remove('no-scroll');
        setTimeout(() => {
            if (!section.classList.contains('visible')) {
                section.style.display = 'none';
            }
        }, 400); // Match CSS transition duration
    } else {
        // Animate in
        section.style.display = 'block';
        // Force reflow to ensure transition triggers
        void section.offsetWidth;
        section.classList.add('visible');
        document.body.classList.add('no-scroll');
    }
}

// Specific toggle functions calling the generic handler
function toggleAbout(event) { toggleSection(event, 'aboutSection'); }
function toggleSkills(event) { toggleSection(event, 'skillsSection'); }
function toggleEducation(event) { toggleSection(event, 'educationSection'); }
function toggleProjects(event) { toggleSection(event, 'projectsSection'); }
function toggleContact(event) { toggleSection(event, 'contactSection'); }

// Generic close function for the "X" buttons
function closeSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
        if (!section.classList.contains('visible')) {
            section.style.display = 'none';
        }
    }, 400);
}

function closeAbout() { closeSection('aboutSection'); }
function closeSkills() { closeSection('skillsSection'); }
function closeEducation() { closeSection('educationSection'); }
function closeProjects() { closeSection('projectsSection'); }
function closeContact() { closeSection('contactSection'); }

function showHomeMessage(event) {
    event.preventDefault();
    const toast = document.getElementById('homeToast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close all sections when Escape key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeSection('aboutSection');
        closeSection('skillsSection');
        closeSection('projectsSection');
        closeSection('contactSection');
        closeSection('educationSection');
        const pdfContainer = document.getElementById('pdfContainer');
        pdfContainer.classList.remove('open');
    }
});

// Close sections when clicking outside
document.addEventListener('click', function(event) {
    const sections = ['aboutSection', 'skillsSection', 'educationSection', 'projectsSection', 'contactSection'];
    
    sections.forEach(id => {
        const section = document.getElementById(id);
        // If section is visible and the click was NOT inside the section
        if (section && section.classList.contains('visible') && !section.contains(event.target)) {
            closeSection(id);
        }
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    projects.forEach(project => {
        const categories = project.getAttribute('data-category');
        if (category === 'all' || (categories && categories.includes(category))) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btnIcon = document.querySelector('.theme-btn i');
    if (document.body.classList.contains('dark-mode')) {
        btnIcon.classList.remove('fa-moon');
        btnIcon.classList.add('fa-sun');
    } else {
        btnIcon.classList.remove('fa-sun');
        btnIcon.classList.add('fa-moon');
    }
}

function togglePulse(element) {
    element.classList.toggle('pulse-animation');

}
function downloadVCard() {
    const vCardData = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Phaneendhar Nittala',
        'N:Nittala;Phaneendhar;;;',
        'TITLE:Digital Forensics & Cyber Security Specialist',
        'EMAIL;TYPE=INTERNET;TYPE=WORK:nittalaphaneendhar@gmail.com',
        'URL:https://nphaneendhar.github.io',
        'URL;type=LinkedIn:https://www.linkedin.com/in/nittala-phaneendhar/',
        'URL;type=GitHub:https://github.com/NPhaneendhar',
        'ADR;TYPE=HOME:;;India;;;;',
        'END:VCARD'
    ].join('\n');

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Phaneendhar_Nittala.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
