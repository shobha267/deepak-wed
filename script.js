// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
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
    }

    // Reveal elements on scroll
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Initial check

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form submission alert
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Language Dropdown UI Toggle
    const dropBtns = document.querySelectorAll('.lang-dropbtn');
    const dropContents = document.querySelectorAll('.lang-dropdown-content');

    dropBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropContents[index].classList.toggle('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-dropdown')) {
            dropContents.forEach(content => content.classList.remove('show'));
        }
    });

    // Custom Language Selection Logic
    const langLinks = document.querySelectorAll('.lang-dropdown-content a');
    const langNames = { 'en': 'English', 'kn': 'Kannada', 'hi': 'Hindi' };
    
    // Set initial language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    function changeLanguage(langCode) {
        // Update button text
        document.querySelectorAll('.lang-dropbtn span').forEach(span => {
            span.textContent = langNames[langCode] || 'English';
        });

        // Translate all elements with data-key attribute
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
        
        // Save preference
        localStorage.setItem('preferredLanguage', langCode);
        
        // Set document language
        document.documentElement.lang = langCode;
    }

    // Apply saved language on load
    if (typeof translations !== 'undefined') {
        changeLanguage(savedLang);
    }

    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.getAttribute('data-lang');
            
            // Close dropdowns
            dropContents.forEach(content => content.classList.remove('show'));
            
            // Change Language
            if (typeof translations !== 'undefined') {
                changeLanguage(langCode);
            }
        });
    });
});