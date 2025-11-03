
        
        $(document).ready(function() {
    // Initialize all functionality
    initScrollAnimations();
    setupNavbarEffects();
    setupSmoothScrolling();
    setupBackToTop();
    setupGalleryFilter();
    setupImageModal();
    setupContactForm();
    
    // Initialize active nav link on page load
    updateActiveNavLink();
});
        
        // Typed.js initialization
        document.addEventListener('DOMContentLoaded', function() {
            var typed = new Typed(".text", {
                strings: ["Frontend developer", "Web developer", "Graphic designer","Backend developer"],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true
            });
            
            // Dark mode toggle
            const darkModeToggle = document.querySelector(".dark-mode-toggle");
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const icon = darkModeToggle.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
            
            // Sticky navbar
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.classList.add('sticky');
                } else {
                    navbar.classList.remove('sticky');
                }
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animation on scroll
            const fadeElements = document.querySelectorAll('.fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        });
        
       // Contact Form Functions
function setupContactForm() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        var isValid = true;
        $('#contactForm input, #contactForm textarea').each(function() {
            if ($(this).prop('required') && !$(this).val()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
       if (isValid) {
            // Replace your current AJAX call with this:
$.ajax({
    type: 'POST',
    url: 'send_email.php',
    data: $(this).serialize(),
    success: function(response) {
        if (response.trim() === 'success') {
            $('#confirmationModal').modal('show');
            $('#contactForm')[0].reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    },
    error: function() {
        alert('Network error. Please check your connection and try again.');
    }
});
        }
    });
}

function setupSmoothScrolling() {
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            // Update active nav link
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });
}
   