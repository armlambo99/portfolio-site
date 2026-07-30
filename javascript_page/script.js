
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

// Main initialization function
function initPortfolio() {
    console.log('Initializing portfolio...');
    
    // Initialize Typed.js
    initTypedJS();
    
    // Initialize other functionality
    setupSmoothScrolling();
    updateActiveNavLink();
    setupContactForm();
    setupDarkMode();
    setupPlayButton();
    setupScrollAnimations();

    setupModals(); 
}

// Typed.js initialization
function initTypedJS() {
    // Check if the element exists
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) {
        console.log('Typed.js element not found');
        return;
    }
    
    console.log('Initializing Typed.js...');
    
    // Make sure we're not reinitializing
    if (window.typedInstance) {
        window.typedInstance.destroy();
    }
    
    // Initialize Typed.js
    try {
        window.typedInstance = new Typed(".typed-text", {
            strings: [
                "Full Stack Developer",
                "Web Developer", 
                "UI/UX Designer",
                "Java Developer",
                "Frontend Developer",
                "Backend Developer"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: "|",
            autoInsertCss: true
        });
        console.log('Typed.js initialized successfully');
    } catch (error) {
        console.error('Typed.js initialization error:', error);
    }
}

// Modal Functionality
function setupModals() {
    // Helper function to initialize a modal
    function initModal(openBtnId, closeBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        const modal = document.getElementById(modalId);

        if (openBtn && closeBtn && modal) {
            // Open modal
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex'; // Assumes your CSS uses flex for centering
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });

            // Close modal via 'X' button
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            });

            // Close modal when clicking outside the content area (on the backdrop)
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close modal with Escape key for better accessibility
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    // Initialize all three modals
    initModal('view-projects-btn', 'close-projects', 'projects-modal');
    initModal('view-gallery-btn', 'close-gallery', 'gallery-modal');
    initModal('view-ecommerce-btn', 'close-ecommerce', 'ecommerce-modal');
}

// Dark mode functionality
function setupDarkMode() {
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
        
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Play button functionality
function setupPlayButton() {
    const playBtn = document.getElementById('play-intro');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            alert('Introduction video coming soon!');
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Smooth scrolling for navigation (Pure JavaScript)
function setupSmoothScrolling() {
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact Form Functionality for Netlify
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }
    
    console.log('Setting up contact form...');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        if (validateContactForm()) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Submit to Netlify Forms
            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                    confirmationModal.show();
                    contactForm.reset();
                    console.log('Form submitted successfully to Netlify');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        }
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
        isValid = false;
        emailField.classList.add('is-invalid');
    }
    
    if (!isValid) {
        alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Remove the duplicate setupSmoothScrolling function that uses jQuery